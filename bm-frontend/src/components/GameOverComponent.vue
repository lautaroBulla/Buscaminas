<script setup>
    defineProps({
        gameOver: {
            type: Boolean,
            required: true
        },
    });

    const emit = defineEmits(['restart-game'])
</script>

<template>
    <div 
        v-if="gameOver" 
        class="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
    >
        <div class="bg-black w-1/3 h-1/4 border-2 border-gray-500 flex flex-col justify-center items-center">
            <p>
                Has perdido
            </p>
            <button class="bg-gray-800 hover:cursor-pointer" @click="emit('restart-game')">
                Aceptar
            </button>
        </div>
    </div>
</template>