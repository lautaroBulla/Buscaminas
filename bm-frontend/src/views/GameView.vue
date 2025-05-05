<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import BoardComponent from '@/components/Board.vue';

    const {
        board,
        revealed,
        flags,
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
            @cell-left-click="({row, col}) => reveal(row, col)"
            @cell-right-click="({row, col}) => rightClick(row, col)"
        />
    </div>
</template>