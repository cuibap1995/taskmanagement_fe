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
                        <input type="text" placeholder="Search by task name..." />
                    </div>
                </div>
                <div class="form-group">
                    <label>Project Name</label>
                    <div class="input-wrapper">
                        <Icon icon="mdi:magnify" class="input-icon" />
                        <input type="text" placeholder="Search by project name..." />
                    </div>
                </div>
                <div class="form-group">
                    <label>Assignee</label>
                    <div class="input-wrapper">
                        <Icon icon="mdi:magnify" class="input-icon" />
                        <input type="text" placeholder="Search by assignee..." />
                    </div>
                </div>
            </div>

            <div class="filter-row-select">
                <select>
                    <option>All Type</option>
                    <option>Task</option>
                    <option>Feature</option>
                    <option>Bug</option>
                    <option>Enhancement</option>
                </select>
                <select>
                    <option>All Priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <select>
                    <option>All Status</option>
                    <option>Open</option>
                    <option>Working</option>
                    <option>Pending Review</option>
                    <option>Completed</option>
                </select>
            </div>

            <!-- Bulk Action -->
            <div class="filter-row-actions">
                <span class="selection-text">No tasks selected</span>
                <div class="button-group">
                    <BaseButton typeButton="primary">
                        <template #icon>
                            <Icon icon="mdi:magnify" />
                        </template> Search
                    </BaseButton>
                    <BaseButton typeButton="outline">
                        <template #icon>
                            <Icon icon="mdi:refresh" />
                        </template> Clear Filter
                    </BaseButton>
                    <BaseButton typeButton="outline" class="info-btn">
                        <template #icon>
                            <Icon icon="mdi:pencil-outline" />
                        </template> Edit
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
                        <tr v-for="i in 7" :key="i">
                            <td><input type="checkbox" /></td>
                            <td class="task-cell">
                                <span class="task-title">Design UI mockup</span>
                            </td>
                            <td>
                                <BaseBadge variant="type" value="task"></BaseBadge>
                            </td>
                            <td>Website Redesign</td>
                            <td>Nguyễn Văn A</td>
                            <td class="bold">65%</td>
                            <td>
                                <BaseBadge variant="priority" value="medium"></BaseBadge>
                            </td>
                            <td>
                                <BaseBadge variant="status" value="working"></BaseBadge>
                            </td>
                            <td>2025-12-10</td>
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