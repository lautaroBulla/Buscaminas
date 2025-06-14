<script setup>
  import esFlag from '~/assets/img/es.png'
  import ukFlag from '~/assets/img/uk.png'

  const { locale, setLocale } = useI18n();
  
  const changeLanguage = async () => {
    locale.value = locale.value === 'en' ? 'es' : 'en';
    await setLocale(locale.value);
  }

  const flagSrc = computed(() => (locale.value === 'en' ? esFlag : ukFlag));
  const flagAlt = computed(() => (locale.value === 'en' ? 'Spanish' : 'English'));
</script>

<template>
  <div class="flex items-center">
      <button
        @click="changeLanguage"
        class="secondary flex items-center gap-x-2"
        :title="$t('languageSelector.changeLanguageTitle')"
      >
        {{ $t('languageSelector.changeLanguage') }}
        <img :src="flagSrc" :alt="flagAlt" class="w-[20px] h-[15px]" />
      </button>
  </div>
</template>
