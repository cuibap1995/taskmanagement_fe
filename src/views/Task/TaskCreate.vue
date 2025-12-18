<template>
  <div class="webTitle">
    <span>Create New Task</span>
    <small>Fill in the details to create a new task for your project</small>
  </div>

  <TaskForm mode="create" @cancel="handleCancel" @submit="handleCreate"> </TaskForm>
</template>
<script setup>
import { createTask } from "@/services/taskService";
import TaskForm from "./TaskForm.vue";
import router from "@/router";
const handleCreate = async (payload) => {
  await createTask(payload);
}
const handleCancel = () => {
  router.back();
}
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
