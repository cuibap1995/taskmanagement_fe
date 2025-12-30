<template>
  <nav :class="{ 'collapsed': collapsed }">
    <div class="container">
      <div class="logo">
        <img class="logoImg" src="../../assets/img/logo_export.png" alt="logoApp" />
        <p class="logoText" v-show="!collapsed">Task Management</p>
      </div>
      <ul class="sideBarMenu">
        <li class="sideBarItem">
          <RouterLink to="/" class="redirectATag" title="Home">
            <Icon icon="mdi:home-outline" class="sideBarIcon" />
            <span v-show="!collapsed">Home</span>
          </RouterLink>
        </li>
        <li class="sideBarItem">
          <RouterLink to="/tasks" class="redirectATag" title="Tasks">
            <Icon icon="tdesign:task-1" class="sideBarIcon" />
            <span v-show="!collapsed">Tasks</span>
          </RouterLink>
        </li>
        <li class="sideBarItem">
          <RouterLink to="/projects" class="redirectATag" title="Projects">
            <Icon icon="material-symbols:folder-outline" class="sideBarIcon" />
            <span v-show="!collapsed">Projects</span>
          </RouterLink>
        </li>
      </ul>
      <div class="sidebar-footer">
        <div class="sidebar-footer-item" @click="$emit('toggleCollapse')">
          <div class="redirectATag">
            <Icon :icon="collapsed ? 'mdi:arrow-collapse-right' : 'mdi:arrow-collapse-left'" class="sideBarIcon" />
            <span v-show="!collapsed">Collapse sidebar</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import '@/assets/css/main.css';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});
defineEmits(['toggleCollapse']);
</script>
<style scoped>
nav {
  width: 100%;
  height: 100%;
  font-weight: 700;
  background-color: var(--background-color);
  position: relative;
  transition: all 0.3s ease;
}

.container {
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: var(--header-height);
  box-sizing: border-box;
  transition: all 0.3s ease;
}

nav.collapsed .logo {
  justify-content: center;
  padding: 0;
}

.logoText {
  font-size: 16px;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
  display: block;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}

.logoImg {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  flex-shrink: 0;
}

/* MENU */
.sideBarMenu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;
  list-style: none;
}

nav.collapsed .sideBarMenu {
  padding: 0 8px;
}

.sidebar-footer {
  padding: 0 12px 16px 12px;
  margin-top: auto;
}

nav.collapsed .sidebar-footer {
  padding: 0 0 16px 0;
  display: flex;
  justify-content: center;
}

.sidebar-footer-item {
  cursor: pointer;
  width: 100%;
}

.sidebar-footer-item .redirectATag {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  color: white;
  opacity: 0.7;
}

.sidebar-footer-item span {
  font-size: 14px;
}

.sidebar-footer-item:hover .redirectATag {
  opacity: 1;
  background-color: #1e293b;
  border-radius: 6px;
}

/* LINK */
.redirectATag {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px 12px; 
  box-sizing: border-box; 
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.redirectATag:hover {
  background-color: #1e293b;
}

nav.collapsed .redirectATag {
  justify-content: center;
  padding: 10px;
}

/* ICON */
.sideBarIcon {
  font-size: 24px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .sidebar-footer {
    display: none !important;
  }
  .logoText,
  .sideBarItem span,
  .redirectATag span {
    display: block !important;
  }
  nav.collapsed .logo {
    justify-content: flex-start !important;
    padding: 0 16px !important;
  }

  nav.collapsed .redirectATag {
    justify-content: flex-start !important;
    padding: 10px 12px !important;
  }

  nav.collapsed .sideBarMenu {
    padding: 0 12px !important;
  }
}
</style>
