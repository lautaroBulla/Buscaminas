<script setup>
    const emit = defineEmits(['restart-game', 'close'])
</script>

<template>
    <div 
        class="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
    >
        <div class="bg-black w-1/3 border-2 border-gray-500 flex flex-col p-5">
            <div class="flex justify-end">
                <button
                    @click="emit('close')"
                >
                    Cerrar
                </button>
            </div>
            <p class="flex justify-center">
                Has finalizado
            </p>
            <div class="flex justify-center">           
                <button class="border hover:cursor-pointer" @click="emit('restart-game')">
                    Aceptar
                </button>
            </div>
        </div>
    </div>
</template>