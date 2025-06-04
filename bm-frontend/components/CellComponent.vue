<script setup>
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
      <img v-if="reveal && cell === 1" src="~/assets/img/one.png" alt="One" />
      <img v-else-if="reveal && cell === 2" src="~/assets/img/two.png" alt="Two" />
      <img v-else-if="reveal && cell === 3" src="~/assets/img/three.png" alt="Three" />
      <img v-else-if="reveal && cell === 4" src="~/assets/img/four.png" alt="Four" />
      <img v-else-if="reveal && cell === 5" src="~/assets/img/five.png" alt="Five" />
      <img v-else-if="reveal && cell === 6" src="~/assets/img/six.png" alt="Six" />
      <img v-else-if="reveal && cell === 7" src="~/assets/img/seven.png" alt="Seven" />
      <img v-else-if="reveal && cell === 8" src="~/assets/img/eight.png" alt="Eight" />
      <img v-else-if="reveal && cell === 'M'" src="~/assets/img/mine.png" alt="Mine" />

      <!-- Si no revelada -->
      <img v-else-if="flag" src="~/assets/img/flag.png" alt="Flag" />
      <img v-else-if="interrogation" src="~/assets/img/interrogation.png" alt="Interrogation" />  
    </div>
</template>