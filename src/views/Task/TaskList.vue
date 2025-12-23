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
            <div class="filter-header" @click="isFilterExpanded = !isFilterExpanded">
                <div class="filter-title">
                    <Icon icon="mdi:filter-variant" />
                    <span>Bộ lọc tìm kiếm</span>
                </div>
                <Icon icon="mdi:chevron-down" class="toggle-icon" :class="{ 'rotated': isFilterExpanded }" />
            </div>
            <div class="filter-body" :class="{ 'show': isFilterExpanded }">
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
                            <option value="task">Task</option>
                            <option value="feature">Feature</option>
                            <option value="bug">Bug</option>
                            <option value="enhancement">Enhancement</option>
                        </select>
                        <select v-model="filters.priority">
                            <option value="">All Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <select v-model="filters.status">
                            <option value="">All Status</option>
                            <option value="open">Open</option>
                            <option value="working">Working</option>
                            <option value="pending">Pending Review</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <!-- Bulk Action -->
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
                            @click="isEditMode = !isEditMode">
                            <template #icon>
                                <Icon :icon="isEditMode ? 'mdi:content-save' : 'mdi:pencil-outline'" />
                            </template>
                            {{ isEditMode ? 'Save' : 'Edit' }}
                        </BaseButton>
                        <BaseButton typeButton="danger" :disabled="selectedTask.length === 0"
                            @click="deleteSelectedTasks">
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
                            <th class="text-center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="isLoading">
                            <td colspan="10" style="text-align: center;padding: 20px">Loading data...</td>
                        </tr>
                        <tr v-else-if="tasks.length === 0">
                            <td colspan="10" style="text-align: center; padding: 20px;">No Data Found</td>
                        </tr>
                        <tr v-else v-for="task in tasks" :key="task.task_id">
                            <td><input type="checkbox" v-model="selectedTask" :value="task.task_id" /></td>
                            <td class="task-cell">
                                <span class="task-title">{{ task.title }}</span>
                            </td>
                            <td>
                                <BaseBadge variant="type" v-model="task.type" :editable="isEditMode" />
                            </td>
                            <td>{{ task.project ? task.project.project_name : '' }}</td>
                            <td>{{ task.assignee ? task.assignee.username : 'Unassigned' }}</td>
                            <td class="bold">{{ task.progress || 0 }}%</td>
                            <td>
                                <BaseBadge variant="priority" v-model="task.priority" :editable="isEditMode">
                                </BaseBadge>
                            </td>
                            <td>
                                <BaseBadge variant="status" v-model="task.status" :editable="isEditMode"></BaseBadge>
                            </td>

                            <td>{{ task.due_date }}</td>

                            <td>
                                <div class="action-buttons">
                                    <div>
                                        <button class="icon-btn edit" :taskId=task.task_id
                                            @click="toEditPage(task.task_id)">
                                            <Icon icon="weui:eyes-on-outlined" />
                                        </button>
                                    </div>
                                    <button class="icon-btn delete" :taskId=task.task_id
                                        @click="openDeleteModal(task.task_id)">
                                        <Icon icon="mdi:delete-outline" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination-table">
                <span class="showing-text">Showing <strong>...</strong> of {{ tasks.length }}</span>
                <div class="pagination">
                    <button class="page-btn">
                        <Icon icon="mdi:chevron-left" />
                    </button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <span class="page-dots">...</span>
                    <button class="page-btn">11</button>
                    <button class="page-btn">
                        <Icon icon="mdi:chevron-right" />
                    </button>
                </div>
            </div>
            <BaseConfirmModal v-if="showDeleteModal" mode="delete"
                message="Are you sure you want to delete this task?\nThis action is permanent and cannot be undone."
                cancelText="Cancel" confirmText="Confirm" title="Delete this task?" @cancel="cancelDelete"
                @confirm="confirmDelete">
            </BaseConfirmModal>
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
import { searchTask } from '@/services/taskService';
import router from "@/router";

const initialFilters = {
    project_id: '',
    task_name: '',
    project_name: '',
    assignee_name: '',
    type: '',
    priority: '',
    status: '',
    page: 1
};

const tasks = ref([]);
const isLoading = ref(false);
const pagination = ref({});
const showDeleteModal = ref(false);
const deletingTaskId = ref(null);
const selectedTask = ref([]);
const isEditMode = ref(false);
const isFilterExpanded = ref(false);
const showAdvancedFilters = ref(false);

const isopenBread = [
    { label: 'Tasks', to: '/tasks' },
    { label: 'Create New Task' }
]

const filters = reactive({ ...initialFilters });

const fetchTasks = async (page = 1) => {
    isLoading.value = true;
    try {
        filters.page = page;
        const res = await searchTask(filters);
        if (res && res.data) {
            tasks.value = res.data.data;
            pagination.value = res.data;
        }
    } catch (error) {
        console.log("Error:", error);
    } finally {
        isLoading.value = false;
    }
};

const clearFilter = () => {
    Object.assign(filters, initialFilters);
    fetchTasks(1);
}

