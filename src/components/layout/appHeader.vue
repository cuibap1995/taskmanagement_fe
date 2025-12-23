<template>
  <header>
    <div class="menu-btn" @click="$emit('toggleMenu')">
      <Icon icon="mdi:menu" />
    </div>

    <div class="header-right">
      <span>
        <Icon icon="mdi:bell-outline" class="classIcon" />
      </span>
      <span>
        <div class="userIcon">AD</div>
      </span>
    </div>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #0f172a;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  color: white;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-btn {
  font-size: 28px;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
}

.classIcon {
  width: 32px;
  height: 32px;
  color: black;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
}

.userIcon {
  background-color: #0bac9f;
  width: 32px;
  height: 32px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}

@media (max-width: 768px) {
  header {
    justify-content: space-between;
    padding: 0 16px; 
  }
  .menu-btn {
    display: flex;
  }
}
</style>
<script setup>
import { Icon } from "@iconify/vue";
defineEmits(['toggleMenu']);
</script>
