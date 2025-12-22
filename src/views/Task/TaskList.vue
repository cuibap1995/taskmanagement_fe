<template>
    <div class="tasks-page">
        <!-- Title Task -->
        <div class="page-header">
            <div class="page-title-content">
                <h1 class="title">Tasks</h1>
                <p class="subtitle">Manage and monitor your team's tasks</p>
            </div>
            <a href="/tasks/create">
                <BaseButton typeButton="primary">
                    <template #icon>
                        <Icon icon="mdi:plus" />
                    </template>
                    New Task
                </BaseButton>
            </a>
        </div>

        <!-- Panel Filter -->
        <section class="filter-card">
            <div class="filter-row-search">
                <div class="form-group">
                    <label>Task Name</label>
                    <div class="input-wrapper">
                        <Icon icon="mdi:magnify" class="input-icon" />
                        <input type="text" v-model="filters.task_name" placeholder="Search by task name..." />
                    </div>
                </div>
                <div class="form-group">
                    <label>Project Name</label>
                    <div class="input-wrapper">
                        <Icon icon="mdi:magnify" class="input-icon" />
                        <input type="text" v-model="filters.project_name" placeholder="Search by project name..." />
                    </div>
                </div>
                <div class="form-group">
                    <label>Assignee</label>
                    <div class="input-wrapper">
                        <Icon icon="mdi:magnify" class="input-icon" />
                        <input type="text" v-model="filters.assignee_name" placeholder="Search by assignee..." />
                    </div>
                </div>
            </div>

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

            <!-- Bulk Action -->
            <div class="filter-row-actions">
                <span class="selection-text">No tasks selected</span>
                <div class="button-group">
                    <BaseButton typeButton="primary" @click="fetchTasks">
                        <template #icon>
                            <Icon icon="mdi:magnify" />
                        </template> Search
                    </BaseButton>
                    <BaseButton typeButton="outline" @click="clearFilter">
                        <template #icon>
                            <Icon icon="mdi:refresh" />
                        </template> Clear Filter
                    </BaseButton>
                    <BaseButton typeButton="outline" class="info-btn" @click="isEditMode = !isEditMode">
                        <template #icon>
                            <Icon icon="mdi:pencil-outline" />
                        </template> {{ isEditMode ? 'Save changes' : 'Edit' }}
                    </BaseButton>
                    <BaseButton typeButton="danger">
                        <template #icon>
                            <Icon icon="mdi:delete-outline" />
                        </template> Delete
                    </BaseButton>
                </div>
            </div>
        </section>

        <!-- Table Container -->
        <section class="table-container">
            <div class="pagination-table">
                <span class="showing-text">Showing <strong>1-10</strong> of 54 tasks</span>
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

            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="col-check"><input type="checkbox" /></th>
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
                            <td><input type="checkbox"></td>
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

                            <td>{{ task.expected_end_date }}</td>

                            <td>
                                <div class="action-buttons">
                                    <button class="icon-btn edit">
                                        <Icon icon="mdi:pencil-box-outline" />
                                    </button>
                                    <button class="icon-btn delete">
                                        <Icon icon="mdi:delete-outline" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="pagination-table">
                <span class="showing-text">Showing <strong>1-10</strong> of 54 tasks</span>
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
        </section>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import { Icon } from '@iconify/vue';
import '@/assets/css/main.css'
import { ref, reactive, onMounted } from 'vue';
import { searchTask } from '@/services/taskService';

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

const isEditMode = ref(false);

onMounted(() => {
    fetchTasks();
});
</script>

<style scoped>
/* Title Header */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
}

.title {
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}

.subtitle {
    font-size: 16px;
    color: var(--grey-color);
}

/* Panel Filter */
.filter-card {
    background: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
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

.filter-row-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.selection-text {
    color: var(--grey-color);
    font-size: 14px;
    font-style: italic;
}

.button-group {
    display: flex;
    gap: 10px;
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

.pagination-table {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
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
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.data-table td {
    padding: 16px 20px;
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

.icon-btn.edit {
    color: #00bcd4;
}

.icon-btn.delete {
    color: var(--error-color);
}

.icon-btn:hover {
    background-color: #f1f5f9;
}
</style>