<script setup>
    const props = defineProps({
        variant: {
            type: String,
            required: true // // status | priority | type
        },
        value: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <span class="span" :class="[`badge--${variant}`, `${variant}--${value}`]">
        <slot>{{ value }}</slot>
    </span>
</template>

<style scoped>
    .span {
        padding: 8px 4px;
        border-radius: 4px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        text-transform: capitalize;
    }

    /* ===== STATUS ===== */
    .status--open {
        color: #64748B;
        background-color: #ECEFF1;
    }
    .status--working {
        color: #3B82F6;
        background-color: #E3F2FD;
    }
    .status--pending {
        color: #F59E0B;
        background-color: #FFF8E1;
    }
    .status--completed {
        color: #10B981;
        background-color: #E0F2F1;
    }

    /* ===== PRIORITY ===== */
    .priority--high{
        color: #EF4444;
        background-color: #FDECEA;
    }
    .priority--medium{
        color: #F97316;
        background-color: #FFF3E0;
    }
    .priority--low{
        color: #84CC16;
        background-color: #E8F5E9;
    }

    /* ===== TYPE ===== */
    .type--task{
        color: #64748B;
        background-color: #ECEFF1;
    }
    .type--feature{
        color: #1D4ED8;
        background-color: #E3F2FD;
    }
    .type--bug{
        color: #DC2626;
        background-color: #FCE4EC;
    }
    .type--Enhancemant{
        color: #6D28D9;
        background-color: #EDE7F6;
    }
</style>