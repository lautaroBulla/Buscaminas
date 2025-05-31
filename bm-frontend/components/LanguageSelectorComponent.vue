<script setup>
  import esFlag from '~/assets/img/es.png'
  import ukFlag from '~/assets/img/uk.png'
  
  const localeState = useState('locale');

  const { locale } = useI18n();
  
  function changeLanguage() {
    locale.value = locale.value === 'en' ? 'es' : 'en';
    localeState.value = locale.value;
  }

  const flagSrc = computed(() => (locale.value === 'en' ? esFlag : ukFlag));
  const flagAlt = computed(() => (locale.value === 'en' ? 'Spanish' : 'English'));
</script>

<template>
  <div class="flex items-center">
    <client-only>
      <button
        @click="changeLanguage"
        class="secondary flex items-center gap-x-2"
      >
        {{ $t('languageSelector.changeLanguage') }}
        <img :src="flagSrc" :alt="flagAlt"  />
      </button>
    </client-only>
  </div>
</template>
