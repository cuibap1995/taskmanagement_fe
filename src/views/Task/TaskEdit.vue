<template>
  <div class="webTitle">
    <span>Update Task</span>
    <small>Update task information and track progress</small>
  </div>

  <TaskForm mode="update"> </TaskForm>
</template>
<script setup>
import TaskForm from "./TaskForm.vue";
</script>
<style scoped>
.webTitle {
  margin-top: 50px;
  margin-bottom: 20px;
}

.webTitle span {
  font-size: 45px;
  font-weight: 650;
  display: block;
  margin-bottom: 2px;
}

.webTitle small {
  color: grey;
  margin-left: 10px;
}
</style>
