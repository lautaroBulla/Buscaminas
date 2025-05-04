<script setup>
    import { useMinesweeper } from '@/composables/useMinesweeper';
    import BoardComponent from '@/components/Board.vue';

    const {
        board,
        initBoard,
    } = useMinesweeper(16, 16, 40);

    initBoard();
</script>

<template>
    <div class="flex flex-col">
        <h1 class="text-red-500 text-center">Minesweeper</h1>
        <BoardComponent 
            :board="board"
        />
    </div>
</template>