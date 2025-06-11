<script setup>
	import { computed } from 'vue';

	const { isMobile } = useIsMobile();

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
		},
		explotedCell: { 
			type: Object 
		}
	});

	const emit = defineEmits(['cell-left-click', 'cell-right-click']);

	/*
	Esta funcion se encargara de cambiar las filas por columnas, 
	asi el tablero se adapte de forma correcta al mobile
	*/
	const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

	//Se verifica si es mobile o no para hacer el cambio
	const boardToUse = computed(() => isMobile.value ? transpose(props.board) : props.board);
	const revealedToUse = computed(() => isMobile.value  ? transpose(props.revealed) : props.revealed);
	const flagsToUse = computed(() => isMobile .value ? transpose(props.flags) : props.flags);
	const interrogationsToUse = computed(() => props.interrogations ? (isMobile.value  ? transpose(props.interrogations) : props.interrogations) : null);

	/*Esta funcion se encargara de retornas un array de cells con cada dato de la misma,
	necesaria para el diseño del tablero, ya que si no las cells no se adaptaban bien a los bordes del tablero
	*/
	const flatBoard = computed(() => {
		const cells = [];
		for (let row = 0; row < boardToUse.value.length; row++) {
			for (let col = 0; col < boardToUse.value[row].length; col++) {
				cells.push({
					row,
					col,
					value: boardToUse.value[row][col]
				});
			}
		}
		return cells;
	});

	/*funcion que enviara los datos correctos a la logica, ya que si es mobile row y col se cambian, 
	sin esto se rompe la logica del juego
	*/
	const onCellLeftClick = (row, col) => {
		if (isMobile.value) {
			emit('cell-left-click', { row: col, col: row }); 
		} else {
			emit('cell-left-click', { row, col });
		}
	}
	const onCellRightClick = (row, col) => {
		if (isMobile.value) {
			emit('cell-right-click', { row: col, col: row }); 
		} else {
			emit('cell-right-click', { row, col });
		}
	}
</script>

<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: `repeat(${boardToUse[0]?.length || 0}, minmax(${!isMobile ? 25 : 20}px, 1fr))`
    }"
    class="border-internal"
  >
    <CellComponent
      v-for="(cell) in flatBoard"
      :cell="cell.value"
      :rowIndex="cell.row"
      :colIndex="cell.col"
      :reveal="revealedToUse[cell.row][cell.col]"
      :flag="flagsToUse[cell.row][cell.col]"
      :interrogation="interrogationsToUse ? interrogationsToUse[cell.row][cell.col] : false"
      :exploted="explotedCell && explotedCell.row === cell.row && explotedCell.col === cell.col"
      @left-click="onCellLeftClick(cell.row, cell.col)"
  		@rigth-click="onCellRightClick(cell.row, cell.col)"
    />
  </div>
</template>