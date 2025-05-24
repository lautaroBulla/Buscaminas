<script setup>
  import { useColorMode } from '#imports'
  import { ref, watch, onMounted } from 'vue'

  const colorMode = useColorMode()
  const isDark = ref(false)
  const isMounted = ref(false)

  onMounted(() => {
    isDark.value = colorMode.value === 'dark'
    isMounted.value = true
  })

  watch(
    () => colorMode.value,
    (val) => {
      isDark.value = val === 'dark'
    }
  )

  const toggleDark = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
</script>

<template>
  <nav class="flex flex-row w-full py-4">
    <div class="w-1/3">
      <button
        v-if="isMounted"
        @click="toggleDark"
        class="border h-fit hover:cursor-pointer"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </button>
    </div>
    <div class="flex justify-center w-1/3">
      <p class="text-5xl">
        {{ $t('nav.title') }}
      </p>  
    </div>
    <div class="flex justify-end items-center space-x-5 pr-10 w-1/3">
      <button class="border h-fit hover:cursor-pointer">
        {{ $t('nav.register') }}
      </button>
      <button class="border h-fit hover:cursor-pointer">
        {{ $t('nav.login') }}
      </button>
    </div>
  </nav>
</template>