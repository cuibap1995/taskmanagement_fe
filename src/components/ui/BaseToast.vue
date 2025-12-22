<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
const prop = defineProps({
    toastType: {
        type: String,
        default: 'success'
    },
    toastMessage: {
        type: String,
        default: "Task created successfully"
    },
    toastTitle: {
        type: String,
        default: 'Success'
    }
});
const iconByMode = {
    success: 'material-symbols:check',
    error: 'mdi:cross-circle',
    warning: 'material-symbols:info-outline-rounded'
}
const toastClass = computed(() => `card--${prop.toastType}`);
const titleIcon = computed(() => iconByMode[prop.toastType]);
const emit = defineEmits(['close']);
</script>
<template>
    <div class="card" :class="toastClass">
        <div class="card-icon">
            <Icon :icon="titleIcon" width="20" height="20" />
        </div>
        <div class="card-main">
            <div class="card-main__header">{{ prop.toastTitle }}</div>
            <div class="card-main__body">{{ prop.toastMessage }}</div>
        </div>
        <button class="card-close" @click="emit('close')">
            <Icon icon="akar-icons:cross" />
        </button>
    </div>
</template>
<style scoped>
.card {
    max-width: 360px;
    height: auto;
    padding: 15px 20px;
    background-color: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 17px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    gap: 15px;
    position: fixed;
    bottom:24px;
    right:24px;
    animation: slideInRight 0.35s ease-out;
    z-index:10000000000;
}

.card:hover {
    transform: translateX(-0.5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
}

.card--success {
    border-left: green solid 5px;
}

.card--error {
    border-left: 5px solid red;
}

.card-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    flex-shrink: 0;
}

.card--warning {
    border-left: 5px solid #FF9800;
}

.card-close {
    background-color: #fff;
    color: grey;
    font-size: 20px;
    border: none;
    transition: color 0.2s ease, transform 0.2s ease;
}

.card-main {
    flex-grow: 6;
}

.card-main__header {
    text-align: left;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 550;
}

.card-main__body {
    text-align: left;
    text-transform: capitalize;
    font-size: 13px;
    color: grey;
    margin-top: 10px;
}

.card--success .card-icon {
    color: white;
    background: green;
}

.card--error .card-icon {
    background-color: red;
    color: white;
}

.card--warning .card-icon {
    background-color: #FF9800;
    color: white;
}

.card-close:hover {
    color: rgb(49, 49, 49);
    transform: scale(1.1);

}

@keyframes slideInRight {
    from {
        transform: translateX(24px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    to {
        transform: translateX(24px);
        opacity: 0;
    }
}

.card--leaving {
    animation: slideOutRight 0.25s ease-in forwards;
}
</style>