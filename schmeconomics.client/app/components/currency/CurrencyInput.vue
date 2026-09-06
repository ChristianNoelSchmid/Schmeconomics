<script setup lang="ts">
import { CurrencyInputPart, CurrencyPartType, stringToPartType as keyStringToPartType, partsToValue } from './currency-input-part';

const inputEl = ref<{ inputRef: { $el: HTMLInputElement }} | null>(null);
const props = withDefaults(defineProps<{readonly?: boolean}>(), { readonly: false });
const model = defineModel<number>();
const parts = ref<CurrencyInputPart[]>([new CurrencyInputPart(CurrencyPartType.Plus, model.value!)]);

function addOperator(
  operatorString: string
) {
  const modelValue = parts.value.at(-1)!;
  const partType = keyStringToPartType(operatorString);
  if(modelValue.amount == 0) {
    modelValue.partType = partType;
  } else {
    parts.value.push(new CurrencyInputPart(partType, 0));
  }
  inputEl.value?.inputRef?.$el.focus();
}

const formattedValue = computed<string>(() => {
  if (!model.value) return '0.00';
  let fmt = formattedPart(parts.value[0]!.amount);
  for(let i = 1; i < parts.value.length; i += 1) {
    fmt += (parts.value[i]!.partType == CurrencyPartType.Plus) ? " + " : " - ";
    fmt += formattedPart(parts.value[i]!.amount);
  }
  return fmt;
});

function formattedPart(value: number | undefined): string {
  value ??= 0;
  let strValue = value.toString();
  strValue = strValue.padStart(3, '0');
  return strValue.slice(0, strValue.length - 2) + '.' + strValue.slice(strValue.length - 2);
}

function handleInput(inputEvent: InputEvent) {
  // Always cancel the native edit — the field is driven entirely by `formattedValue`.
  inputEvent.preventDefault();

  if (props.readonly) return;

  if (!model.value) parts.value = [new CurrencyInputPart(CurrencyPartType.Plus, 0)];

  const modelValue = parts.value.at(-1)!;
  // console.log(inputEvent.inputType, inputEvent.data);

  switch (inputEvent.inputType) {
    case 'deleteContentBackward':
    case 'deleteContentForward': {
      if (modelValue.amount == 0) {
        if (parts.value.length > 1)
          parts.value.pop();
      } else {
        modelValue.amount -= modelValue.amount % 10;
        modelValue.amount /= 10;
      }
      break;
    }
    case 'insertText':
    case 'insertCompositionText':
    case 'insertFromPaste': {
      const data = inputEvent.data ?? '';

      if (data === '+' || data === '-') {
        addOperator(data);
        break;
      }

      // Handle multi-character input (paste, autocomplete, etc.) digit-by-digit.
      for (const char of data) {
        const number = parseInt(char, 10);
        if (!Number.isNaN(number)) {
          modelValue.amount *= 10;
          modelValue.amount += number;
        }
      }
      break;
    }
    default:
      break;
  }

  model.value = partsToValue(parts.value);
}
</script>

<template>
  <UInput 
    ref="inputEl"
    type="tel"
    :value="formattedValue" :disabled="props.readonly" @beforeinput="handleInput"
  /> 
  <UButton
    variant="outline"
    class="px-4 mx-2"
    label="+"
    size="xl"
    color="info"
    @click="addOperator('+')"
  />
  <UButton
    variant="outline"
    class="px-4"
    label="-"
    size="xl"
    color="info"
    @click="addOperator('-')"
  />

</template>

<style scoped>
input {
  cursor: default;
}

input:focus {
  border-color: #3b82f6;
}
.opr-button {
  margin: 0 2em;
}
</style>