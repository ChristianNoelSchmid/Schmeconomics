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
</style>
