<script setup>
    import TimerComponent from './TimerComponent.vue';
    import RemainingMinesComponent from './RemainingMinesComponent.vue';
    import ResetComponent from './ResetComponent.vue';

    defineProps({
        seconds: {
            type: Number,
            required: true
        },
        remainingMines: {
            type: Number,
            required: true
        }
    })

    const emit = defineEmits(['comp-restart-game'])
</script>

<template>
    <div class="flex justify-between border">
        <RemainingMinesComponent
            :remainingMines="remainingMines"
        />
        <ResetComponent
            @restart-game="$emit('comp-restart-game')"
        />
        <TimerComponent
            :seconds="seconds"
        />
    </div>
</template>