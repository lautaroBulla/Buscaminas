<script setup>
	import helpImg from '~/assets/img/help.png'

	const emit = defineEmits(['help']);

	function submitHelp () {
		emit('help');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="submitHelp" class="header-buttons">
			<img :src="helpImg" alt="Help" />
		</button>
	</div>
</template>