<script setup>
    import GameView from './views/GameView.vue';
    import NavComponent from './components/NavComponent.vue';
    import LanguageSelectorComponent from './components/LanguageSelectorComponent.vue';
</script>

<template>
    <NavComponent />
    <div class="flex justify-end">
        <LanguageSelectorComponent />
    </div>
    <GameView />
</template>