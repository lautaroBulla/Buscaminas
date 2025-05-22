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
    }
  })

  const emit = defineEmits(['left-click', 'rigth-click'])

  function handleLeftClick () {
    emit('left-click', {row: props.rowIndex, col: props.colIndex});
}

  function handleRightClick (e) {
    e.preventDefault();
    emit('rigth-click', {row: props.rowIndex, col: props.colIndex});
  }
</script>

<template>
    <div
      :key="`${cell.row}-${cell.col}`"
      class="border w-[30px] h-[30px] border-gray-500 flex items-center justify-center hover:cursor-pointer"
      :class="reveal ? 'bg-gray-200' : 'bg-gray-400'"
      @click="handleLeftClick"
      @contextmenu="handleRightClick"
    >
      <span 
        v-if="reveal"
        class="text-red-500"
      >
        {{ cell }}
      </span> 
      <span v-else>
        <span 
          v-if="flag"
          class="text-red-500"
        >
          F
        </span> 
        <span 
          v-else-if="interrogation"
          class="text-red-500"
        >
          ?
        </span> 
      </span>
    </div>
</template>