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
      <span v-if="reveal">
        <span v-if="cell === 1">
          <img src="~/assets/img/one.png" alt="One" class="symbol"/>      
        </span>
        <span v-else-if="cell === 2">
          <img src="~/assets/img/two.png" alt="Two" class="symbol"/>
        </span>
        <span v-else-if="cell === 3">
          <img src="~/assets/img/three.png" alt="Three" class="symbol"/>
        </span>
        <span v-else-if="cell === 4">
          <img src="~/assets/img/four.png" alt="Four" class="symbol"/>
        </span>
        <span v-else-if="cell === 5">
          <img src="~/assets/img/five.png" alt="Five" class="symbol"/>
        </span>
        <span v-else-if="cell === 6">
          <img src="~/assets/img/six.png" alt="Six" class="symbol"/>
        </span>
        <span v-else-if="cell === 7">
          <img src="~/assets/img/seven.png" alt="Seven" class="symbol"/>
        </span>
        <span v-else-if="cell === 8">
          <img src="~/assets/img/eight.png" alt="Eight" class="symbol"/>
        </span>
        <span v-else-if="cell === 'M'">
          <img src="~/assets/img/mine.png" alt="Mine" class="symbol" />
        </span>
      </span> 

      <span v-else>
        <span 
          v-if="flag"
        >
          <img src="~/assets/img/flag.png" alt="Flag" class="symbol" />
        </span> 

        <span 
          v-else-if="interrogation"
        >
          <img src="~/assets/img/interrogation.png" alt="Interrogation" class="symbol" />
        </span> 
      </span>
      
    </div>
</template>