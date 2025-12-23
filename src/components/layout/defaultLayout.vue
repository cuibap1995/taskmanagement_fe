<script setup>
import appHeader from "./appHeader.vue";
import appSidebar from "./appSideBar.vue";
import appMain from "./appMain.vue";
import { ref } from 'vue';
import '@/assets/css/main.css'

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
<template>
  <div class="layout">
    <appHeader class="area-header" @toggleMenu="toggleSidebar"></appHeader>
    <appSidebar class="area-sidebar" :class="{ 'open': isSidebarOpen }"></appSidebar>
    <appMain class="area-main">
      <router-view> </router-view>
    </appMain>
    <div v-if="isSidebarOpen" class="overlay" @click="isSidebarOpen = false"></div>
  </div>
</template>
<style scoped>
.layout {
  height: 100vh;
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  grid-template-areas: "sidebar header" "sidebar main";
}

.area-header {
  grid-area: header;
}

.area-sidebar {
  grid-area: sidebar;
  transition: all 0.3s ease;
}

.area-main {
  grid-area: main;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-areas: "header" "main";
  }

  .area-sidebar {
    display: block;
    position: fixed;
    top: 0;
    left: -100%;
    width: 260px;
    height: 100vh;
    z-index: 999;
    background-color: var(--background-color);
  }

  .area-sidebar.open {
    left: 0;
    box-shadow: 4px 0 15px rgba(0, 0, 0, 0.5);
  }

  .area-main {
    padding: 12px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
}
</style>
