<script setup lang="ts">

</script>

<template>
  <div class="flex items-center justify-center">
    <div class="card flex flex-col items-center space-y-5 p-5">
      
      <div class="flex flex-col items-start w-full">
        <p class="secondary">{{ $t('login.username') }}</p>
        <input
          type="text"
          class="input"
        />
      </div>

      <div class="flex flex-col items-start w-full">
        <p class="secondary">{{ $t('login.password') }}</p>
        <input
          type="password"
          class="input"
        />
      </div>

      <div class="flex flex-col items-center w-full">
        <button class="primary px-2 py-1 hover:cursor-pointer hover:brightness-110 transition">
          {{ $t('login.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
