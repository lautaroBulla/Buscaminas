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
              md:px-10 md:py-4 md:border-b-4 md:border-b-secondary"
  >

      <div class="hidden 
              md:flex md:justify-start md:space-x-5 md:w-1/3"
      >
        <ThemeComponent />
        <LanguageSelectorComponent />
      </div>

      <div class="flex
                  md:justify-center md:w-1/3"
      >
        <NuxtLink to="/">
          <label class="title">
            {{ $t('nav.title') }}
          </label>  
        </NuxtLink>
      </div>
  
      <div class="flex 
                  md:justify-end md:w-1/3">

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
                            md:space-x-5"
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