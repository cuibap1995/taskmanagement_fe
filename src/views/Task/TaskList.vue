<template>
    <div class="tasks-page">
        <!-- Title Task -->
        <div class="page-header">
            <div class="page-title-content">
                <h1 class="title">Tasks</h1>
                <p class="subtitle">Manage and monitor your team's tasks</p>
            </div>
            <div>
                <BaseButton typeButton="primary" @click="toCreatePage">
                    <template #icon>
                        <Icon icon="mdi:plus" />
                    </template>
                    New Task
                </BaseButton>
            </div>
        </div>

        <!-- Panel Filter -->
        <section class="filter-card">
            <div class="filter-content">
                <div class="filter-main-row">
                    <div class="form-group flex-1">
                        <label>Task Name</label>
                        <div class="input-wrapper">
                            <Icon icon="mdi:magnify" class="input-icon" />
                            <input type="text" v-model="filters.task_name" placeholder="Search by task name..." />
                        </div>
                    </div>
                    <button class="advanced-toggle-btn" @click="showAdvancedFilters = !showAdvancedFilters">
                        <Icon icon="mdi:filter-variant" />
                        Advanced Filters
                        <Icon :icon="showAdvancedFilters ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                    </button>
                </div>
                <!-- showAdvancedFilters = true -->
                <div v-if="showAdvancedFilters" class="advanced-filters">
                    <div class="filter-row-search-extra">
                        <div class="form-group">
                            <label>Project Name</label>
                            <div class="input-wrapper">
                                <Icon icon="mdi:magnify" class="input-icon" />
                                <input type="text" v-model="filters.project_name"
                                    placeholder="Search by project name..." />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Assignee</label>
                            <div class="input-wrapper">
                                <Icon icon="mdi:magnify" class="input-icon" />
                                <input type="text" v-model="filters.assignee_name"
                                    placeholder="Search by assignee..." />
                            </div>
                        </div>
                    </div>

                    <!-- dropdown filters -->
                    <div class="filter-row-select">
                        <select v-model="filters.type">
                            <option value="">All Type</option>
                            <option v-for="item in TASK_TYPE" :key="item.id" :value="item.id">
                                {{ item.label }}
                            </option>
                        </select>
                        <select v-model="filters.priority">
                            <option value="">All Priority</option>
                            <option v-for="item in TASK_PRIORITY" :key="item.id" :value="item.id">
                                {{ item.label }}
                            </option>
                        </select>
                        <select v-model="filters.status">
                            <option value="">All Status</option>
                            <option v-for="item in TASK_STATUS" :key="item.id" :value="item.id">
                                {{ item.label }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Filter Actions -->
                <div class="filter-row-actions">
                    <div class="bulk-info">
                        <span class="selection-text" :class="{ 'has-selection': selectedTask.length > 0 }">
                            <Icon v-if="selectedTask.length > 0" icon="mdi:check-circle" />
                            {{ selectedTask.length > 0 ? `${selectedTask.length} task(s) selected` : 'No tasks selected'
                            }}
                        </span>
                    </div>

                    <div class="button-group">
                        <BaseButton typeButton="primary" @click="fetchTasks">
                            <template #icon>
                                <Icon icon="mdi:magnify" />
                            </template>
                            Search
                        </BaseButton>
                        <BaseButton typeButton="outline" @click="clearFilter">
                            <template #icon>
                                <Icon icon="mdi:refresh" />
                            </template>
                            Clear Filter
                        </BaseButton>
                        <BaseButton typeButton="outline" :disabled="selectedTask.length === 0"
                            @click="handleSaveOrEdit">
                            <template #icon>
                                <Icon :icon="isEditMode ? 'mdi:content-save' : 'mdi:pencil-outline'" />
                            </template>
                            {{ isEditMode ? 'Save changes' : 'Edit' }}
                        </BaseButton>
                        <BaseButton typeButton="danger" :disabled="selectedTask.length === 0"
                            @click="openDeleteModalMulti">
                            <template #icon>
                                <Icon icon="mdi:delete-outline" />
                            </template>
                            Delete
                        </BaseButton>

                    </div>
                </div>
            </div>
        </section>

        <!-- Table Container -->
        <section class="table-container">
            <input type="text" id="CheckId" value="" hidden>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="col-check"><input type="checkbox" v-model="isAllSelected" /></th>
                            <th>TASK NAME</th>
                            <th>TYPE</th>
                            <th>PROJECT</th>
                            <th>ASSIGNEE</th>
                            <th>PROGRESS</th>
                            <th>PRIORITY</th>
                            <th>STATUS</th>
                            <th>DUE DATE</th>
                            <th class="text-center col-action">DETAIL</th>
                            <th class="text-center col-action">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="tasks.length === 0">
                            <td colspan="11">
                                <div class="empty-state">
                                </div>
                            </td>
                        </tr>

                        <tr v-else v-for="task in tasks" :key="task.task_id">
                            <td><input type="checkbox" v-model="selectedTask" :value="task.task_id" /></td>

                            <td class="task-cell">
                                <span class="task-title">{{ task.title }}</span>
                            </td>
                            <td>
                                <BaseBadge variant="type" :modelValue="task.type" :editable="isEditMode"
                                    @update:model-value="value => markEdited(task.task_id, 'type', value)" />
                            </td>
                            <td>{{ task.project ? task.project.project_name : '' }}</td>
                            <td>{{ task.assignee ? task.assignee.username : 'Unassigned' }}</td>
                            <td class="bold">{{ task.progress || 0 }}%</td>
                            <td>
                                <BaseBadge variant="priority" :modelValue="task.priority" :editable="isEditMode"
                                    @update:model-value="value => markEdited(task.task_id, 'priority', value)" />
                            </td>
                            <td>
                                <BaseBadge variant="status" :modelValue="task.status" :editable="isEditMode"
                                    @update:model-value="value => markEdited(task.task_id, 'status', value)" />
                            </td>
                            <td>{{ task.due_date }}</td>

                            <td class="text-center">
                                <button class="icon-btn edit" @click="toEditPage(task.task_id)" title="View Details">
                                    <Icon icon="weui:eyes-on-outlined" />
                                </button>
                            </td>

                            <td class="text-center">
                                <button class="icon-btn delete" @click="openDeleteModal(task.task_id)"
                                    title="Delete Task">
                                    <Icon icon="mdi:delete-outline" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination-table">
                <span class="showing-text"><strong>{{ showingText }}</strong></span>
                <div class="pagination">
                    <button class="page-btn" :disabled="pagination.current_page === 1"
                        @click="pagination.current_page - 1">
                        <Icon icon="mdi:chevron-left" />
                    </button>
                    <button v-for="(pages, index) in pagination.last_page" class="page-btn" :key="pages"
                        :class="{ active: pages === pagination.current_page }" @click="fetchTasks(pages)">{{ index + 1
                        }}</button>
                    <button class="page-btn" :disabled="pagination.current_page === pagination.last_page"
                        @click="pagination.current_page + 1">
                        <Icon icon="mdi:chevron-right" />
                    </button>
                </div>
            </div>
            <BaseConfirmModal v-if="showDeleteModal" mode="delete"
                message="Are you sure you want to delete this task? This action is permanent and cannot be undone."
                cancelText="Cancel" confirmText="Confirm" title="Delete this task?" @cancel="cancelDelete"
                @confirm="confirmDelete">
            </BaseConfirmModal>
            <BaseConfirmModal v-if="showDeleteModalMulti" mode="delete"
                message="Are you sure you want to delete these tasks? This action is permanent and cannot be undone."
                cancelText="Cancel" confirmText="Confirm" title="Delete these task?" @cancel="cancelDeleteMulti"
                @confirm="confirmDeleteMulti">
            </BaseConfirmModal>
            <BaseToast v-if="isToastDisplay" :toast-type="toastType" :toast-message="toastMessage"
                :toast-title="toastTitle" @close="closeToast" :class="{ 'card--leaving': isLeaving }"></BaseToast>
        </section>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseConfirmModal from '@/components/ui/BaseConfirmModal.vue';
import { Icon } from '@iconify/vue';
import '@/assets/css/main.css'
import { ref, reactive, onMounted, computed } from 'vue';
import { deleteMultipleTask, searchTask, updateMultipleTask } from '@/services/taskService';
import { deleteTask } from '@/services/taskService';
import BaseToast from '@/components/ui/BaseToast.vue';
import router from "@/router";
import { hideLoading, showLoading } from '@/utils/loading';
import { TASK_STATUS, TASK_PRIORITY, TASK_TYPE } from '@/constants/taskEnum';

const initialFilters = {
    project_id: '',
    task_name: '',
    project_name: '',
    assignee_name: '',
    type: '',
    priority: '',
    status: '',
    page: 1,
    per_page: 10
};

const tasks = ref([]);
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
});
const showDeleteModal = ref(false);
const deletingTaskId = ref(null);
const selectedTask = ref([]);
const isEditMode = ref(false);
const isFilterExpanded = ref(false);
const showAdvancedFilters = ref(false);
const editedTasks = ref({});
const toastTitle = ref('success');
const toastMessage = ref('');
const toastType = ref('success');
const isToastDisplay = ref(false);
const isLeaving = ref(false);
const filters = reactive({ ...initialFilters });
const showDeleteModalMulti = ref(false);

