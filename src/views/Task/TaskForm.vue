<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import { Icon } from "@iconify/vue";
import { reactive, watch, ref, onMounted } from "vue";
import { validateTask } from "@/validations/Task/task.validate";
import { maxDate, minDate } from '@/constants/date.const';
import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from '@/constants/taskEnum';
import { scrollToError } from '@/assets/js/errFocus';
const prop = defineProps({
    mode: {
        type: String,
        default: "create", //create/update
    },
    data: {
        type: Object,
        default: () => ({}),
    },
    dataProject: {
        type: Array,
        default: () => ([])
    },
});
const err = ref({});
const emit = defineEmits(['submit', 'cancel', 'delete']);
const form = reactive({
    title: '',
    description: '',
    status: 1,
    priority: 2,
    type: 1,
    progress: 0,
    expected_start_date: null,
    expected_end_date: null,
    due_date: null,
    project_id: prop.data.project_id || null,
    assignee_id: null,
    created_by: 1,
    updated_by: 1
});
const handleSubmit = () => {
    const result = validateTask(form, prop.mode);
    if (!result.valid) {
        err.value.field = result.field;
        err.value.message = result.message;
        scrollToError(err.value);
        return;
    }
    try {
        err.value = {};
        emit('submit', { ...form });
    } catch (e) {
        console.log(e);
    }

}
const resetForm = () => {
    Object.keys(form).forEach(key => {
        if (key !== 'status' && key !== 'progress' && key !== 'created_by') {
            form[key] = '';
        }
    })
}
defineExpose({ resetForm });
watch(() => [prop.data, prop.mode], ([data, mode]) => {
    if (mode === 'update' && data && Object.keys(data).length) {
        form.title = data.title ?? '';
        form.description = data.description ?? '';
        form.assignee_id = data.assignee_id ?? 1;
        form.created_by = data.created_by ?? 1;
        form.due_date = data.due_date ?? null;
        form.priority = data.priority ?? 2;
        form.expected_end_date = data.expected_end_date ?? null;
        form.expected_start_date = data.expected_start_date ?? null;
        form.progress = data.progress ?? 0;
        form.status = data.status ?? 1;
        form.project_id = Number(data.project.project_id) || null;
        form.type = data.type ?? 1;
    }
    if (mode === 'create') {
        resetForm();
    }
}, { immediate: true });
</script>
<template>
    <form class="task_form" @submit.prevent="handleSubmit">
        <section class="card">
            <h3 class="card_title">Basic Information</h3>
            <div class="grid">
                <div class="field full" :class="{ error: err.field === 'title' }">
                    <label for="title_input">Title <span style="color: red">*</span></label>
                    <input type="text" placeholder="Ex: Design Mockup..." id="title_input" v-model="form.title"
                        name="title" />
                    <small v-if="err.field === 'title'" class="error-text">
                        {{ err.message }}
                    </small>
                    <small v-else>Enter a clear and concise title for the task</small>
                </div>
                <div class="field" :class="{ error: err.field === 'type' }">
                    <label for="type">Type <span style="color: red">*</span></label>
                    <select name="type" id="type" v-model="form.type">
                        <option v-for="item in TASK_TYPE" :key="item.id" :value="item.id">
                            {{ item.label }}
                        </option>
                    </select>
                    <small v-if="err.field === 'type'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field" :class="{ error: err.field === 'priority' }">
                    <label for="priority">Priority <span style="color: red">*</span></label>
                    <select name="priority" v-model="form.priority" id="priority">
                        <option v-for="item in TASK_PRIORITY" :key="item.id" :value="item.id">
                            {{ item.label }}
                        </option>
                    </select>
                    <small v-if="err.field === 'priority'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field" :class="{ error: err.field === 'project_id' }">
                    <label for="project">Project <span style="color: red">*</span></label>
                    <select name="project_id" id="project" v-model="form.project_id" v-if="prop.dataProject.length">
                        <option value="" disabled>Select a Project</option>
                        <option v-for="prj in prop.dataProject" :key="prj.project_id" :value="Number(prj.project_id)">{{
                            prj.project_name }}</option>
                    </select>
                    <small v-if="err.field === 'project_id'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field">
                    <label for="assignee">Assignee</label>
                    <select name="assignee_id" v-model="form.assignee_id" id="assignee">
                        <option value="" disabled selected>Not assigneed</option>
                    </select>
                </div>
                <div class="field" v-if="prop.mode === 'update'" :class="{ error: err.field === 'status' }">
                    <label for="status">Status <span style="color: red">*</span></label>
                    <select name="status" id="status" v-model="form.status">
                        <option v-for="item in TASK_STATUS" :key="item.id" :value="item.id">
                            {{ item.label }}
                        </option>
                    </select>
                    <small v-if="err.field === 'status'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field" v-if="prop.mode === 'update'" :class="{ error: err.field === 'progress' }">
                    <label for="progress">Progress</label>
                    <input type="number" name="progress" v-model="form.progress" />
                    <small v-if="err.field === 'progress'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
            </div>
            <div class="line"></div>
            <h3 class="card_title">Timelines</h3>
            <div class="grid">
                <div class="field full" :class="{ error: err.field === 'due_date' }">
                    <label for="due">Due Date <span style="color: red;">*</span></label>
                    <input type="date" id="due" name="due_date" v-model="form.due_date" :min="minDate" :max="maxDate">
                    <small v-if="err.field === 'due_date'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field" :class="{ error: err.field === 'expected_start_date' }">
                    <label for="eStartDate">Expected Start Date</label>
                    <input type="date" id="expected_start_date" v-model="form.expected_start_date" name="eStartDate"
                        :min="minDate" :max="maxDate" />
                    <small v-if="err.field === 'expected_start_date'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
                <div class="field" :class="{ error: err.field === 'expected_end_date' }">
                    <label for="eEndDate">Expected End Date</label>
                    <input type="date" id="expected_end_date" v-model="form.expected_end_date" name="eEndDate"
                        :min="minDate" :max="maxDate" />
                    <small v-if="err.field === 'expected_end_date'" class="error-text">
                        {{ err.message }}
                    </small>
                </div>
            </div>
            <div class="line"></div>
            <h3 class="card_title">Details</h3>
            <div class="grid">
                <div class="field full" :class="{ error: err.field === 'description' }">
                    <label for="description">Description</label>
                    <textarea name="description" v-model="form.description" id="description"></textarea>
                    <small v-if="err.field === 'description'" class="error-text">
                        {{ err.message }}
                    </small>
                    <small v-else>Include all necessary details, requirements, and context</small>

                </div>
            </div>
            <div class="flex-btn" v-if="prop.mode === 'create'">
                <BaseButton type-button="cancel" @click="emit('cancel')">
                    <Icon icon="charm:cross" />Cancel
                </BaseButton>
                <BaseButton type-button="primary" type="submit">
                    <Icon icon="charm:tick" />Create Task
                </BaseButton>
            </div>
            <div class="flex-btn-btn" v-if="prop.mode === 'update'">
                <div class="deleteBtn">
                    <BaseButton type-button="danger" @click.prevent="emit('delete')">
                        <Icon icon="gravity-ui:trash-bin" />Delete
                    </BaseButton>
                </div>
                <div class="flex-btn">
                    <BaseButton type-button="cancel" @click="emit('cancel')">
                        <Icon icon="charm:cross" />
                        Cancel
                    </BaseButton>
                    <BaseButton type-button="primary" type="submit">
                        <Icon icon="charm:tick" />Update
                    </BaseButton>
                </div>
            </div>
        </section>
    </form>
