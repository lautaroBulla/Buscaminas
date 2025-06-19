<script setup>
  import oneClasssic from '~/assets/img/themes/classicTheme/one.png';
  import twoClasssic from '~/assets/img/themes/classicTheme/two.png';
  import threeClasssic from '~/assets/img/themes/classicTheme/three.png';
  import fourClasssic from '~/assets/img/themes/classicTheme/four.png';
  import fiveClasssic from '~/assets/img/themes/classicTheme/five.png';
  import sixClasssic from '~/assets/img/themes/classicTheme/six.png';
  import sevenClasssic from '~/assets/img/themes/classicTheme/seven.png';
  import eightClasssic from '~/assets/img/themes/classicTheme/eight.png';
  import mineClasssic from '~/assets/img/themes/classicTheme/mine.png';
  import flagClasssic from '~/assets/img/themes/classicTheme/flag.png';
  import interrogationClasssic from '~/assets/img/themes/classicTheme/interrogation.png';

  import oneDark from '~/assets/img/themes/darkTheme/oneDark.png';
  import twoDark from '~/assets/img/themes/darkTheme/twoDark.png';
  import threeDark from '~/assets/img/themes/darkTheme/threeDark.png';
  import fourDark from '~/assets/img/themes/darkTheme/fourDark.png';
  import fiveDark from '~/assets/img/themes/darkTheme/fiveDark.png';
  import sixDark from '~/assets/img/themes/darkTheme/sixDark.png';
  import sevenDark from '~/assets/img/themes/darkTheme/sevenDark.png';
  import eightDark from '~/assets/img/themes/darkTheme/eightDark.png';
  import mineDark from '~/assets/img/themes/darkTheme/mineDark.png';
  import flagDark from '~/assets/img/themes/darkTheme/flagDark.png';
  import interrogationDark from '~/assets/img/themes/darkTheme/interrogationDark.png';

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
    },
    isHelpCell: {
      type: Boolean
    }
  });

  const { currentTheme } = useCurrentTheme();
  const { isMobile } = useIsMobile();

	const imgByTheme = {
		classicTheme: {
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
		},
    darkTheme: {
      one: oneDark,
      two: twoDark,
      three: threeDark,
      four: fourDark,
      five: fiveDark,
      six: sixDark,
      seven: sevenDark,
      eight: eightDark,
      mine: mineDark,
      flag: flagDark,
      interrogation: interrogationDark
    }
  };

  const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

  const emit = defineEmits(['left-click', 'rigth-click']);

  //pc
  const handleLeftClick = () => {
    emit('left-click', {row: props.rowIndex, col: props.colIndex});
  }
  // e se utliza para prevenir el menu contextual del click derecho
  const handleRightClick = (e) => {
    e.preventDefault();
    emit('rigth-click', {row: props.rowIndex, col: props.colIndex});
  }

  //mobile
  let timer = null;
  const changeCell = ref(false);
  const isTouched = ref(false);
  const handleTouchStart = () => {
    isTouched.value = true;
    timer = setTimeout(() => {
      changeCell.value = true;
    }, 250);
  }
  const handleTouchEnd = () => {
    isTouched.value = false;
    if (changeCell.value === true) {
      emit('rigth-click', {row: props.rowIndex, col: props.colIndex});
      clearTimeout(timer);
      timer = null;
      changeCell.value = false;
    } else {
      emit('left-click', {row: props.rowIndex, col: props.colIndex});
      clearTimeout(timer);
      timer = null;
    }
  }
  const handleTouchCancel = () => {
    isTouched.value = false;
    clearTimeout(touchTimeout);
    touchTimeout = null;
    changeCell.value = false;
  }
</script>

<template>
    <div
      :class="[
        reveal ? 'reveal' : 'cell',
        exploted ? 'reveal-lose' : '',
        isHelpCell ? 'help' : '',
        isTouched ? 'is-active' : ''
      ]"
      @click="!isMobile ? handleLeftClick() : null"
      @contextmenu="!isMobile ? handleRightClick($event) : null"
      @touchstart.prevent="isMobile ? handleTouchStart() : null"
      @touchend="isMobile ? handleTouchEnd() : null"
      @touchcancel="isMobile ? handleTouchCancel() : null"
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
      <img v-else-if="!reveal && flag" :src="imgByTheme[currentThemeComputed].flag" alt="Flag" />
      <img v-else-if="!reveal && interrogation" :src="imgByTheme[currentThemeComputed].interrogation" alt="Interrogation" />  
    </div>
</template>