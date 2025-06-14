<script setup>

</script>

<template>
  <div 
    class="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
  >
    <div class="bg-black w-1/3 border-2 border-gray-500 flex flex-col p-5">
      <p class="flex justify-center">
        HAS GANADO!!!
      </p>
      <div class="flex justify-center">           
        <button class="border hover:cursor-pointer" @click="$emit('close')">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>