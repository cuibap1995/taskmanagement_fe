<template>
    <div class="detail-page">
        <!-- Title Task -->
        <div class="page-header">
            <div class="page-title-content">
                <h1 class="title">{{ task.title }}</h1>
            </div>
            <div class="header-actions">
                <RouterLink :to="`/tasks/edit/${task.task_id}`">
                    <BaseButton typeButton="primary">
                        <Icon icon="mdi:pencil-outline" />Edit
                    </BaseButton>
                </RouterLink>
                <BaseButton typeButton="danger" @click="openDeleteModal">
                    <Icon icon="mdi:delete-outline" />Delete
                </BaseButton>
            </div>
        </div>
        <!--Task Detail Infomation -->
        <div class="detail-main-container">
            <div class="content-left">
                <section class="info-block">
                    <h3 class="block-title">Description</h3>
                    <div class="description-text">
                        {{ task.description ? task.description : `Don't have description for this task` }}
                    </div>
                </section>

                <section class="info-block">
                    <h3 class="block-title">Task Information</h3>
                    <div class="info-grid">
                        <div class="info-group">
                            <span class="info-label">PROJECT</span>
                            <span class="info-value bold">{{ task.project ? task.project.project_name : "" }}</span>
                        </div>
                        <div class="info-group">
                            <span class="info-label">TYPE</span>
                            <span>
                                <BaseBadge variant="type" v-model="task.type" :value="task.type"></BaseBadge>
                            </span>
                        </div>
                        <div class="info-group">
                            <span class="info-label">PRIORITY</span>
                            <span>
                                <BaseBadge variant="priority" v-model="task.priority" value="medium"></BaseBadge>
                            </span>
                        </div>
                        <div class="info-group">
                            <span class="info-label">STATUS</span>
                            <span>
                                <BaseBadge variant="status" v-model="task.status" value="working"></BaseBadge>
                            </span>
                        </div>
                    </div>
                </section>

                <section class="info-block mt-32">
                    <h3 class="block-title">Progress</h3>
                    <div class="progress-wrap">
                        <div class="progress-labels">
                            <span>OVERALL PROGRESS</span>
                            <span class="percent">{{ task.progress }}%</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" :style="{ width: task.progress + '%' }"></div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="content-right">
                <section class="info-block">
                    <h3 class="block-title">Assignee</h3>
                    <div class="user-box">
                        <div class="user-avatar">AD</div>
                        <div class="user-meta">
                            <p class="user-name">Nguyễn Văn A</p>
                            <p class="user-email">nguyenvana@email.com</p>
                        </div>
                    </div>
                </section>

                <section class="info-block mt-32">
                    <h3 class="block-title">Task Info</h3>
                    <div class="meta-list">
                        <div class="meta-item"><span>Created by</span> <span class="bold">{{ task.created_by }}</span>
                        </div>
                        <div class="meta-item"><span>Updated By</span> <span class="bold">Nguyễn Văn A</span></div>
                    </div>
                </section>

                <section class="info-block mt-32">
                    <h3 class="block-title">Timeline</h3>
                    <div class="meta-list">
                        <div class="meta-item"><span>Created at</span> <span>{{ formatDate(task.created_at) }}</span>
                        </div>
                        <div class="meta-item"><span>Expected Start</span> <span>{{
                            formatDate(task.expected_start_date) }}</span>
                        </div>
                        <div class="meta-item"><span>Due Date</span> <span class="bold">{{ formatDate(task.due_date)
                        }}</span></div>
                        <div class="meta-item"><span>Last Updated</span> <span class="italic">2 hours ago</span></div>
                    </div>
                </section>
            </div>
        </div>
        <!-- Comment Section -->
        <section class="comments-section">
            <h3 class="block-title">Comments</h3>

            <div class="comment-input-area">
                <div class="user-avatar">AD</div>
                <div class="input-box-container">
                    <div class="textarea-wrapper">
                        <textarea placeholder="Write a comment..." rows="3"></textarea>
                    </div>

                    <div class="footer-buttons">
                        <BaseButton typeButton="cancel">
                            <template #icon>
                                <Icon icon="mdi:close" />
                            </template> Cancel
                        </BaseButton>
                        <BaseButton typeButton="primary">
                            <template #icon>
                                <Icon icon="mdi:comment-plus-outline" />
                            </template> Add Comment
                        </BaseButton>
                    </div>
                </div>
            </div>

            <div class="comments-list">
                <div class="comment-item">
                    <div class="user-avatar">AD</div>
                    <div class="comment-content-wrapper">
                        <div class="comment-header">
                            <span class="user-name">Nguyễn Văn A</span>
                            <span class="comment-time">2 hours ago</span>
                        </div>
                        <div class="comment-text">
                            Finished the desktop design, currently working on mobile responsiveness.
                        </div>
                        <div class="comment-actions">
                            <button class="action-btn">Reply</button>
                            <button class="action-btn">Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Activity History -->
        <section class="activity-section">
            <h3 class="block-title">Activity History</h3>

            <div class="activity-list">
                <div class="activity-item">
                    <div class="user-avatar">NA</div>
                    <div class="activity-content">
                        <p class="activity-text">
                            <strong>Nguyễn Văn A</strong> updated <strong>progress</strong>
                            from <span class="highlight">45%</span> to <span class="highlight">65%</span>
                        </p>
                        <span class="activity-time">2 hours ago</span>
                    </div>
                </div>

                <div class="activity-item">
                    <div class="user-avatar">AD</div>
                    <div class="activity-content">
                        <p class="activity-text">
                            <strong>Admin</strong> changed <strong>status</strong>
                            from <span class="highlight">Open</span> to <span class="highlight">Working</span>
                        </p>
                        <span class="activity-time">2 hours ago</span>
                    </div>
                </div>

                <div class="activity-item">
                    <div class="user-avatar">AD</div>
                    <div class="activity-content">
                        <p class="activity-text">
                            <strong>Admin</strong> assigned task to <strong>Nguyễn Văn A</strong>
                        </p>
                        <span class="activity-time">2 hours ago</span>
                    </div>
                </div>

                <div class="activity-item">
                    <div class="user-avatar">AD</div>
                    <div class="activity-content">
                        <p class="activity-text">
                            <strong>Admin</strong> commented on this task
                        </p>
                        <span class="activity-time">2 hours ago</span>
                    </div>
                </div>
            </div>
            <BaseToast v-if="isToastDisplay" :toast-type="toastType" :toast-title="toastTitle"
                :toast-message="toastMessage" @close="closeToast" :class="{ 'card--leaving': isLeaving }">
            </BaseToast>
            <BaseConfirmModal v-if="showDeleteModal" mode="delete"
                message="Are you sure you want to delete this task? This action is permanent and cannot be undone."
                cancelText="Cancel" confirmText="Confirm" title="Delete this task?" @cancel="cancelDelete"
                @confirm="confirmDelete">
            </BaseConfirmModal>
        </section>
    </div>
