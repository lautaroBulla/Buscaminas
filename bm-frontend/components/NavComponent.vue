<script setup lang="ts">
  const { user, isAuthReady } = useAuth();
</script>

<template>
  <nav class="flex w-full py-4 border-b-4 border-b-secondary mb-4">
    <div class="flex justify-start items-center space-x-5 pl-10 w-1/3">
      <ThemeComponent />
      <LanguageSelectorComponent />
    </div>
    <div class="flex justify-center w-1/3">
      <label class="text-5xl hover:cursor-pointer">
        <NuxtLink to="/">
          {{ $t('nav.title') }}
        </NuxtLink>
      </label>  
    </div>

    <div class="flex justify-end items-center pr-10 w-1/3">
      
      <div v-if="isAuthReady && user === null" class="flex space-x-5">
        <button class="secondary">
          <NuxtLink to="/auth/login">
            {{ $t('nav.login') }}
          </NuxtLink>
        </button>
        <button class="primary">
          <NuxtLink to="/auth/register">
            {{ $t('nav.register') }}
          </NuxtLink>
        </button>
      </div>
      <div v-else-if="isAuthReady && user">
        {{ user.username }}
      </div>

    </div>

  </nav>
</template>