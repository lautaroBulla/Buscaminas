<script setup>
  defineProps({
    seconds: {
      type: Number,
      required: true
    },
    remainingMines: {
      type: Number,
      required: true
    }
  })

  const emit = defineEmits(['comp-restart-game'])
</script>

<template>
  <div class="flex justify-between">
    <RemainingMinesComponent
      :remainingMines="remainingMines"
    />
    <ResetComponent
      @restart-game="$emit('comp-restart-game')"
    />
    <TimerComponent
      :seconds="seconds"
    />
  </div>
</template>