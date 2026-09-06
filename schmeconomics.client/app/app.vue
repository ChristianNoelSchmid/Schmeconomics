<script setup lang="ts">
import PromptModal from './components/prompt/PromptModal.vue';
import GlobalLoadingIndicator from './components/GlobalLoadingIndicator.vue';
import AppFooter from './components/AppFooter.vue';
import { useSignInState } from './lib/services/auth';

const signInState = useSignInState();
const router = useRoute();

onMounted(() => {
  if (!signInState.value && router.path != '/login')
    navigateTo('/login');
});
</script>

<template>
  <div>
  <VitePwaManifest />
    <UApp>
      <UContainer>
        <NavigationHeader />
        <UMain>
          <NuxtLoadingIndicator :height="3" />
          <NuxtPage />
        </UMain>
        <AppFooter />
      </UContainer>
      <PromptModal />
      <GlobalLoadingIndicator />
    </UApp>
  </div>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";

@theme {
--color-sage-50: #f8fbfa;
--color-sage-100: #f3f6f5;
--color-sage-200: #e2e9e3;
--color-sage-300: #ced9d0;
--color-sage-400: #96ae9b;
--color-sage-500: #64806a;
--color-sage-600: #485d50;
--color-sage-700: #37493d;
--color-sage-800: #212c21;
--color-sage-900: #141f16;
--color-sage-950: #070e08;
}
</style>
