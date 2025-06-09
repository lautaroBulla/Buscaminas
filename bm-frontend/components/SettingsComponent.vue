<script setup>
	import settingClassic from '~/assets/img/themes/classic/settings.png';

	import settingDark from '~/assets/img/themes/dark/settingsDark.png';
	
	const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classic: {
			setting: settingClassic
		},
		dark: {
			setting: settingDark
		}
  };

	const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

	const emit = defineEmits(['open-settings']);

	function openSettings () {
		emit('open-settings');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="openSettings" class="header-buttons">
			<img :src="imgByTheme[currentThemeComputed].setting" alt="Settings"/>
		</button>
	</div>
</template>