<script setup>
  import { ref, computed } from 'vue';

  import faceEasyClassic from '~/assets/img/themes/classicTheme/faceEasy.png';
  import faceIntermediateClassic from '~/assets/img/themes/classicTheme/faceIntermediate.png';
  import faceExpertClassic from '~/assets/img/themes/classicTheme/faceExpert.png';

  import faceEasyDark from '~/assets/img/themes/darkTheme/faceEasyDark.png';
  import faceIntermediateDark from '~/assets/img/themes/darkTheme/faceIntermediateDark.png';
  import faceExpertDark from '~/assets/img/themes/darkTheme/faceExpertDark.png';
  
  defineProps({
    modelValue: {
      type: String,
      required: true,
    }
  })

  const { currentTheme } = useCurrentTheme();

  const imgByTheme = {
    classicTheme: {
      easy: {
        face: faceEasyClassic
      },
      intermediate: {
        face: faceIntermediateClassic
      },
      expert: {
        face: faceExpertClassic
      }
    },
		darkTheme: {
      easy: {
        face: faceEasyDark
      },
      intermediate: {
        face: faceIntermediateDark
      },
      expert: {
        face: faceExpertDark
      }
		}	
  };

	const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

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
  const maxRowsAndCols = 100;

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

  const index = ref(0);
  const difficultys = ['easy', 'intermediate', 'expert'];
  const difficulty = ref('easy');
  const changeDifficulty = (newIndex) => {
    if (newIndex > 2) {
      index.value = 0;
    } else if (newIndex < 0) {
      index.value = 2;
    } else {
      index.value = newIndex;
    }
    difficulty.value = difficultys[index.value];
    selectDifficulty(difficulty.value);
  }
</script>

<!-- v-for="difficulty in ['easy', 'intermediate', 'expert', 'custom']" -->
<template>
  <div :class="`${currentTheme}`">

    <div class="border-external-sm flex flex-col space-y-2 w-[250px]">
      <div class="border-sm">
        <div class="border-internal-sm flex flex-row justify-between items-center px-1">

          <div class="button-border"> 
            <button class="button-sm w-[20px] h-[20px]" 
                    @click="changeDifficulty(index - 1)">
              <
            </button>
          </div>

          <label
            :key="difficulty"
            class="text flex flex-row items-center gap-x-2"
            :title="$t(`difficultySelector.${difficulty}Title`)"
          >
            <img
              :src="imgByTheme[currentThemeComputed][difficulty].face"
              class="w-[15px] h-[15px]"
            />
            {{ $t(`difficultySelector.${difficulty}`) }}
            <img
              :src="imgByTheme[currentThemeComputed][difficulty].face"
              class="w-[15px] h-[15px]"
            />
          </label>
          <div class="button-border"> 
            <button class="button-sm w-[20px] h-[20px]" 
                    @click="changeDifficulty(index + 1)">
              >
            </button>
          </div>

        </div>
      </div>
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

<!-- <div 
  v-if="modelValue == 'custom'" 
  class="border-t border-t-quinary"
>
  <div class="flex flex-row space-x-4 pt-2">

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

</div> -->