const handleSaveOrEdit = () => {
    if (!isEditMode.value) {
        isEditMode.value = true;
        return;
    }
    handleSaveEdit();
}
const markEdited = (task_id, field, value) => {
    if (!editedTasks.value[task_id]) {
        editedTasks.value[task_id] = {};
    }
    editedTasks.value[task_id][field] = value;
    const task = tasks.value.find(t => t.task_id === task_id);
    if (task) {
        task[field] = value;
    }
}
const getTasksNeedUpdate = () => {
    return selectedTask.value
        .filter(taskId => {
            return (
                editedTasks.value[taskId] &&
                Object.keys(editedTasks.value[taskId]).length > 0
            );
        })
        .map(taskId => ({
            task_id: taskId,
            ...editedTasks.value[taskId],
        }));
};
const handleSaveEdit = async () => {
    try {
        const payload = getTasksNeedUpdate();
        if (payload.length === 0) {
            handleToast('warning', 'Warning', 'Select field of the task to change');
            isEditMode.value = !isEditMode.value;
            return;
        }
        await updateMultipleTask(payload);
        editedTasks.value = {};
        selectedTask.value = [];
        isEditMode.value = false;
        handleToast('success', 'success', `Update tasks successfully!`);
        fetchTasks();

    } catch (e) {
        console.log(e);
        handleToast('error', 'error', 'Fail to update tasks!');
    }
}
const fetchTasks = async (page = 1) => {
    showLoading();
    try {
        filters.page = page;
        const res = await searchTask(filters);
        if (res && res.data) {
            tasks.value = res.data;
            pagination.value = res.meta;
        }
    } catch (error) {
        console.log("Error:", error);
        handleToast('error', "Error", 'Failed to load tasks');
    } finally {
        hideLoading();
    }
};

