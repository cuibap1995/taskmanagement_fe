<script setup>
  import BaseButton from './components/ui/BaseButton.vue'
  import BaseBadge from './components/ui/BaseBadge.vue'
</script>

<template>
  <div>
    <section>
    <h1>Các loại Button</h1>
    <div>
      <BaseButton typeButton="primary">+ Button Label</BaseButton>
      <BaseButton typeButton="outline">+ Button Label</BaseButton>
      <BaseButton typeButton="danger">+ Button Label</BaseButton>
      <BaseButton typeButton="cancel">+ Button Label</BaseButton>
  </div>
  </section>

  <section>
    <h1>Các loại Badge</h1>
    <div>
      <BaseBadge variant="priority" value="high"></BaseBadge>
      
      <BaseBadge variant="type" value="bug"></BaseBadge>

      <BaseBadge variant="status" value="completed"></BaseBadge>
    </div>
  </section>
  </div>
  
  
</template>

<style></style>
