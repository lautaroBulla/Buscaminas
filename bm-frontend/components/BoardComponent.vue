<script setup>
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
			required: false
		}
	});

	//se definen los emits provenientes de CellComponent, que toma el evento de click
	const emit = defineEmits(['cell-left-click', 'cell-right-click'])

	//esta funcion se encarga de formatear el tablero para que sea un array de objetos, donde cada objeto tiene la fila y columna
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
	<div 
		:style="{ 
			display: 'grid', 
			gridTemplateColumns: `repeat(${board[0]?.length || 0}, 25px)`
		}"
		class="board-border-internal"
	>
		<CellComponent
			v-for="(cell, index) in flatBoard"
			:cell="cell.value"
			:rowIndex="cell.row"
			:colIndex="cell.col"
			:reveal="revealed[cell.row][cell.col]"
			:flag="flags[cell.row][cell.col]"
			:interrogation="interrogations ? interrogations[cell.row][cell.col] : false"
			@left-click="$emit('cell-left-click', $event)"
			@rigth-click="$emit('cell-right-click', $event)"
		/>
	</div>
</template>