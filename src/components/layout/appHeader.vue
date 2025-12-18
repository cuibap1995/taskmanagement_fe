<template>
  <header>
    <span>
      <Icon icon="mdi:bell-outline" class="classIcon" />
    </span>
    <span>
      <div class="userIcon">AD</div>
    </span>
  </header>
</template>
<style scoped>
header {
  margin: 0;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  right: 0;
  left: var(--sidebar-width, 280px);

  height: 60px;
  background-color: #0f172a;

  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;

  color: white;
  z-index: 1000;
}

.classIcon {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  font-size: 20px;
  color: black;
  background-color: #fff;
  border-radius: 6px;
}

.userIcon {
  background-color: #0bac9f;

  width: 40px;
  height: 40px;

  font-size: 18px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
}
</style>
<script setup>
import { Icon } from "@iconify/vue";
</script>