</template>
<style>
.task_form {
    max-width: 2100px;
    margin: 0 auto;
}

.card {
    font-size: 22px;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 24px;
}

.card small {
    font-size: 12px;
    display: block;
    color: grey;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

label {
    font-weight: 600;
    font-size: 14px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.full {
    grid-column: 1/-1;
}

input,
select,
textarea {
    height: 44px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: #10b981;
}

.line {
    border: 1px solid #e4e4e4;
    margin: 24px 0;
}

textarea {
    min-height: 140px;
    padding: 12px;
    resize: none;
    line-height: 1.5;
}

.flex-btn {
    display: flex;
    margin-top: 20px;
    justify-content: end;
    align-items: center;
}

.flex-btn button {
    font-size: 16px;
    font-weight: 300;
}

.flex-btn-btn {
    display: flex;
    justify-content: space-between;
}

.deleteBtn {
    margin-top: 20px;
    align-items: center;
}

.deleteBtn button {
    font-size: 16px;
    font-weight: 300;
}

.field.error input,
.field.error select,
.field.error textarea {
    border-color: #ef4444;
    background-color: #fff5f5;
}


.field.error input:focus,
.field.error select:focus,
.field.error textarea:focus {
    border-color: #ef4444;
    outline: none;
}


.card small.error-text {
    color: #ef4444;
}
</style>
