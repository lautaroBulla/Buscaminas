<script setup>
  const props = defineProps({
    seconds: {
      type: Number,
      required: true
    }
  })

  // function format(s) {
  //   const m = Math.floor(s / 60);
  //   const ss = s % 60
  //   return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
  // }
  const formattedNumber = computed(() => {
    return String(props.seconds).padStart(3, '0').split('')
  })
</script>

<template>
  <!-- <div>
    {{ formattedNumber(seconds) }}
  </div> -->
  <div class="numbers-panel">
    <div 
      v-for="second in formattedNumber" 
      :key="second" 
      class="seven-segment" 
      :data-digit="second"
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