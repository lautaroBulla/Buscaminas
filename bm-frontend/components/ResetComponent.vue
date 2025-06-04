<script setup>
  import face from '~/assets/img/face.png';
	import faceWin from '~/assets/img/faceWin.png';
	import faceLose from '~/assets/img/faceLose.png';

	const props = defineProps({
    gameOver: {
      type: Boolean,
      required: true
    },
    gameWin: {
      type: Boolean,
      required: true
    }
  })

	const faceImage = computed(() => {
		if (props.gameOver) {
			return faceLose;
		} else if (props.gameWin) {
			return faceWin;
		} else {
			return face;
		}
	});
	
	const faceAlt = computed(() => {
		if (props.gameOver) {
			return 'Game Over';
		} else if (props.gameWin) {
			return 'You Win';
		} else {
			return 'Restart Game';
		}
	});

	const emit = defineEmits(['restart-game'])

	function restartGame () {
		emit('restart-game');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="restartGame" class="header-buttons">
			<img :src="faceImage" :alt="faceAlt"/>
		</button>
	</div>
</template>