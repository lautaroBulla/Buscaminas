<script setup>
  import closeClassic from '~/assets/img/themes/classicTheme/close.png';
  import closeDark from '~/assets/img/themes/darkTheme/closeDark.png';

  import esFlag from '~/assets/img/es.png'
  import ukFlag from '~/assets/img/uk.png'

  import { ref } from 'vue';
  
  const props = defineProps({
    firstClickZero: {
      type: Boolean,
      required: true
    },
    interrogationsActivated: {
      type: Boolean,
      required: true
    }
  });

  const { locale } = useI18n();

  const language = ref(locale.value);

  const { currentTheme } = useCurrentTheme();
	
	const imgByTheme = {
    classicTheme: {
      close: closeClassic
    },
		darkTheme: {
			close: closeDark,
		}
  };

  const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

  const localFirstClickZero = ref(props.firstClickZero);
  const localInterrogationsActivated = ref(props.interrogationsActivated);

  const emit = defineEmits(['update', 'close']);

  function updateSettings () {
    emit('update', {
      language: language.value,
      firstClickZero: localFirstClickZero.value,
      interrogationsActivated: localInterrogationsActivated.value
    });
  }
</script>

<template>
  <div :class="`${currentTheme}`">
    <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="modal-border 
                  w-full m-1
                  md:w-8/12 md:m-0
                  lg:w-6/12
                  xl:w-4/12"
        >
        <div class="modal">
          <div class="modal-border-internal">

            <div class="flex justify-end">
              <div class="modal-button-close-border w-fit">
                <button @click="emit('close')" class="modal-button-close">
                  <img :src="imgByTheme[currentThemeComputed].close" alt="Close"/>
                </button>
              </div>
            </div>

            <div class="flex flex-col space-y-1">

              <div class="lg:hidden
                          flex flex-row items-center gap-x-2"
              >
                <label class="text-color"> {{ $t('gameSettings.language') }}: </label>
                <button class="text-color flex flex-row items-center gap-x-1"
                        :class="language !== 'en' ? 'opacity-40' : ''"
                        @click="language = 'en'"
                > 
                  {{ $t('gameSettings.english') }}  
                  <img :src="ukFlag" class="w-7 h-4" />
                </button>
                
                <button class="text-color flex flex-row items-center gap-x-1"
                        :class="language !== 'es' ? 'opacity-40' : ''"
                        @click="language = 'es'"
                > 
                  {{ $t('gameSettings.spanish') }} 
                  <img :src="esFlag" class="w-7 h-4" />
                </button>
              </div>

              <div class="flex flex-row items-center gap-x-2">
                <label class="text-color"> {{ $t('gameSettings.firstClick') }}: </label>
                <input type="checkbox" v-model="localFirstClickZero" class="checkbox" />
              </div>

              <div class="flex flex-row items-center gap-x-2">
                <label class="text-color"> {{ $t('gameSettings.interrogations') }}: </label>
                <input type="checkbox" v-model="localInterrogationsActivated" class="checkbox" />
              </div>

            </div>

            <div class="flex justify-center mt-2">
              <div class="modal-button-update-border">
                <button 
                  @click="updateSettings"
                  class="modal-button-update px-2"
                >
                  {{ $t('gameSettings.update') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>