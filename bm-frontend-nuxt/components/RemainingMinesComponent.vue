<script setup>
  defineProps({
    remainingMines: {
      type: Number,
      required: true
    },
  })
</script>

<template>
  <div class="text-white">
    {{ remainingMines }}
  </div>
</template>