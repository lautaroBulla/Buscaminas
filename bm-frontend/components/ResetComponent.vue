<script setup>
	const emit = defineEmits(['restart-game'])

	function restartGame () {
		emit('restart-game');
	}
</script>

<template>
	<div class="reset-border">
		<div class="reset">
			<button 
				@click="restartGame"
			>
				<img 
					src="~/assets/img/face.png" 
					alt="Restart Game" 
					class="face"
				/>
			</button>
		</div>
	</div>
</template>