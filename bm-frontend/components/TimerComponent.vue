<script setup>
  defineProps({
    seconds: {
      type: Number,
      required: true
    }
  })

  function format(s) {
    const m = Math.floor(s / 60);
    const ss = s % 60
    return `${m.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`
  }
</script>

<template>
  <div>
    {{ format(seconds) }}
  </div>
</template>