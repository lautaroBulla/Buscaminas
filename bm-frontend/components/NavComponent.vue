<script setup lang="ts">
  import menuLight from '~/public/img/themes/light/hamburguerLight.png';
  import closeLigh from '~/public/img/themes/light/closeLight.png';
  import menuDark from '~/public/img/themes/dark/hamburguerDark.png';
  import closeDark from '~/public/img/themes/dark/closeDark.png';

  import { ref } from 'vue';
  import { onClickOutside } from '@vueuse/core';

  const { user, isAuthReady, logout } = useAuth();

  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === 'dark');

  const show = ref(false);
  const dropdownRef = ref(null);

  onClickOutside(dropdownRef, () => {
    show.value = false;
  })

  const logoutLocal = async () => {
    show.value = false;
    await logout();
  }
</script>

<!--
class= generales
       mobile
       desktop
-->

<template>
  <nav class="flex justify-between items-center w-full 
              px-7.5 py-2 border-b-2 border-b-secondary
              md:px-15 md:py-4 md:border-b-4 md:border-b-secondary"
  >

      <div class="hidden 
              md:flex md:justify-start md:gap-x-5 md:w-1/3"
      >
        <ThemeComponent />
        <LanguageSelectorComponent />
      </div>

      <div class="flex
                  md:justify-center md:w-1/3"
      >
        <NuxtLink to="/">
          <p class="title">
            {{ $t('nav.title') }}
          </p>  
        </NuxtLink>
      </div>
  
      <div class="flex items-center 
                  md:justify-end md:w-1/3"
      >
        
        <div v-if="isAuthReady === false">
          <p>...</p>
        </div>

        <div v-else-if="user && isAuthReady === true">
          <div class="flex items-center gap-x-3 md:gap-x-5">

            {{ user.username }}

            <div class="flex flex-col items-center relative" ref="dropdownRef">
              <button 
                class="primary flex items-center gap-x-2"
                @click="show = !show"
              >
                  <span class="hidden md:flex">{{ $t('nav.menu') }}</span>
                  <img
                    :src="
                      show
                        ? (isDark ? closeDark : closeLigh)
                        : (isDark ? menuDark : menuLight)
                    "
                    class="w-[15px] h-[15px]"
                  >
              </button>

              <div v-if="show" class="dropdown"> 
                <NuxtLink 
                  to="/ranking"
                  class="optionsDropdown"
                  :title="$t('nav.ranking')"
                  @click="show = false"
                >
                  Ranking
                </NuxtLink>
                <NuxtLink 
                  class="optionsDropdown md:whitespace-nowrap leading-4 md:leading-normal"
                  @click="logoutLocal"
                >
                  {{ $t('nav.logout') }}
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>

        <div v-else>        
          <div class="flex items-center">

            <div class="flex flex-col items-center relative" ref="dropdownRef">
              <button 
                class="primary flex items-center gap-x-2"
                @click="show = !show"
              >
                  {{ $t('nav.menu') }}
                  <img
                    :src="
                      show
                        ? (isDark ? closeDark : closeLigh)
                        : (isDark ? menuDark : menuLight)
                    "
                    class="w-[15px] h-[15px]"
                  >
              </button>

              <div v-if="show" class="dropdown"> 
                <NuxtLink 
                  to="/auth/register"
                  class="optionsDropdown"
                  @click="show = false"
                >
                  {{ $t('nav.register') }}
                </NuxtLink>
                <NuxtLink 
                  to="/auth/login"
                  class="optionsDropdown md:whitespace-nowrap leading-4 md:leading-normal"
                  @click="show = false"
                >
                  {{ $t('nav.login') }}
                </NuxtLink>
                <NuxtLink 
                  to="/ranking"
                  class="optionsDropdown"
                  :title="$t('nav.ranking')"
                  @click="show = false"
                >
                  Ranking
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>

      </div>

  </nav>
</template>