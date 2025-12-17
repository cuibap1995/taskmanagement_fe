<script setup>
import appHeader from "./appHeader.vue";
import appSidebar from "./appSideBar.vue";
import appMain from "./appMain.vue";
</script>
<template>
  <div class="layout">
    <appHeader></appHeader>
    <appSidebar></appSidebar>
    <appMain>
      <router-view> </router-view>
    </appMain>
  </div>
</template>
<style scoped>
.layout {
  height: 100vh;
}
</style>
