<script setup>
    defineProps({
        key: {
            type: String,
            required: true
        },
        cell: {
            type: Object,
            required: true
        },
        rowIndex: {
            type: Number,
            required: true
        },
        colIndex: {
            type: Number,
            required: true
        }
    })
</script>

<template>
    <div
        :key="key"
        class="border border-gray-400 flex items-center justify-center hover:cursor-pointer"
    >
        {{ cell }}
    </div>
</template>