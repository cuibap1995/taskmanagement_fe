<template>
  <nav>
    <div class="container">
      <div class="logo">
        <img
          class="logoImg"
          src="../../assets/img/logo_export.png"
          alt="logoApp"
        />
        <p class="logoText">Task Management</p>
      </div>
      <ul class="sideBarMenu">
        <li class="sideBarItem">
          <a href="#" class="redirectATag"
            ><Icon icon="mdi:home-outline" class="sideBarIcon" /><span>
              Home</span
            ></a
          >
        </li>
        <li class="sideBarItem">
          <a href="#" class="redirectATag"
            ><Icon icon="tdesign:task-1" class="sideBarIcon" /><span>
              Tasks</span
            ></a
          >
        </li>
        <li class="sideBarItem">
          <a href="#" class="redirectATag"
            ><Icon
              icon="material-symbols:folder-outline"
              class="sideBarIcon"
            /><span> Projects</span></a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { Icon } from "@iconify/vue";
</script>
<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;

  width: var(--sidebar-width);
  height: 100vh;

  font-weight: 700;
  z-index: 1000;
}

.container {
  background-color: #0f172a;
  color: white;

  width: 100%;
  height: 100%;

  padding: 20px 16px;
  box-sizing: border-box;
}

/* LOGO */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 32px;
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

  padding: 0;
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
  gap: 13px;

  width: 100%;
  padding: 10px 3px;

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
