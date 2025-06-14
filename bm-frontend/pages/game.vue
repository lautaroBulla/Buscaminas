<script setup>
  import { ref, watch, computed } from 'vue';
  import { useMinesweeper } from '~/composables/useMinesweeper';

  // Obtengo todas lasvariables de composable useMinesweeper
  const {
    rows,
    cols,
    mines,
    board,
    revealed,
    flags,
    interrogations,
    gameWin,
    firstClick,
    boardFirstClick,
    resetGame,
    reveal,
    rightClick,
    seconds,
    firstClickZero,
    interrogationsActivated
  } = useMinesweeper(9, 9, 10);
  resetGame();
    
  const difficulty = ref('easy'); //Se setea la dificultad inicial en easy
  //watch se utiliza para observar si la variable difficulty cambia
  //si cambia, se setean los valores de filas, columnas y minas
  watch(difficulty, async(newDifficulty) => { 
    if (difficulty.value !== newDifficulty) {
      switch (newDifficulty) {
        case "easy":
          rows.value = 9; cols.value = 9; mines.value = 10; resetGame(); break;
        case "intermediate":
          rows.value = 16; cols.value = 16; mines.value = 40; resetGame(); break;
        case "expert":
          rows.value = 16; cols.value = 30; mines.value = 99; resetGame(); break;
      }
    }
  })
  //esta funcion es la responsable de setear los valores cuando se selecciona la dificultad personalizada
  const setCustomValues = ({ rows: customRows, cols: customCols, mines: customMines }) => { 
    rows.value = customRows;
    cols.value = customCols;
    mines.value = customMines;
    resetGame();
  }

  const modalSettingsComponent = ref(false);
  const viewSettingComponent = () => {
    modalSettingsComponent.value = !modalSettingsComponent.value;
  }
  const updateSettingComponent = (updateSettings) => {
    firstClickZero.value = updateSettings.firstClickZero;
    interrogationsActivated.value = updateSettings.interrogationsActivated;

    viewSettingComponent()
    resetGame() 
  }

  const modalGameFinish = ref(false);
  watch(gameWin, (newValue) => {
    modalGameFinish.value = newValue;
  });
  const viewGameFinish = () => {
    modalGameFinish.value = !modalGameFinish.value;
  }
  
  // Aca se obtiene el valor de las minas restantes, conociendo el total se va a restando por cada flag que se pone
  const remainingMines = computed(() => mines.value - flags.value.flat().filter(cell => cell === true).length);
</script>

<template>
    
  <div class="flex flex-col items-center gap-y-4">
    <div class="flex flex-row gap-x-4">
      <DifficultySelectorComponent
        v-model="difficulty"
        @update:customValues="setCustomValues"
      />
      <button
        @click="viewSettingComponent"
      >
        {{ $t('gameSettings.setting') }}
      </button>
    </div>

    <div class="border">
      <HeaderComponent
        :remainingMines="remainingMines"
        :seconds="seconds"
        @comp-restart-game="resetGame()"
      />
      <BoardComponent 
        :board="board"
        :revealed="revealed"
        :flags="flags"
        :interrogations="interrogationsActivated ? interrogations : null"
        @cell-left-click="({row, col}) => firstClick ? boardFirstClick(row, col) : reveal(row, col)"
        @cell-right-click="({row, col}) => rightClick(row, col)"
      />
    </div>
  </div>

  <GameFinishComponent
    v-if="modalGameFinish"
    @close="viewGameFinish"
  />

  <SettingsModal
    v-if="modalSettingsComponent"
    :firstClickZero="firstClickZero"
    :interrogationsActivated="interrogationsActivated"
    @update="updateSettingComponent"
    @close="viewSettingComponent"
  />

</template>