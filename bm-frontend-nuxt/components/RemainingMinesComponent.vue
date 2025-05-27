<script setup>
  defineProps({
    remainingMines: {
      type: Number,
      required: true
    },
  })
</script>

<template>
  <div>
    {{ remainingMines }}
  </div>
</template>