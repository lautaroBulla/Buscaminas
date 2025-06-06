<script setup>
	import helpClassic from '~/assets/img/themes/classic/help.png';

	const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classic: {
			help: helpClassic
		}	
  };

	const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

	const emit = defineEmits(['help']);

	function submitHelp () {
		emit('help');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="submitHelp" class="header-buttons">
			<img :src="imgByTheme[currentThemeComputed].help" alt="Help" />
		</button>
	</div>
</template>