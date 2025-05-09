<script setup>
    defineProps({
        modelValue: {
            type: String,
            required: true,
        }
    })

    const emit = defineEmits(['update:modelValue']);

    function selectDifficulty(difficulty) {
        emit('update:modelValue', difficulty)
    }
</script>

<template>
    <div class="flex flex-row">
        <button
            v-for="difficulty in ['easy', 'intermediate', 'expert', 'custom']"
            :key="difficulty"
            @click="selectDifficulty(difficulty)"
            class="px-4"
            :class="{
                'underline': modelValue === difficulty
            }"
        >
            {{ difficulty === 'easy' ? 'Fácil' : difficulty === 'intermediate' ? 'Intermedio' : difficulty === 'expert' ? 'Difícil' : 'Personalizado' }}
        </button>
    </div>
</template>