onMounted(() => {
    fetchTasks();
});

const cancelDelete = () => {
    showDeleteModal.value = false;
    deletingTaskId.value = null;
}
const openDeleteModal = (id) => {
    showDeleteModal.value = true;
    deletingTaskId.value = id;
}
const confirmDelete = async () => {
    try {
        const isDeleted = await deleteTask(deletingTaskId.value);
        if (isDeleted) {
            await handleTaskList();
        }
    } catch (error) {
        console.log(error);
    } finally {
        showDeleteModal.value = false;
        deletingTaskId.value = null;
    }
}
const handleTaskList = async () => {
    try {
        const res = await getTaskList();
        tasks.value = res.data;
        console.log(res.data)
    } catch (e) {
        console.log(e);
    }
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
const toCreatePage = () => {
    router.push('/tasks/create');
}
const toEditPage = (id) => {
    router.push(`/tasks/edit/${id}`);
}
</script>

<style scoped>
/* Title Header */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}

.subtitle {
    font-size: 12px;
    color: var(--grey-color);
    margin-top: 0;
    margin-bottom: 12px;
}

/* Panel Filter */
.filter-header {
    display: none;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    font-weight: 600;
    color: var(--text-color);
}

.filter-title {
    display: flex;
    align-items: center;
    gap: 8px;
}

.toggle-icon {
    transition: transform 0.3s ease;
}

.toggle-icon.rotated {
    transform: rotate(180deg);
}

.filter-card {
    background: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
}

.filter-row-search,
.filter-row-select {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-color);
}

.input-wrapper {
    position: relative;
    width: 100%;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--grey-color);
    transition: color 0.2s;
}

input,
select {
    width: 100%;
    height: 40px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0 12px 0 38px;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

input[type="checkbox"] {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
    cursor: pointer;
}

select {
    padding-left: 12px;
    background-color: var(--white-color);
}

input:focus,
select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 191, 165, 0.1);
}

.input-wrapper:focus-within .input-icon {
    color: var(--primary-color);
}

.filter-main-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    margin-bottom: 20px;
}

.filter-main-row .flex-1 {
    flex: 1;
}

.advanced-toggle-btn {
    height: 40px;
    padding: 0 16px;
    background: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--text-color);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.advanced-toggle-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.advanced-filters {
    animation: slideDown 0.3s ease;
    margin-bottom: 20px;
}

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

.filter-row-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid var(--border-color);
    margin-top: 10px;
}

.bulk-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.bulk-action-buttons {
    display: flex;
    gap: 12px;
    padding-left: 15px;
    border-left: 1px solid var(--border-color);
}

.btn-action-inline {
    background: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: all 0.2s;
}

.btn-action-inline.edit {
    color: #0288d1;
}

.btn-action-inline.edit:hover {
    background-color: #e1f5fe;
}

.btn-action-inline.delete {
    color: var(--error-color);
}

.btn-action-inline.delete:hover {
    background-color: #fbe9e7;
}

/* Table Container */
.table-container {
    background-color: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    margin-top: 24px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.selection-text {
    font-size: 14px;
    color: var(--grey-color);
    display: flex;
    align-items: center;
    gap: 6px;
}

.selection-text.has-selection {
    color: var(--primary-color);
    font-weight: 600;
}

.button-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.button-group button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.pagination-table {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 24px;
    background-color: #fcfcfc;
}

.showing-text {
    font-size: 16px;
    color: var(--grey-color);
}

.pagination {
    display: flex;
    gap: 6px;
    align-items: center;
}

.page-btn {
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    background: var(--white-color);
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color);
    transition: all 0.2s ease;
}

.page-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.page-btn.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    color: var(--white-color);
}

.page-dots {
    color: var(--grey-color);
    padding: 0 4px;
}

.table-wrapper {
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

.data-table thead {
    background-color: var(--background-color);
    color: var(--white-color);
}

.data-table th {
    padding: 10px 4px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
}

.data-table td {
    padding: 10px 4px;
    border-bottom: 1px solid var(--border-color);
    font-size: 14px;
    color: var(--text-color);
}

.data-table tbody tr:hover {
    background-color: #f9fafb;
}

.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: flex;
    padding: 4px;
    border-radius: 4px;
    transition: background 0.2s;
}

.icon-btn.view {
    color: #00bcd4;
}

.icon-btn.delete {
    color: var(--error-color);
}

.icon-btn:hover {
    background-color: #f1f5f9;
}

@media (max-width: 768px) {
    .filter-header {
        display: flex;
        margin-bottom: 0;
        border-bottom: none;
    }

    .filter-body {
        display: none;
        padding-top: 15px;
        border-top: 1px solid var(--border-color);
        animation: slideDown 0.3s ease;
    }

    .filter-body.show {
        display: block;
    }

    .filter-row-search,
    .filter-row-select {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .filter-row-actions {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .bulk-action-bar {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }

    .bulk-action-bar .button-group {
        width: 100%;
        flex-wrap: wrap;
    }

    .bulk-action-bar .button-group>* {
        flex: 1;
        min-width: 120px;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>