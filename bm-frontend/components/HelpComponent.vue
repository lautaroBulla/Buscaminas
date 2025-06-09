<script setup>
	import helpClassic from '~/assets/img/themes/classicTheme/help.png';
	
	import helpDark from '~/assets/img/themes/darkTheme/helpDark.png';

	const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classicTheme: {
			help: helpClassic
		},
		darkTheme: {
			help: helpDark
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