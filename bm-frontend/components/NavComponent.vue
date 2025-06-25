<script setup lang="ts">
  import trophyLigth from '~/public/img/themes/light/trophyLight.png';
  import trophyDark from '~/public/img/themes/dark/trophyDark.png';
  import arrowDownLight from '~/public/img/themes/light/arrowDownLight.png';
  import arrowDownDark from '~/public/img/themes/dark/arrowDownDark.png';
  import arrowTopLight from '~/public/img/themes/light/arrowTopLight.png';
  import arrowTopDark from '~/public/img/themes/dark/arrowTopDark.png';
  import logoutLight from '~/public/img/themes/light/logoutLight.png';
  import logoutDark from '~/public/img/themes/dark/logoutDark.png';

  const { user, isAuthReady } = useAuth();

  const colorMode = useColorMode();

  useHead({
    htmlAttrs: {
      class: colorMode.preference === 'dark' ? 'dark' : ''
    }
  });

  const isDark = computed(() => {
    const mode = process.server
      ? colorMode.preference
      : colorMode.value 
    return mode === 'dark' ? true : false;
  });

  const show = ref(false);
</script>

<!--
class= generales
       mobile
       desktop
-->

<template>
  <nav class="flex justify-between items-center w-full 
              px-7.5 py-2 border-b-2 border-b-secondary
              lg:px-15 lg:py-4 lg:border-b-4 lg:border-b-secondary"
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
          <p class="title">
            {{ $t('nav.title') }}
          </p>  
        </NuxtLink>
      </div>
  
      <div class="flex items-center 
                  lg:justify-end lg:w-1/3 lg:space-x-5"
      >
        
        <div v-if="isAuthReady === false">
          <p>...</p>
        </div>

        <div v-else-if="user && isAuthReady === true">
          <div class="flex items-center
                      space-x-2
                      lg:space-x-5"
          >

            <div class="flex flex-col items-center relative">
              <button 
                class="flex items-center hover:opacity-80 hover:cursor-pointer
                      gap-x-2 text-xl 
                      md:text-2xl 
                      lg:gap-x-3"
                :class="show ? 'border-b-2 border-transparent' : 'border-b-2 border-[#adb5bd]'"
                @click="show = !show"
              >
                {{ user.username }}
                <img
                :src="
                    show
                      ? (isDark ? arrowTopDark : arrowTopLight)
                      : (isDark ? arrowDownDark : arrowDownLight)
                  "
                  class="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px]"
                />
              </button>
              <div 
                v-if="show" 
                class="dropdown"
              > 
                <!-- <NuxtLink class="optionsDropdown">
                  Perfil
                </NuxtLink> -->
                <NuxtLink 
                  to="/ranking"
                  class="optionsDropdown gap-x-2"
                  :title="$t('nav.ranking')"
                  @click="show = false"
                >
                  <img
                    :src="isDark ? trophyDark : trophyLigth"
                    class="w-[12px] h-[12px] lg:w-[15px] lg:h-[15px]"
                  />
                  Ranking
                </NuxtLink>
                <NuxtLink class="optionsDropdown gap-x-2 md:whitespace-nowrap leading-4 md:leading-normal">
                  <img
                    :src="isDark ? logoutDark : logoutLight"
                    class="w-[12px] h-[12px] lg:w-[15px] lg:h-[15px]"
                    @click="show = false"
                  >
                  {{ $t('nav.logout') }}
                </NuxtLink>
              </div>
            </div>
          

            <!-- <button 
              class="primary flex items-center gap-x-2"
              :title="$t('nav.ranking')"
            >
              Ranking
              <img 
                :src="isDark ? trophyLigth : trophyDark"
                class="w-[12px] h-[12px]
                      lg:w-[15px] lg:h-[15px]"
              >
            </button>

            <button 
              class="secondary flex items-center"
              :title="$t('nav.ranking')"
            >
              {{ $t('nav.logout') }}
            </button> -->

          </div>
        </div>

        <div v-else>        
          <div class="flex items-center
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

      </div>

  </nav>
</template>