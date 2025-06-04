<script setup lang="ts">
  import { useColorMode } from '#imports';

  const colorMode = useColorMode();
  const isDark = ref(colorMode.value === 'dark');

  const toggleDark = (): void => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    isDark.value = !isDark.value;
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
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