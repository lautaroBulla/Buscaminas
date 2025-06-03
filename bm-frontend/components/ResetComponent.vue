<script setup>
	const emit = defineEmits(['restart-game'])

	function restartGame () {
		emit('restart-game');
	}
</script>

<template>
	<button 
		@click="restartGame"
	>
		R
	</button>
</template>