<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import BoardComponent from '@/components/BoardComponent.vue';
    import GameOverComponent from '@/components/GameOverComponent.vue';
    import GameWinComponent from '@/components/GameWinComponent.vue';

    const {
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
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-red-500 text-center">Minesweeper</h1>
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