const clearFilter = () => {
    Object.assign(filters, initialFilters);
    fetchTasks(1);
}

onMounted(async () => {
    await fetchTasks();
});

const cancelDelete = () => {
    showDeleteModal.value = false;
    deletingTaskId.value = null;
}
const cancelDeleteMulti = () => {
    showDeleteModalMulti.value = false;
}
const confirmDeleteMulti = () => {
    handleDeleteMultiple();
}
const openDeleteModal = (id) => {
    showDeleteModal.value = true;
    deletingTaskId.value = id;
}
const openDeleteModalMulti = () => {
    showDeleteModalMulti.value = true;
}
const confirmDelete = async () => {
    try {
        showLoading();
        showDeleteModal.value = false;
        await deleteTask(deletingTaskId.value);
        await fetchTasks();
        handleToast('success', 'Success', 'Task deleted successfully');
    } catch (error) {
        console.log(error);
        handleToast('error', "Error", 'Failed to delete task');
    } finally {
        deletingTaskId.value = null;
        hideLoading();
    }
}
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
const isAllSelected = computed({
    get() {
        return (tasks.value.length > 0 &&
            selectedTask.value.length == tasks.value.length)
    },
    set(value) {
        if (value) {
            selectedTask.value = tasks.value.map(t => t.task_id);
        } else {
            selectedTask.value = [];
        }
        selectedTask.value = value
            ? tasks.value.map(t => t.task_id)
            : [];
    }

})
const showingText = computed(() => {
    if (!pagination.value.total || pagination.value.total === 0) {
        return 'Showing 0 of 0';
    }

    const start =
        (pagination.value.current_page - 1) * pagination.value.per_page + 1;

    const end = Math.min(
        pagination.value.current_page * pagination.value.per_page,
        pagination.value.total
    );

    return `Showing ${start} - ${end} of ${pagination.value.total}`;
});
const handleDeleteMultiple = async () => {
    if (selectedTask.value.length === 0) return;
    try {

        await deleteMultipleTask(selectedTask.value);
        showDeleteModalMulti.value = false;
        handleToast('success', 'success', `Delete ${selectedTask.length} task successfully`);
        selectedTask.value = [];
        fetchTasks();
    } catch (e) {
        console.log(e);
        handleToast('error', 'error', 'Failt to delete tasks');
    }
}
const toCreatePage = () => {
    router.push('/tasks/create');
}
const toEditPage = (id) => {
    router.push(`/tasks/detail/${id}`);
}
</script>

<style scoped>
.filter-row-search-extra {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.filter-row-select {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.task-cell {
    font-weight: 500;
}

.task-title {
    color: var(--text-color);
}

.col-check {
    width: 40px;
}

.bold {
    font-weight: 600;
}

@media (max-width: 768px) {

    .filter-row-search-extra,
    .filter-row-select {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}
</style>