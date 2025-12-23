<template>
  <nav>
    <div class="container">
      <div class="logo">
        <img class="logoImg" src="../../assets/img/logo_export.png" alt="logoApp" />
        <p class="logoText">Task Management</p>
      </div>
      <ul class="sideBarMenu">
        <li class="sideBarItem">
          <RouterLink to="/" class="redirectATag">
            <Icon icon="mdi:home-outline" class="sideBarIcon" /><span>
              Home</span>
          </RouterLink>
        </li>
        <li class="sideBarItem">
          <RouterLink to="/tasks" class="redirectATag">
            <Icon icon="tdesign:task-1" class="sideBarIcon" /><span>
              Tasks</span>
          </RouterLink>
        </li>
        <li class="sideBarItem">
          <RouterLink to="#" class="redirectATag">
            <Icon icon="material-symbols:folder-outline" class="sideBarIcon" /><span> Projects</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import '@/assets/css/main.css';
</script>
<style scoped>
nav {
  width: 100%;
  height: 100%;
  font-weight: 700;
  background-color: var(--background-color);
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
}

.logoText {
  font-size: 18px;
  font-weight: 600;

  height: 30px;
  line-height: 30px;

  display: block;
  margin: 0;
}

.logoImg {
  width: 30px;
  height: 30px;
  border-radius: 5px;
}

/* MENU */
.sideBarMenu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
  margin: 0;
  list-style: none;
}

/* ITEM */
.sideBarItem {
  font-size: 20px;
  font-weight: 600;
}

/* LINK */
.redirectATag {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 10px 0;
  color: white;
  text-decoration: none;
  border-radius: 6px;

  transition: background-color 0.2s ease;
}

.redirectATag:hover {
  background-color: #1e293b;
}

/* ICON */
.sideBarIcon {
  font-size: 28px;
}
</style>
