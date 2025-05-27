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
  <nav class="flex w-full py-4 ">
    <div class="flex justify-start items-center space-x-5 pl-10 w-1/3">
      <button
        v-if="isMounted"
        @click="toggleDark"
        class="primary px-2 py-1 hover:cursor-pointer hover:brightness-110 transition"
      >
        {{ isDark ? 'Light' : 'Dark' }}
      </button>
      <LanguageSelectorComponent />
    </div>
    <div class="flex justify-center w-1/3">
      <label class="text-5xl hover:cursor-pointer">
        <NuxtLink to="/">
          {{ $t('nav.title') }}
        </NuxtLink>
      </label>  
    </div>
    <div class="flex justify-end items-center space-x-5 pr-10 w-1/3">
      <button class="primary px-2 py-1 hover:cursor-pointer hover:brightness-110 transition">
        <NuxtLink to="/login">
          {{ $t('nav.register') }}
        </NuxtLink>
      </button>
      <button class="primary px-2 py-1 hover:cursor-pointer hover:brightness-110 transition">
        <NuxtLink to="/login">
          {{ $t('nav.login') }}
        </NuxtLink>
      </button>
    </div>
  </nav>
</template>