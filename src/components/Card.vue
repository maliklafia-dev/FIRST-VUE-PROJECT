<script setup>
import { defineProps } from 'vue';
defineProps({
    bg: {
        type: String,
        default: 'bg-gray-100 rounded-lg shadow-md'
    }
});
</script>

<template>
    <div :class="`${bg}`">
        <slot></slot>
    </div>
</template>