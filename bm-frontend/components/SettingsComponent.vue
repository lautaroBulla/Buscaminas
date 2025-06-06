<script setup>
	import settingClassic from '~/assets/img/themes/classic/settings.png';
	
	const { currentTheme } = useCurrentTheme();

	const imgByTheme = {
		classic: {
			setting: settingClassic
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