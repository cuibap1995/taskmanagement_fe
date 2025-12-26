<template>
    <Transition name="fade">
        <div v-if="loadingStore.isLoading" class="loading-overlay">
            <div class="loading-container">
                <div class="spinner"></div>
                <p class="loading-message">{{ loadingStore.message }}</p>
            </div>
        </div>
    </Transition>
</template>
<script setup>
import { loadingStore } from '@/utils/loading';
</script>
<style scoped>
/* Loading Overlay (Blur Background & Disable Interaction) */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    /* semi-transparent gray overlay */
    backdrop-filter: blur(5px);
    /* blur the background behind */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: all;
    /* disable interaction behind overlay */
    opacity: 0;
    animation: overlayFade 0.5s ease forwards;
    transition: opacity 0.3s ease;
}

/* Loading Container (Centered Box) */
.loading-container {
    background: rgba(255, 255, 255, 0.95);
    padding: 30px 40px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    min-width: 280px;
    transform: scale(0.95);
    animation: containerPop 0.4s ease forwards;
}

/* Container Pop Animation */
@keyframes containerPop {
    from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* Spinner */
.spinner-wrapper {
    width: 60px;
    height: 60px;
    position: relative;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 5px solid #d1d5db;
    border-top: 5px solid #6b7280;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
}

.spinner-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(107, 114, 128, 0.3) 0%, transparent 70%);
    animation: pulse 2.5s ease-in-out infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.6;
    }

    50% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 1;
    }
}

/* Loading Message */
.loading-message {
    color: #374151;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.5px;
}

/* Fade Animation for Overlay */
@keyframes overlayFade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

/* Responsive */
@media (max-width: 480px) {
    .loading-container {
        width: 220px;
        padding: 20px 25px;
    }

    .spinner-wrapper {
        width: 50px;
        height: 50px;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border-width: 4px;
    }

    .loading-message {
        font-size: 14px;
    }
}
</style>
