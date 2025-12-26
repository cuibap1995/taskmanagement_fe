<template>
  <div class="webTitle">
    <span>Create New Task</span>
    <small>Fill in the details to create a new task for your project</small>
  </div>

  <TaskForm mode="create" ref="taskFormRef" @cancel="handleCancel" @submit="handleCreate"></TaskForm>
  <BaseToast v-if="isToastDisplay" :toast-type="toastType" :toast-message="toastMessage" :toast-title="toastTitle"
    @close="closeToast" :class="{ 'card--leaving': isLeaving }"></BaseToast>
</template>
<script setup>
import { createTask } from "@/services/taskService";
import TaskForm from "./TaskForm.vue";
import BaseToast from '@/components/ui/BaseToast.vue';
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const taskFormRef = ref(null);
const isToastDisplay = ref(false);
const isLeaving = ref(false);
const toastTitle = ref('');
const toastType = ref('success');
const toastMessage = ref('');
const closeToast = () => {
  isLeaving.value = true;
  setTimeout(() => {
    isLeaving.value = false;
    isToastDisplay.value = false;
  }, 300);
}
const handleToast = (type, title, message) => {
  isToastDisplay.value = true;
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message
  setTimeout(() => {
    closeToast();
  }, 4000);
}
const handleCreate = async (payload) => {
  try {
    await createTask(payload);
    handleToast('success', "Success", 'Task created successfully');
    setTimeout(() => {
      router.back();
    }, 2000);
  } catch (e) {
    handleToast('error', "Error", 'Failed to create task');
    console.log(e);
  }
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
