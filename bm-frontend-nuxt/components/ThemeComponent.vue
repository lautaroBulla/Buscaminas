<script setup lang="ts">
  import { useColorMode } from '#imports'
  import { ref, watch, onMounted } from 'vue'

  const colorMode = useColorMode()
  const isDark = ref<boolean>(false)
  const isMounted = ref<boolean>(false)

  onMounted(() => {
    isDark.value = colorMode.value === 'dark'
    isMounted.value = true
  })

  watch(
    () => colorMode.value,
    (val: string) => {
      isDark.value = val === 'dark'
    }
  )

  const toggleDark = (): void => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
</script>

<template>
  <div class="flex items-center">
    <button
      v-if="isMounted"
      @click="toggleDark"
      class="secondary"
    >
      {{ isDark ? $t(`themeSelector.${'light'}`) : $t(`themeSelector.${'dark'}`) }}
    </button>
  </div>
</template>