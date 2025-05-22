<script setup>
	const emit = defineEmits(['restart-game'])

	function restartGame () {
		emit('restart-game');
	}
</script>

<template>
	<button 
		class="border"
		@click="restartGame"
	>
		R
	</button>
</template>