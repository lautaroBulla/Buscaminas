<script setup>
  import { useI18n } from 'vue-i18n'

  const { locale, locales } = useI18n()

  const availableLocales = locales.value.filter(l => 'code' in l && 'name' in l)

  function changeLanguage(event) {
    locale.value = event.target.value
  }
</script>

<template>
  <div class="flex justify-end items-center pr-10">
    <label for="language-select">
      {{ $t('languageSelector.language') }}:
    </label>
    <select
      id="language-select"
      class="border"
      :value="locale"
      @change="changeLanguage"
    >
      <option
        v-for="lang in availableLocales"
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
