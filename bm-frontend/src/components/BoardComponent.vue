<script setup>
	import CellComponent from '@/components/CellComponent.vue';

    defineProps({
        board: {
            type: Array,
            required: true
        },
		revealed: {
			type: Array,
			required: true
		},
		flags: {
			type: Array,
			required: true
		},
		interrogations: {
			type: Array,
			required: true
		}
    });

	const emit = defineEmits(['cell-left-click', 'cell-right-click'])
</script>

<template>
	<div :style="{ display: 'grid', gridTemplateColumns: `repeat(${board[0]?.length || 0}, 30px)` }">
		<div 
			v-for="(rows, rowIndex) in board" 
			:key="rowIndex"
		>
			<CellComponent 
				v-for="(cell, colIndex) in rows" 
				:index="`${rowIndex}-${colIndex}`"
				:cell="cell"
				:rowIndex="rowIndex"
				:colIndex="colIndex"
				:reveal="revealed[rowIndex][colIndex]"
				:flag="flags[rowIndex][colIndex]"
				:interrogation="interrogations[rowIndex][colIndex]"
				@left-click="$emit('cell-left-click', $event)"
				@rigth-click="$emit('cell-right-click', $event)"
			/>
		</div>
  	</div>
</template>