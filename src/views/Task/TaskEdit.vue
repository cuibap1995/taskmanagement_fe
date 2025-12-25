<template>
  <div class="webTitle">
    <span>Update Task</span>
    <small>Update task information and track progress</small>
  </div>

  <TaskForm  mode="update" :data="formData" @submit="handleSubmit" @cancel="handleCancel" @delete="openDeleteModal">
  </TaskForm>
  <BaseToast v-if="isToastDisplay" :toast-type="toastType" :toast-message="toastMessage" :toast-title="toastTitle"
    @close="closeToast" :class="{ 'card--leaving': isLeaving }"></BaseToast>
  <BaseConfirmModal v-if="showDeleteModal" mode="delete"
    message="Are you sure you want to delete this task? This action is permanent and cannot be undone."
    cancelText="Cancel" confirmText="Confirm" title="Delete this task?" @cancel="cancelDelete" @confirm="confirmDelete">
  </BaseConfirmModal>
</template>
<script setup>
import TaskForm from "./TaskForm.vue";
import { deleteTask, getTaskById, updateTask } from "@/services/taskService";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import BaseToast from "@/components/ui/BaseToast.vue";
import BaseConfirmModal from '@/components/ui/BaseConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const formData = ref({});

const id = route.params.id;
const toastTitle = ref('success');
const toastMessage = ref('');
const toastType = ref('success');
const isToastDisplay = ref(false);
const isLeaving = ref(false);
const isDeleteLoading = ref(false);
const showDeleteModal = ref(false);
const deletingTaskId = ref()
const handleToast = (type, title, message) => {
  isToastDisplay.value = true;
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message
  setTimeout(() => {
    closeToast();
  }, 4000);
}
const fetchTask = async () => {
  try {
    const res = await getTaskById(id);
    formData.value = res.data;
    handleToast('success', 'success', "Load task successfully")
  } catch (e) {
    console.log(e);
    handleToast('error', 'error', "Fail to load task")
  }
};
onMounted(() => {
  fetchTask();
});
const closeToast = () => {
  isLeaving.value = true;
  setTimeout(() => {
    isLeaving.value = false;
    isToastDisplay.value = false;
  }, 300);
}
const handleSubmit = async (payload) => {
  try {
    await updateTask(id, payload);
    handleToast('success', 'success', "Task updated successfully");
    router.back();
  } catch (e) {
    console.log(e);
    handleToast('error', 'error', 'Fail to update task');
  }
}
const handleCancel = () => {
  router.back();
}
const cancelDelete = () => {
  showDeleteModal.value = false;
  deletingTaskId.value = null;
}
const openDeleteModal = () => {
  showDeleteModal.value = true;
  deletingTaskId.value = id;
}
const confirmDelete = async () => {
  try {
    isDeleteLoading.value = true;
    showDeleteModal.value = false;
    const isDeleted = await deleteTask(deletingTaskId.value);
    if (isDeleted) {
      router.push('/tasks');
      handleToast('success', 'Success', 'Task deleted successfully');
    }
  } catch (error) {
    console.log(error);
    handleToast('error', "Error", 'Failed to delete task');
  } finally {
    deletingTaskId.value = null;
    isDeleteLoading.value = false;
  }
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
