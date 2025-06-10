<script setup lang="ts">
  const { user, isAuthReady } = useAuth();
</script>

<!--
class= generales
       mobile
       desktop
-->

<template>
  <nav class="flex justify-between items-center w-full 
              px-2 py-2 border-b-2 border-b-secondary
              lg:px-10 lg:py-4 lg:border-b-4 lg:border-b-secondary"
  >

      <div class="hidden 
              lg:flex lg:justify-start lg:space-x-5 lg:w-1/3"
      >
        <ThemeComponent />
        <LanguageSelectorComponent />
      </div>

      <div class="flex
                  lg:justify-center lg:w-1/3"
      >
        <NuxtLink to="/">
          <label class="title">
            {{ $t('nav.title') }}
          </label>  
        </NuxtLink>
      </div>
  
      <div class="flex 
                  lg:justify-end lg:w-1/3">

        <div v-if="isAuthReady === false">
          <p>...</p>
        </div>

        <div v-else-if="user && isAuthReady === true">
          <p>
            {{ user.username }}
          </p>
        </div>

        <div v-else class="flex 
                            space-x-2
                            lg:space-x-5"
        >

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

      </div>

  </nav>
</template>