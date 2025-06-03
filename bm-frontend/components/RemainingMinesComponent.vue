<script setup>
  const props = defineProps({
    remainingMines: {
      type: Number,
      required: true
    },
  })

  const formattedNumber = computed(() => {
    return String(props.remainingMines).padStart(3, '0').split('')
  })
</script>

<template>
  <div class="numbers-panel">
    <div 
      v-for="digit in formattedNumber" 
      :key="digit" 
      class="seven-segment" 
      :data-digit="digit"
    >
      <div class="segment a"></div>
      <div class="segment b"></div>
      <div class="segment c"></div>
      <div class="segment d"></div>
      <div class="segment e"></div>
      <div class="segment f"></div>
      <div class="segment g"></div>
    </div>
  </div>
</template>