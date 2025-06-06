<script setup>
  import oneClasssic from '~/assets/img/themes/classic/one.png';
  import twoClasssic from '~/assets/img/themes/classic/two.png';
  import threeClasssic from '~/assets/img/themes/classic/three.png';
  import fourClasssic from '~/assets/img/themes/classic/four.png';
  import fiveClasssic from '~/assets/img/themes/classic/five.png';
  import sixClasssic from '~/assets/img/themes/classic/six.png';
  import sevenClasssic from '~/assets/img/themes/classic/seven.png';
  import eightClasssic from '~/assets/img/themes/classic/eight.png';
  import mineClasssic from '~/assets/img/themes/classic/mine.png';
  import flagClasssic from '~/assets/img/themes/classic/flag.png';
  import interrogationClasssic from '~/assets/img/themes/classic/interrogation.png';

  const props = defineProps({
    cell: {
      type: [Number, String],
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    },
    reveal: {
      type: Boolean,
      required: true
    },
    flag: {
      type: Boolean,
      required: true
    },
    interrogation: {
      type: Boolean,
      required: true
    },
    exploted: {
      type: Boolean
    }
  });

  const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classic: {
			one: oneClasssic,
      two: twoClasssic,
      three: threeClasssic,
      four: fourClasssic,
      five: fiveClasssic,
      six: sixClasssic,
      seven: sevenClasssic,
      eight: eightClasssic,
      mine: mineClasssic,
      flag: flagClasssic,
      interrogation: interrogationClasssic
		}	
  };

  const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

  const emit = defineEmits(['left-click', 'rigth-click']);

  function handleLeftClick () {
    emit('left-click', {row: props.rowIndex, col: props.colIndex});
  }

  // e se utliza para prevenir el menu contextual del click derecho
  function handleRightClick (e) {
    e.preventDefault();
    emit('rigth-click', {row: props.rowIndex, col: props.colIndex});
  }
</script>

<template>
    <div
      :class="[
        reveal ? 'reveal' : 'cell',
        exploted ? 'reveal-lose' : ''
      ]"
      @click="handleLeftClick"
      @contextmenu="handleRightClick"
    >
      <img v-if="reveal && cell === 1" :src="imgByTheme[currentThemeComputed].one" alt="One" />
      <img v-else-if="reveal && cell === 2" :src="imgByTheme[currentThemeComputed].two" alt="Two" />
      <img v-else-if="reveal && cell === 3" :src="imgByTheme[currentThemeComputed].three" alt="Three" />
      <img v-else-if="reveal && cell === 4" :src="imgByTheme[currentThemeComputed].four" alt="Four" />
      <img v-else-if="reveal && cell === 5" :src="imgByTheme[currentThemeComputed].five" alt="Five" />
      <img v-else-if="reveal && cell === 6" :src="imgByTheme[currentThemeComputed].six" alt="Six" />
      <img v-else-if="reveal && cell === 7" :src="imgByTheme[currentThemeComputed].seven" alt="Seven" />
      <img v-else-if="reveal && cell === 8" :src="imgByTheme[currentThemeComputed].eight" alt="Eight" />
      <img v-else-if="reveal && cell === 'M'" :src="imgByTheme[currentThemeComputed].mine" alt="Mine" />

      <!-- Si no revelada -->
      <img v-else-if="flag" :src="imgByTheme[currentThemeComputed].flag" alt="Flag" />
      <img v-else-if="interrogation" :src="imgByTheme[currentThemeComputed].interrogation" alt="Interrogation" />  
    </div>
</template>