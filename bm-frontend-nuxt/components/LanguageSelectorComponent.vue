<script setup>
  import esFlag from '~/assets/img/es.png'
  import ukFlag from '~/assets/img/uk.png'
  import { useI18n } from 'vue-i18n'
  
  const { locale } = useI18n()
  
  function changeLanguage() {
    locale.value = locale.value === 'en' ? 'es' : 'en'
  }

  const flagSrc = computed(() => (locale.value === 'en' ? esFlag : ukFlag))
  const flagAlt = computed(() => (locale.value === 'en' ? 'Spanish' : 'English'))
</script>

<template>
  <div class="flex justify-end items-center pr-10">
    <button
      @click="changeLanguage"
      class="primary px-2 py-1 hover:cursor-pointer hover:brightness-110 transition flex items-center gap-x-2"
    >
      {{ $t('languageSelector.changeLanguage') }}
      <img :src="flagSrc" :alt="flagAlt"  />
    </button>
  </div>
</template>
