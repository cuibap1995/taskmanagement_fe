<script setup>
import { computed } from 'vue';
import BaseButton from './BaseButton.vue';
import { Icon } from '@iconify/vue';
const prop = defineProps({
    mode: {
        type: String,
        default: 'delete'
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    confirmText: {
        type: String,
        default: "Confirm"
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    }
});
const modeClass = computed(() => `card--${prop.mode}`);
const emit = defineEmits(['confirm', 'cancel']);
</script>
<template>
    <div class="overlay">
        <div class="container">
            <div class="card" :class="modeClass">
                <div class="card-header">
                    <div class="title-wrapper">
                        <Icon class="card-icon" icon="streamline-cyber-color:bin" />
                        <h3 class="card-title">{{ title }}</h3>
                    </div>
                </div>
                <div class="card-body">
                    <p>{{ message }}</p>
                </div>
                <div class="btn">
                    <BaseButton type-button="danger" @click="emit('confirm')">{{ confirmText }}</BaseButton>
                    <BaseButton type-button="primary" @click="emit('cancel')">{{ cancelText }}</BaseButton>
                </div>
            </div>

        </div>
    </div>
</template>
<style scoped>
.container {
    width: 420px;
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: #fff;
    border-radius: 8px;
    padding: 16px 20px;
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
}

.card--delete {
    background: linear-gradient(180deg,
            #fff1f2 0%,
            #ffffff 60%);
}

.card--delete .card-title {
    color: #b91c1c;
}

.title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.title-icon {
    font-size: 22px;
    color: #b91c1c;
}

.card-title {
    font-size: 20px;
    text-align: center;
    font-weight: 700;
}

.card-body {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 400;
    color: black;
}

.btn {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
}
</style>
