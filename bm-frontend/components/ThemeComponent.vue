<script setup lang="ts">
  import { useColorMode } from '#imports'

  const colorMode = useColorMode()

  const toggleDark = (): void => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
</script>

<template>
  <div class="flex items-center">
    <client-only>
      <button
        @click="toggleDark"
        class="secondary"
      >
        {{ capitalize(colorMode.value) }}
      </button>
    </client-only>
  </div>
</template>