<template>
  <main class="main">
    <BreadCrumbs></BreadCrumbs>
    <slot></slot>
  </main>
</template>
<script setup>
import BreadCrumbs from '../ui/BreadCrumbs.vue';
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  padding: 12px 24px;
  box-sizing: border-box;
}
</style>
