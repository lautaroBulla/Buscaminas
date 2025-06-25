<script setup>
  const props = defineProps({
    rows: {
      type: Number,
      required: true
    },
    cols: {
      type: Number,
      required: true
    },
    mines: {
      type: Number,
      required: true
    },
    modelValue: {
      type: String,
      required: true,
    }
  });

  const emit = defineEmits(['update:modelValue', 'update:customValues']);
  const customRows = ref(null);
  const customCols = ref(null);
  const customMines = ref(null);

  const difficultys = ['easy', 'intermediate', 'expert'];
  const difficulty = ref(props.modelValue);

  const selectDifficulty = (difficultyFunction) => {
    customRows.value = null;
    customCols.value = null;
    customMines.value = null;
    difficulty.value = difficultyFunction;
    emit('update:modelValue', difficultyFunction);
  }

  const minRowsAndCols = 5;
  const maxRowsAndCols = 100;

  const customVlues = () => {
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
    const minMinesValue = Math.floor((customRows.value * customCols.value) / 10);
    if (customMines.value < minMinesValue)
      customMines.value = minMinesValue;
    if (customMines.value > maxMinesValue)
      customMines.value = maxMinesValue;

    difficulty.value = "custom";
    
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

  <div class="flex gap-y-3 gap-x-3
              flex-col items-center 
              md:flex-row md:items-start md:justify-between"
  >
    <div class="flex flex-row gap-x-2">
      <button 
        v-for="difficultyFor in difficultys"
        class="primaryRanking"
        :class="difficulty === difficultyFor ? 'underline' : ''"
        @click="selectDifficulty(difficultyFor)"
      >
        {{ $t(`difficultySelector.${difficultyFor}`) }}
      </button>
    </div>

    <div class="flex flex-row gap-x-2">
      <div class="flex flex-row gap-x-1">
        <label>{{ $t('ranking.rows') }}:</label>
        <input 
          class="inputCustom"
          v-model="customRows"
          type="number"
        />
      </div>
      <div class="flex flex-row gap-x-1">
        <label>{{ $t('ranking.cols') }}:</label>
        <input 
          class="inputCustom"
          v-model="customCols"
          type="number"
        />
      </div>
      <div class="flex flex-row gap-x-1">
        <label>{{ $t('ranking.mines') }}:</label>
        <input 
          class="inputCustom"
          v-model="customMines"
          type="number"
        />
      </div>
      <button 
        class="primaryRanking"
        @click.prevent="customVlues()" 
      >
        {{ $t('ranking.update') }}
      </button>
    </div>
  </div>

</template>