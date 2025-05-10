<script setup>
	import CellComponent from '@/components/CellComponent.vue';
	import { computed } from 'vue';

    const props = defineProps({
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

	const flatBoard = computed(() => {
		const cells = [];
		for (let row = 0; row < props.board.length; row++) {
			for (let col = 0; col < props.board[row].length; col++) {
			cells.push({
				row,
				col,
				value: props.board[row][col]
			});
			}
		}
		return cells;
	});
</script>

<template>
	<div :style="{ display: 'grid', gridTemplateColumns: `repeat(${board[0]?.length || 0}, 30px)` }">
		<CellComponent
			v-for="(cell, index) in flatBoard"
			:index="`${cell.row}-${cell.col}`"
			:cell="cell.value"
			:rowIndex="cell.row"
			:colIndex="cell.col"
			:reveal="revealed[cell.row][cell.col]"
			:flag="flags[cell.row][cell.col]"
			:interrogation="interrogations[cell.row][cell.col]"
			@left-click="$emit('cell-left-click', $event)"
			@rigth-click="$emit('cell-right-click', $event)"
			/>
  	</div>
</template>