<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { TASK_STATUS, TASK_PRIORITY, TASK_TYPE } from '@/constants/taskEnum';

const props = defineProps({
    variant: { type: String, required: true }, // status | priority | type
    modelValue: { type: Number, required: true },
    editable: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const containerRef = ref(null)

const enumMap = {
  status: TASK_STATUS,
  priority: TASK_PRIORITY,
  type: TASK_TYPE
};

const currentOptions = computed(() => {
    const options = enumMap[props.variant]
    if(Array.isArray(options)) {
        return options;
    }
    if (options && typeof options === 'object') {
        return Object.values(options);
    }
    return [];
})

const currentOption = computed(() =>
    currentOptions.value.find(o => o.id === props.modelValue)
)

const currentStyle = computed(() => ({
    color: currentOption.value?.color || '#333',
    backgroundColor: currentOption.value?.bg || '#eee'
}))

const toggle = () => {
    if (props.editable) isOpen.value = !isOpen.value
}

const select = (id) => {
    if (id !== props.modelValue) {
        emit('update:modelValue', id)
    }
    isOpen.value = false
}

const displayLabel = computed(() => {
    return currentOption.value
        ? currentOption.value.label
        : 'Unknown'
})

const handleClickOutside = (e) => {
    if (containerRef.value && !containerRef.value.contains(e.target)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
    <div class="badge-wrapper" ref="containerRef">
        <span
            class="span-badge"
            :class="{ 'badge--editable': editable }"
            :style="currentStyle"
            @click="toggle"
        >
            {{ displayLabel }}

            <Icon
                v-if="editable"
                icon="mdi:chevron-down"
                class="dropdown-arrow"
                :class="{ 'dropdown-arrow--open': isOpen }" 
            />
            </span>

        <Transition name="fade">
            <div v-if="editable && isOpen" class="dropdown-menu">
                <div
                    v-for="opt in currentOptions"
                    :key="opt.id"
                    class="dropdown-item"
                    :class="{ 'dropdown-item--active': opt.id === modelValue }"
                    @click="select(opt.id)"
                >
                    <span class="dot" :style="{ backgroundColor: opt.color }"></span>
                    
                    <span class="label">{{ opt.label }}</span>
                    
                    <Icon 
                        v-if="opt.id === modelValue" 
                        icon="mdi:check" 
                        class="check-icon" 
                    />
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