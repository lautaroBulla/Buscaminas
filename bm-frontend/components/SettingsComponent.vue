<script setup>
	import settingClassic from '~/assets/img/themes/classicTheme/settings.png';

	import settingDark from '~/assets/img/themes/darkTheme/settingsDark.png';
	
	const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classicTheme: {
			setting: settingClassic
		},
		darkTheme: {
			setting: settingDark
		}
  };

	const currentThemeComputed = computed(() => {
    return currentTheme.value;
  });

	const emit = defineEmits(['view-settings']);

	function viewSetting () {
		emit('view-settings');
	}
</script>

<template>
	<div class="header-buttons-border">
		<button @click="viewSetting" class="header-buttons">
			<img :src="imgByTheme[currentThemeComputed].setting" alt="Settings"/>
		</button>
	</div>
</template>