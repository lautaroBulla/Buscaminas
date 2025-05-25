<script setup>

</script>

<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-center space-y-5 p-5 border-4">
      <h1 class="text-3xl">{{ $t('login.title') }}</h1>
      <div class="flex flex-col items-start">
        <label>{{ $t('login.username') }}</label>
        <input
          type="text"
          v-model="username"
          class="border-2"
        />
      </div>
      <div class="flex flex-col items-start">
        <label>{{ $t('login.password') }}</label>
        <input
          type="password"
          v-model="password"
          class="border-2"
        />
      </div>
      <div class="flex flex-col items-center">
        <button
          class="border-2 hover:cursor-pointer"
        >
          {{ $t('login.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>