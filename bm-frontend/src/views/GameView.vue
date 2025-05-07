<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import BoardComponent from '@/components/Board.vue';
    import GameOver from '@/components/GameOver.vue';

    const {
        board,
        revealed,
        flags,
        interrogations,
        initBoard,
        reveal,
        rightClick,
        gameOver
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
            @cell-left-click="({row, col}) => reveal(row, col)"
            @cell-right-click="({row, col}) => rightClick(row, col)"
        />

        <GameOver
            :gameOver="gameOver"
            @restart-game="initBoard()"
        />
    </div>
</template>