</template>
<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import { Icon } from '@iconify/vue';
import '@/assets/css/main.css';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTaskById } from '@/services/taskService';
import { deleteTask } from '@/services/taskService';
import BaseToast from '@/components/ui/BaseToast.vue';
import { formatDate } from '@/assets/js/dateFormat';
import BaseConfirmModal from '@/components/ui/BaseConfirmModal.vue';

const route = useRoute();
const router = useRouter();
const taskId = route.params.id;
const task = ref({});
const isloading = ref(true);
const toastType = ref('success');
const toastTitle = ref('');
const isToastDisplay = ref(false);
const isLeaving = ref(false);
const toastMessage = ref('');
const showDeleteModal = ref(false);
const deletingTaskId = ref();
const isDeleteLoading = ref(false);

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
const cancelDelete = () => {
    showDeleteModal.value = false;
    deletingTaskId.value = null;
}
const openDeleteModal = () => {
    showDeleteModal.value = true;
    deletingTaskId.value = taskId;
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
const fetchDetail = async () => {
    try {
        const res = await getTaskById(taskId);
        task.value = res.data;
    } catch (e) {
        console.log(e);
    } finally {
        isloading.value = false;

    }
}
onMounted(() => {
    try {
        fetchDetail();

    } catch (e) {
        console.log(e);
        handleToast('error', 'error', 'Fail to load task');
    }
})
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
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    color: var(--text-color);
}

.header-actions {
    display: flex;
    gap: 12px;
}

/* Grid Layout */
.detail-main-container {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 40px;
    background-color: var(--white-color);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.block-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px 0;
    padding-top: 24px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
}

.description-text {
    line-height: 1.6;
    color: var(--grey-color);
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.info-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.info-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--grey-color);
}

.progress-wrap {
    width: 100%;
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 14px;
    color: var(--grey-color);
}

.progress-bar-bg {
    height: 10px;
    background: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: var(--primary-color);
}

.user-box {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-avatar {
    width: 44px;
    height: 44px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
}

.user-email {
    margin: 0;
    font-size: 12px;
    color: var(--grey-color);
}

.meta-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.meta-item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--grey-color);
}

.comments-section,
.activity-section {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    margin-top: 48px;
}

.comment-input-area {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
}

.input-box-container {
    width: 100%;
}

.textarea-wrapper {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: #fff;
    overflow: hidden;
    margin-bottom: 16px;
}

.textarea-wrapper textarea {
    width: 100%;
    padding: 16px;
    border: none;
    outline: none;
    resize: none;
    font-family: inherit;
    font-size: 14px;
    display: block;
    color: var(--text-color);
    box-sizing: border-box;
}

.footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.comment-item {
    display: flex;
    gap: 16px;
    margin-top: 20px;
}

.comment-content-wrapper {
    flex: 1;
    background-color: #f1f3f4;
    padding: 16px;
    border-radius: 10px;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
}

.user-name {
    font-weight: 700;
    color: var(--text-color);
    margin: 0;
}

.comment-time {
    font-size: 12px;
    color: var(--grey-color);
}

.comment-actions {
    margin-top: 10px;
    display: flex;
    gap: 15px;
}

.action-btn {
    background: none;
    border: none;
    font-size: 12px;
    color: var(--grey-color);
    cursor: pointer;
    font-weight: 600;
}

.activity-list {
    display: flex;
    flex-direction: column;
}

.activity-item {
    display: flex;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
    border-bottom: none;
}

.activity-content {
    flex: 1;
}

.activity-text {
    margin: 0;
    font-size: 14px;
    color: var(--text-color);
    line-height: 1.5;
}

.activity-time {
    font-size: 12px;
    color: var(--grey-color);
    margin-top: 4px;
    display: block;
}

.highlight {
    color: var(--primary-color);
    font-weight: 600;
}
</style>