<script setup>
  defineProps({
    seconds: {
      type: Number,
      required: true
    },
    remainingMines: {
      type: Number,
      required: true
    },
    gameOver: {
      type: Boolean,
      required: true
    },
    gameWin: {
      type: Boolean,
      required: true
    }
  })

  const emit = defineEmits(['comp-restart-game'])
</script>

<template>
  <div class="flex flex-row items-center header">
    <div class="flex justify-start w-1/5 m-1">
      <HelpComponent />
    </div>
    <div class="flex justify-center w-1/5 m-1">
      <RemainingMinesComponent
        :remainingMines="remainingMines"
      />
    </div>
    <div class="flex justify-center w-1/5 m-1">
      <ResetComponent
        :gameOver="gameOver"
        :gameWin="gameWin"
        @restart-game="$emit('comp-restart-game')"
      />
    </div>
    <div class="flex justify-center w-1/5 m-1">
      <TimerComponent
        :seconds="seconds"
      />
    </div>
    <div class="flex justify-end w-1/5 m-1">
      <SettingsComponent />
    </div>
  </div>
</template>