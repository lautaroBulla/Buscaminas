<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import BoardComponent from '@/components/BoardComponent.vue';
    import GameOverComponent from '@/components/GameOverComponent.vue';
    import GameWinComponent from '@/components/GameWinComponent.vue';

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
        initBoard,
        reveal,
        rightClick,
    } = useMinesweeper(9, 9, 10);

    initBoard();

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
        initBoard();
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
        <BoardComponent 
            :board="board"
            :revealed="revealed"
            :flags="flags"
            :interrogations="interrogations"
            @cell-left-click="({row, col}) => firstClick ? boardFirstClick(row, col) : reveal(row, col)"
            @cell-right-click="({row, col}) => rightClick(row, col)"
        />

        <GameOverComponent
            :gameOver="gameOver"
            @restart-game="initBoard()"
        />

        <GameWinComponent
            :gameWin="gameWin"
            @restart-game="initBoard()"
        />
    </div>
</template>