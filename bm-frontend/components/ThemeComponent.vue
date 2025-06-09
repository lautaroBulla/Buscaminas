<script setup>
  import { useColorMode } from '#imports';

  const colorMode = useColorMode();
  const isDark = ref(colorMode.value === 'dark');

  const toggleDark = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    isDark.value = !isDark.value;
  }
</script>

<template>
  <div class="flex items-center">
      <button
        @click="toggleDark"
        class="secondary"
        :title="$t('themeSelector.themeSelectorTitle')"
      >
        {{ isDark ? 'Light' : 'Dark' }}	
      </button>
  </div>
</template>