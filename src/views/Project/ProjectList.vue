<template>
    <div class="projects-page">
        <!-- Page Header -->
        <div class="page-header">
            <div class="page-title-content">
                <h1 class="title">Project</h1>
                <p class="subtitle">Manage and monitor your team's tasks</p>
            </div>
            <div>
                <BaseButton typeButton="primary">
                    <template #icon>
                        <Icon icon="mdi:plus" />
                    </template>
                    New Project
                </BaseButton>
            </div>
        </div>

        <!-- Filter Card -->
        <section class="filter-card">
            <div class="filter-content">
                <!-- Main Filter Row -->
                <div class="filter-main-row">
                    <div class="form-group flex-1">
                        <label>Project Name</label>
                        <div class="input-wrapper">
                            <Icon icon="mdi:magnify" class="input-icon" />
                            <input type="text" placeholder="Search by project name..." />
                        </div>
                    </div>
                    <button class="advanced-toggle-btn" @click="showAdvancedFilters = !showAdvancedFilters">
                        <Icon icon="mdi:filter-variant" />
                        Advanced Filters
                        <Icon :icon="showAdvancedFilters ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                    </button>
                </div>

                <!-- Advanced Filters - Hidden by default -->
                <div v-if="showAdvancedFilters" class="advanced-filters">
                    <div class="filter-row-advanced">
                        <div class="form-group">
                            <label>Project Manager</label>
                            <div class="input-wrapper">
                                <Icon icon="mdi:magnify" class="input-icon" />
                                <input type="text" placeholder="Project Manager Name..." />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Start Date</label>
                            <input type="date" />
                        </div>
                        <div class="form-group">
                            <label>End Date</label>
                            <input type="date" />
                        </div>
                    </div>

                    <div class="filter-row-status">
                        <select>
                            <option value="">All Status</option>
                            <option value="planning">Planning</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on_hold">On Hold</option>
                        </select>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="overdue" />
                            <label for="overdue">Overdue Only</label>
                        </div>
                    </div>
                </div>

                <!-- Filter Actions -->
                <div class="filter-row-actions">
                    <div class="bulk-info">
                        <span class="selection-text">
                            No tasks selected
                        </span>
                    </div>

                    <div class="button-group">
                        <BaseButton typeButton="primary">
                            <template #icon>
                                <Icon icon="mdi:magnify" />
                            </template>
                            Search
                        </BaseButton>
                        <BaseButton typeButton="outline">
                            <template #icon>
                                <Icon icon="mdi:refresh" />
                            </template>
                            Clear Filter
                        </BaseButton>
                        <BaseButton typeButton="outline" :disabled="true">
                            <template #icon>
                                <Icon icon="mdi:pencil-outline" />
                            </template>
                            Edit
                        </BaseButton>
                        <BaseButton typeButton="danger" :disabled="true">
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
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th class="col-check"><input type="checkbox" /></th>
                            <th>PROJECT NAME</th>
                            <th>STATUS</th>
                            <th>HEALTH</th>
                            <th>PROGRESS</th>
                            <th>TASKS</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>MANAGER</th>
                            <th class="text-center col-action">DETAIL</th>
                            <th class="text-center col-action">DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td><span class="project-name">Design UI mockup</span></td>
                            <td>
                                <BaseBadge variant="status" modelValue="in_progress" />
                            </td>
                            <td>
                                <BaseBadge variant="health" modelValue="overdue" />
                            </td>
                            <td class="bold">33%</td>
                            <td>1 / 3</td>
                            <td>2025-12-10</td>
                            <td>2025-12-10</td>
                            <td>Admin</td>
                            <td>
                                <div class="text-center">
                                    <button class="icon-btn edit">
                                        <Icon icon="mdi:eye-outline" />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="text-center">
                                    <button class="icon-btn delete">
                                        <Icon icon="mdi:delete-outline" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="pagination-table">
                <span class="showing-text"><strong>Showing 1-10 of 54 project</strong></span>
                <div class="pagination">
                    <button class="page-btn" disabled>
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
import BaseConfirmModal from '@/components/ui/BaseConfirmModal.vue';
import { Icon } from '@iconify/vue';
import '@/assets/css/main.css'
import BaseToast from '@/components/ui/BaseToast.vue';
import router from "@/router";
import { hideLoading, showLoading } from '@/utils/loading';
import { TASK_STATUS, TASK_PRIORITY, TASK_TYPE } from '@/constants/taskEnum';
import { PROJECT_STATUS, PROJECT_HEALTH } from '@/constants/projectEnum';
import { ref } from 'vue';

const showAdvancedFilters = ref(false);

</script>
<style scoped>
.filter-row-advanced {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;
}

.filter-row-status {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    align-items: end;
}

.checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
}

.checkbox-wrapper label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color);
    cursor: pointer;
    margin: 0;
}

.project-name {
    font-weight: 500;
    color: var(--text-color);
}

.col-check {
    width: 40px;
}

.text-center {
    text-align: center;
}

.bold {
    font-weight: 600;
}

@media (max-width: 768px) {
    .filter-row-advanced {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .filter-row-status {
        grid-template-columns: 1fr;
    }
}
</style>