<script setup>
const props = defineProps({
    typeButton: {
        type: String,
        default: 'primary'
    }
}) 
</script>

<template>
    <button class="btn" :class="props.typeButton">
        <slot name="icon" class="btn-icon"></slot>
        <slot></slot>
    </button>
</template>

<style scoped>
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid transparent;
    line-height: 1;
}

.btn-icon {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
}

.primary {
    color: #fff;
    background: #00BFA5;
}

.outline {
    color: #00BFA5;
    background-color: #fff;
    border: 1px solid #00BFA5;
}

.danger {
    color: #fff;
    background-color: #F44336;
}

.cancel {
    color: #757575;
    background-color: #fff;
    border: 1px solid #e0e0e0;
}
</style>