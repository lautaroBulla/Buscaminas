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
</script>

<template>
	<div class="button-border">
		<button @click="$emit('help')" class="button w-[38px] h-[38px]">
			<img :src="imgByTheme[currentThemeComputed].help" alt="Help" />
		</button>
	</div>
</template>