<template>
  <nav class="flex flex-row bg-gray-900 w-full">
    <div class="w-1/3"></div>
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