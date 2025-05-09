<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import { computed } from 'vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import GameOverComponent from '@/components/GameOverComponent.vue';
    import GameWinComponent from '@/components/GameWinComponent.vue';
    import HeaderComponent from '@/components/HeaderComponent.vue';

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
    
    const remainingMines = computed(() => mines.value - flags.value.flat().filter(cell => cell === true).length);

    function changeDifficulty(event) {
        const option = event.target.value; 
        switch (option) {
            case "easy":
                rows.value = 9; cols.value = 9; mines.value = 10; break;
            case "intermediate":
                rows.value = 16; cols.value = 16; mines.value = 40; break;
            case "difficult":
                rows.value = 24; cols.value = 24; mines.value = 99; break;
            default:
                rows.value = 9; cols.value = 9; mines.value = 10; break;
        }
        resetGame();
    }
</script>

<template>
    <div class="flex flex-col">
        <div class="flex justify-between">
            <h1 class="text-red-500 text-center">Buscaminas</h1>
            <div>
                <label>Dificultad</label>
                <select @change="changeDifficulty">
                    <option value="easy" selected>
                        Fácil
                    </option>
                    <option value="intermediate">
                        Intermedio
                    </option>
                    <option value="difficult">
                        Dificil
                    </option>
                </select>
            </div>
        </div>
        <div>
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