<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    variant: {
        type: String,
        required: true // status | priority | type
    },
    modelValue: {
        type: String, 
        required: true
    },
    editable: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);
const badgeRef = ref(null);

const options = {
    status: [
        { id: 'Open', label: 'Open', color: '#64748B', bgColor: '#ECEFF1' },
        { id: 'Working', label: 'Working', color: '#3B82F6', bgColor: '#E3F2FD' },
        { id: 'Pending Review', label: 'Pending Review', color: '#F59E0B', bgColor: '#FFF8E1' },
        { id: 'Completed', label: 'Completed', color: '#10B981', bgColor: '#E0F2F1' }
    ],
    priority: [
        { id: 'High', label: 'High', color: '#EF4444', bgColor: '#FDECEA' },
        { id: 'Medium', label: 'Medium', color: '#F97316', bgColor: '#FFF3E0' },
        { id: 'Low', label: 'Low', color: '#84CC16', bgColor: '#E8F5E9' }
    ],
    type: [
        { id: 'Task', label: 'Task', color: '#64748B', bgColor: '#ECEFF1' },
        { id: 'Feature', label: 'Feature', color: '#1D4ED8', bgColor: '#E3F2FD' },
        { id: 'Bug', label: 'Bug', color: '#DC2626', bgColor: '#FCE4EC' },
        { id: 'Enhancement', label: 'Enhancement', color: '#6D28D9', bgColor: '#EDE7F6' }
    ]
};

const currentOptions = computed(() => options[props.variant] || []);


const currentOption = computed(() => {
    const found = currentOptions.value.find(opt =>
        opt.id.toLowerCase() === props.modelValue?.toLowerCase()
    );
    return found || { label: props.modelValue || 'Unknown', color: '#333', bgColor: '#eee' };
});

const toggleDropdown = () => {
    if (props.editable) isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (optionId) => {
    if (optionId !== props.modelValue) {
        emit('update:modelValue', optionId);
    }
    isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && badgeRef.value && !dropdownRef.value.contains(event.target) && !badgeRef.value.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};

onMounted(() => { document.addEventListener('click', handleClickOutside); });
onUnmounted(() => { document.removeEventListener('click', handleClickOutside); });
</script>

<template>
    <div class="badge-wrapper">
        <span ref="badgeRef" class="span-badge" :class="{ 'badge--editable': editable }"
            :style="{ color: currentOption.color, backgroundColor: currentOption.bgColor }" @click="toggleDropdown">
            {{ currentOption.label }}

            <Icon v-if="editable" icon="mdi:chevron-down" class="dropdown-arrow"
                :class="{ 'dropdown-arrow--open': isDropdownOpen }" />
        </span>

        <Transition name="fade">
            <div v-if="editable && isDropdownOpen" ref="dropdownRef" class="dropdown-menu">
                <div v-for="opt in currentOptions" :key="opt.id" class="dropdown-item"
                    :class="{ 'dropdown-item--active': opt.id == modelValue }" @click="selectOption(opt.id)">
                    <span class="dot" :style="{ backgroundColor: opt.color }"></span>
                    <span class="label">{{ opt.label }}</span>
                    <Icon v-if="opt.id == modelValue" icon="mdi:check" class="check-icon" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.badge-wrapper {
    position: relative;
    display: inline-block;
}

.span-badge {
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    user-select: none;
    white-space: nowrap;
}

.badge--editable {
    cursor: pointer;
    padding-right: 8px;
}

.badge--editable:hover {
    filter: brightness(0.95);
}

.dropdown-arrow {
    font-size: 14px;
    transition: transform 0.2s;
    opacity: 0.7;
}

.dropdown-arrow--open {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 50;
    min-width: 140px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 4px;
}

.dropdown-item {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 13px;
    color: #475569;
}

.dropdown-item:hover {
    background-color: #f1f5f9;
}

.dropdown-item--active {
    background-color: #e2e8f0;
    font-weight: 600;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
    flex-shrink: 0;
}

.label {
    flex: 1;
}

.check-icon {
    color: #10b981;
    font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>