<script setup>
  const emit = defineEmits(['change']);
  const customRows = ref(9);
  const customCols = ref(9);
  const customMines = ref(10);

  const difficultys = ['easy', 'intermediate', 'expert'];
  const difficulty = ref('easy');

  const selectDifficulty = (difficultyFunction) => {
  difficulty.value = difficultyFunction;
    switch (difficultyFunction) {
      case "easy":
        customRows.value = 9; customCols.value = 9; customMines.value = 10; break;
      case "intermediate":
        customRows.value = 16; customCols.value = 16; customMines.value = 40; break;
      case "expert": 
        customRows.value = 16; customCols.value = 30; customMines.value = 99; break;
    }
    emit('change', 
    {
      rows: customRows.value,
      cols: customCols.value,
      mines: customMines.value
    });
  }
    
  const minRowsAndCols = 5;
  const maxRowsAndCols = 100;
  const customVlues = () => {
    difficulty.value = "custom";

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
    
    emit(
      'change',
      {
        rows: customRows.value,
        cols: customCols.value,
        mines: customMines.value
    })
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

    <div class="hidden md:flex flex-row gap-x-2">
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