<script setup>
  import { ref, computed } from 'vue';

  defineProps({
    modelValue: {
      type: String,
      required: true,
    }
  })

  // se definen dos emits, uno para la dificultad y otro para los valores personalizados
  const emit = defineEmits(['update:modelValue', 'update:customValues']);
  const customRows = ref(null);
  const customCols = ref(null);
  const customMines = ref(null);

  function selectDifficulty(difficulty) {
    if (difficulty === 'custom') {
      customRows.value = null;
      customCols.value = null;
      customMines.value = null;
    }
    emit('update:modelValue', difficulty)
  }


  const maxMines = computed(() => Math.floor((customRows.value * customCols.value) / 3))
  const minRowsAndCols = 5;
  const maxRowsAndCols = 50;

  function customVlues() {
    //Validar filas
    if (customRows.value < minRowsAndCols)
      customRows.value = minRowsAndCols;
    if (customRows.value > maxRowsAndCols)
      customRows.value = maxRowsAndCols;

    // Validar columnas
    if (customCols.value < minRowsAndCols)
      customCols.value = minRowsAndCols;
    if (customCols.value > maxRowsAndCols)
      customCols.value = maxRowsAndCols;

    // Validar minas
    const maxMinesValue = Math.floor((customRows.value * customCols.value) / 3);
    if (customMines.value < 1)
      customMines.value = 1;
    if (customMines.value > maxMinesValue)
      customMines.value = maxMinesValue;

    emit(
      'update:customValues',
      {
        rows: customRows.value,
        cols: customCols.value,
        mines: customMines.value
      }
    )
  }
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-row justify-center space-x-4">
      <button
        v-for="difficulty in ['easy', 'intermediate', 'expert', 'custom']"
        :key="difficulty"
        @click="selectDifficulty(difficulty)"
        class="text"
        :class="{
          'underline': modelValue === difficulty
        }"
      >
        {{ $t(`difficultySelector.${difficulty}`) }}
      </button>
      <span class="text">|</span>
      <button
        @click="emit('viewSettings')"
        class="text"
      >
        {{ $t('gameSettings.setting') }}
      </button>
    </div>
    <div 
      v-if="modelValue == 'custom'" 
      class="flex flex-row space-x-4"
    >
      <div class="flex flex-row space-x-2">
        <p class="secondary">Filas:</p>
        <input 
          v-model.number="customRows"
          :min="minRowsAndCols"
          :max="maxRowsAndCols"
          type="number" 
          class="inputCustom"
        >
        </input>
      </div>
      <div class="flex flex-row space-x-2">
        <p class="secondary">Columnas:</p>
        <input 
          v-model.number="customCols"
          :min="minRowsAndCols"
          :max="maxRowsAndCols"
          type="number" 
          class="inputCustom"
        >
        </input>
      </div>
      <div class="flex flex-row space-x-2">
        <p class="secondary">Minas:</p>
        <input 
          v-model.number="customMines"
          :min="1"
          :max="maxMines"
          type="number" 
          class="inputCustom"
        >
        </input>
      </div>
      <button
        @click="customVlues()" 
        class="text"
      >
        Actualizar
      </button>
    </div>
  </div>
</template>

<style scoped>
  /* Para navegadores basados en WebKit (Chrome, Safari, Edge) */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
  }

  /* Para Firefox */
  input[type="number"] {
  -moz-appearance: textfield;
  }
</style>