<script setup>
    import { ref, computed } from 'vue';
    
    defineProps({
        modelValue: {
            type: String,
            required: true,
        }
    })

    const emit = defineEmits(['update:modelValue', 'update:customValues']);

    function selectDifficulty(difficulty) {
        emit('update:modelValue', difficulty)
    }

    const customRows = ref(9);
    const customCols = ref(9);
    const customMines = ref(10);
    
    const maxMines = computed(() => Math.floor((customRows.value * customCols.value) / 3))
    const minRowsAndCols = 5;
    const maxRowsAndCols = 50;

    function customVlues() {
        //Validar filas
        if (customRows.value < minRowsAndCols)
            customRows.value = minRowsAndCols;
        if (customRows.value > maxRowsAndCols)
            customRows.value = maxRowsAndCols;

        // Validar columnas
        if (customCols.value < minRowsAndCols)
            customCols.value = minRowsAndCols;
        if (customCols.value > maxRowsAndCols)
            customCols.value = maxRowsAndCols;

        // Validar minas
        const maxMinesValue = Math.floor((customRows.value * customCols.value) / 3);
        if (customMines.value < 1)
            customMines.value = 1;
        if (customMines.value > maxMinesValue)
            customMines.value = maxMinesValue;
        
        emit(
            'update:customValues',
            {
                rows: customRows.value,
                cols: customCols.value,
                mines: customMines.value
            }
        )
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
    <div 
        v-if="modelValue == 'custom'" 
        class="flex flex-row gap-x-2"
    >
        <div class="flex">
            <label>Filas:</label>
            <input 
                v-model.number="customRows"
                :min="minRowsAndCols"
                :max="maxRowsAndCols"
                type="number" value="rows" class="border w-[50px]"
            >
            </input>
        </div>
        <div class="flex">
            <label>Columnas:</label>
            <input 
                v-model.number="customCols"
                :min="minRowsAndCols"
                :max="maxRowsAndCols"
                type="number" value="cols" class="border w-[50px]"
            >
            </input>
        </div>
        <div class="flex">
            <label>Minas:</label>
            <input 
                v-model.number="customMines"
                :min="1"
                :max="maxMines"
                type="number" value="mines" class="border w-[50px]"
            >
            </input>
        </div>
        <button
            @click="customVlues()" 
            class="border hover:cursor-pointer"
        >
            Actualizar
        </button>
    </div>
</template>

<style scoped>
    /* Para navegadores basados en WebKit (Chrome, Safari, Edge) */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Para Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>