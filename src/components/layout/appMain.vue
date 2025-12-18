<template>
  <main class="main">
    <slot></slot>
  </main>
</template>
<style scoped>
.main {
  position: fixed;

  top: var(--header-height);
  left: var(--sidebar-width);
  right: 0;
  bottom: 0;
  background-color: #f5f7fa;
  overflow-y: auto;
  padding: 24px;
}
</style>
