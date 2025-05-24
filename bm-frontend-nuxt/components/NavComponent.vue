<script setup>
import { onMounted, ref } from 'vue'

const toggleDark = () => {
  document.documentElement.classList.toggle('dark');
}
</script>

<template>
  <nav class="flex flex-row w-full py-4">
    <div class="w-1/3">
      <button @click="toggleDark" class="border h-fit hover:cursor-pointer">
        {{ isDark ? '☀️ Light' : '🌙 Dark' }}
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