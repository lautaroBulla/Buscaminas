<script setup>
  import { useColorMode } from '#imports'

  const colorMode = useColorMode()

  onMounted(() => {
    if (!localStorage.getItem('nuxt-color-mode')) {
      colorMode.preference = 'dark'; // o 'light'
    }
  });
</script>

<template>
  <NuxtLayout />
</template>