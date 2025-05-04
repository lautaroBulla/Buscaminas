<script setup>
	import CellComponent from '@/components/Cell.vue';

    defineProps({
        board: {
            type: Array,
            required: true
        }
    });
</script>

<template>
	<div :style="{ display: 'grid', gridTemplateColumns: `repeat(${board[0]?.length || 0}, 30px)` }">
		<div 
			v-for="(rows, rowIndex) in board" 
			:key="rowIndex"
		>
			<CellComponent 
				v-for="(cell, colIndex) in rows" 
				:key="`${rowIndex}-${colIndex}`"
				:cell="cell"
				:rowIndex="rowIndex"
				:colIndex="colIndex"
			/>
		</div>
  	</div>
</template>