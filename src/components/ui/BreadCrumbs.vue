<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const breadcrumbs = computed(() => {
    const bc = route.meta.breadcrumbs;
    if (!bc) return [];
    return typeof bc === 'function' ? route(bc) : bc
})
</script>
<template>
    <nav class="breadcrumb" v-if="breadcrumbs.length">
        <template v-for="(item, index) in breadcrumbs" :key="index">
            <span v-if="index !== 0" class="breadcrumb-separator">></span>
            <RouterLink v-if="item.isHome" :to="item.path" class="breadcrumb-home">
                <Icon icon="flat-color-icons:home" />
            </RouterLink>
            <RouterLink v-else-if="item.path && index !== breadcrumbs.length - 1" :to="item.path"
                class="breadcrumb-link">
                {{ item.label }}
            </RouterLink>
            <span v-else class="breadcrumb-active">
                {{ item.label }}
            </span>
        </template>
    </nav>
</template>
<style scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #6b7280;
    user-select: none;
}

/* Home */
.breadcrumb-home {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    color: #4b5563;
    text-decoration: none;
}

.breadcrumb-home:hover {
    color: #00BFA5;
}

.icon-home {
    width: 16px;
    height: 16px;
}

/* Separator */
.breadcrumb-separator {
    margin: 0 8px;
    color: #9ca3af;
}


/* Normal link */
.breadcrumb-link {
    color: #00BFA5;
    text-decoration: none;
}

.breadcrumb-link:hover {
    text-decoration: underline;
}

/* Active */
.breadcrumb-active {
    color: #757575;
    font-weight: 400;
}
</style>