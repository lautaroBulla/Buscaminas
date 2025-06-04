<script setup>
	import settingImg from '~/assets/img/settings.png';

	const emit = defineEmits(['open-settings']);

	function openSettings () {
		emit('open-settings');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="openSettings" class="header-buttons">
			<img :src="settingImg" alt="Settings"/>
		</button>
	</div>
</template>