<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import { computed } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import GameOverComponent from '@/components/GameOverComponent.vue';
    import GameWinComponent from '@/components/GameWinComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import DifficultySelectorComponent from '@/components/DifficultySelectorComponent.vue';
    import { ref, watch } from 'vue';

    const {
        rows,
        cols,
        mines,
        board,
        revealed,
        flags,
        interrogations,
        gameOver,
        gameWin,
        firstClick,
        boardFirstClick,
        resetGame,
        reveal,
        rightClick,
        seconds,
    } = useMinesweeper(9, 9, 10);
    resetGame();
    
    const difficulty = ref('custom');
    watch(difficulty, async(newDifficulty) => {
        if (difficulty !== newDifficulty) {
            switch (newDifficulty) {
                case "easy":
                    rows.value = 9; cols.value = 9; mines.value = 10; resetGame(); break;
                case "intermediate":
                    rows.value = 16; cols.value = 16; mines.value = 40; resetGame(); break;
                case "expert":
                    rows.value = 16; cols.value = 30; mines.value = 99; resetGame(); break;
            }
        }
    })
    function setCustomValues({ rows: customRows, cols: customCols, mines: customMines }) {
        rows.value = customRows;
        cols.value = customCols;
        mines.value = customMines;
        resetGame();
    }
    
    const remainingMines = computed(() => mines.value - flags.value.flat().filter(cell => cell === true).length);
</script>

<template>

    <div class="flex flex-col items-center gap-y-4">
        <!-- Componente para el selector de disficultad -->
        <DifficultySelectorComponent
            v-model="difficulty"
            @update:customValues="setCustomValues"
        />

        <div class="border">
            <HeaderComponent
                :remainingMines="remainingMines"
                :seconds="seconds"
                @comp-restart-game="resetGame()"
            />
            <BoardComponent 
                :board="board"
                :revealed="revealed"
                :flags="flags"
                :interrogations="interrogations"
                @cell-left-click="({row, col}) => firstClick ? boardFirstClick(row, col) : reveal(row, col)"
                @cell-right-click="({row, col}) => rightClick(row, col)"
            />
        </div>
    </div>

    <GameOverComponent
        :gameOver="gameOver"
        @restart-game="resetGame()"
    />

    <GameWinComponent
        :gameWin="gameWin"
        @restart-game="resetGame()"
    />
</template>