<template>
    <div class="page-wrapper">

        <header class="page-header">
            <h1 class="title">Design Project mockup</h1>
            <div class="header-actions">
                <BaseButton typeButton="primary">
                    <template #icon>
                        <Icon icon="mdi:pencil-outline" />
                    </template>
                    Edit
                </BaseButton>
                <BaseButton typeButton="danger">
                    <template #icon>
                        <Icon icon="mdi:delete-outline" />
                    </template>
                    Delete
                </BaseButton>
            </div>
        </header>

        <div class="project-info-card">
            <div class="card-body-grid">

                <div class="left-panel">
                    <h3 class="block-title">Description</h3>
                    <p class="description-text">
                        Design a responsive homepage UI for both desktop and mobile, meeting the following requirements:
                    </p>
                    <ul class="description-list">
                        <li>Modern and user-friendly design.</li>
                        <li>Responsive design across all devices.</li>
                        <li>Adhere to brand guidelines.</li>
                    </ul>

                    <div class="divider"></div>

                    <div class="stats-row">
                        <div class="stat-group">
                            <span class="stat-label">Status</span>
                            <BaseBadge variant="status" :modelValue="2" :options="PROJECT_STATUS" />
                        </div>
                        <div class="stat-group">
                            <span class="stat-label">Health</span>
                            <BaseBadge variant="health" :modelValue="1" :options="PROJECT_HEALTH" />
                        </div>
                        <div class="stat-group">
                            <span class="stat-label">Tasks</span>
                            <span class="stat-value">1 / 3</span>
                        </div>
                    </div>

                    <div class="progress-section mt-4">
                        <div class="progress-labels">
                            <span class="stat-label">Overall Progress</span>
                            <span class="highlight">33%</span>
                        </div>
                        <div class="progress-bg">
                            <div class="progress-fill" style="width: 33%"></div>
                        </div>
                    </div>
                </div>

                <div class="right-panel">
                    <h3 class="block-title">People</h3>
                    <div class="people-list">
                        <div class="person-item">
                            <div class="user-avatar">NA</div>
                            <div class="person-meta">
                                <span class="name">Nguyen Van A</span>
                                <span class="role">Creator</span>
                            </div>
                        </div>
                        <div class="person-item">
                            <div class="user-avatar bg-green">AD</div>
                            <div class="person-meta">
                                <span class="name">Admin</span>
                                <span class="role">Manager</span>
                            </div>
                        </div>
                    </div>

                    <div class="divider-dashed"></div>

                    <h3 class="block-title">Timeline</h3>
                    <div class="meta-list">
                        <div class="meta-item">
                            <span>Created:</span> <span class="val">2025-12-01</span>
                        </div>
                        <div class="meta-item">
                            <span>Start:</span> <span class="val">2025-12-05</span>
                        </div>
                        <div class="meta-item">
                            <span>Due Date:</span> <span class="val text-danger">2025-12-31</span>
                        </div>
                        <div class="meta-item">
                            <span>Updated:</span> <span class="val">Dec 15, 2024</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tasks-section mt-32">
            <div class="section-header">
                <h2 class="block-title" style="border: none; margin: 0;">Tasks in Project (3)</h2>
                <a href="#" class="view-link">View all tasks →</a>
            </div>

            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>TASK NAME</th>
                            <th>TYPE</th>
                            <th>ASSIGNEE</th>
                            <th>STATUS</th>
                            <th>DUE DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="font-medium">Design UI mockup</td>
                            <td>
                                <BaseBadge variant="type" :modelValue="1" />
                            </td>
                            <td>Nguyễn Văn A</td>
                            <td>
                                <BaseBadge variant="status" :modelValue="2" />
                            </td>
                            <td>2025-12-10</td>
                            <td>
                                <div class="action-buttons"> <button class="icon-btn edit">
                                        <Icon icon="mdi:pencil-outline" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import { Icon } from '@iconify/vue';
// IMPORT MAIN CSS ĐỂ DÙNG LẠI STYLE
import '@/assets/css/main.css';
import { PROJECT_STATUS, PROJECT_HEALTH } from '@/constants/projectEnum';
</script>

<style scoped>
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
}

.title {
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}

.header-actions {
    display: flex;
    gap: 12px;
}

.project-info-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

.card-body-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 48px;
}

.right-panel {
    border-left: 1px dashed #e2e8f0;
    padding-left: 48px;
}

.description-text {
    font-size: 14px;
    line-height: 1.6;
    color: var(--grey-color);
    margin-bottom: 16px;
}

.description-list li {
    margin-bottom: 6px;
    font-size: 14px;
    color: var(--text-color);
}

.stats-row {
    display: flex;
    gap: 40px;
    margin-bottom: 20px;
}

.stat-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.stat-label {
    font-size: 12px;
    text-transform: uppercase;
    color: var(--grey-color);
    font-weight: 600;
}

.stat-value {
    font-weight: 600;
    color: var(--text-color);
}

.progress-bg {
    height: 8px;
    background: #f1f5f9;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 8px;
}

.progress-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: 4px;
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}

.highlight {
    color: var(--primary-color);
    font-weight: 700;
}

/* People List */
.people-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
}

.person-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.person-meta {
    display: flex;
    flex-direction: column;
}

.person-meta .name {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-color);
}

.person-meta .role {
    font-size: 12px;
    color: var(--grey-color);
}

.bg-green {
    background-color: #10b981;
}

.divider {
    height: 1px;
    background: #f1f5f9;
    margin: 24px 0;
}

.divider-dashed {
    height: 1px;
    border-top: 1px dashed #e2e8f0;
    margin: 24px 0;
}

.text-danger {
    color: #ef4444;
    font-weight: 600;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.view-link {
    font-size: 14px;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
}

.mt-4 {
    margin-top: 16px;
}

/* Responsive */
@media (max-width: 900px) {
    .card-body-grid {
        grid-template-columns: 1fr;
        gap: 32px;
    }

    .right-panel {
        border-left: none;
        border-top: 1px dashed #e2e8f0;
        padding-left: 0;
        padding-top: 32px;
    }
}
</style>