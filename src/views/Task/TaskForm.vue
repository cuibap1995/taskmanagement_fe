<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import { Icon } from "@iconify/vue";
import { reactive } from "vue";
const prop = defineProps({
    mode: {
        type: String,
        default: "create", //create/update
    },
    data: {
        type: Object,
        default: () => ({}),
    },
});
const emit = defineEmits(['submit','cancel','delete']);
const form = reactive({
    title:'',
    type:'Task',
    priority:'Medium',
    project:'',
    assignee:'',
    progress:0,
    Expected_start_date:'',
    Expected_end_date:'',
    description:'',
    status:''
});
const handleSubmit = ()=>{
    emit('submit',{...form});
}
</script>
<template>
    <form class="task_form" @submit.prevent="handleSubmit">
        <section class="card">
            <h3 class="card_title">Basic Information</h3>
            <div class="grid">
                <div class="field full">
                    <label for="title_input">Title <span style="color: red">*</span></label>
                    <input type="text" placeholder="Ex: Design Mockup..." id="title_input" required v-model="form.title"/>
                    <small>Enter a clear and concise title for the task</small>
                </div>
                <div class="field">
                    <label for="type">Type <span style="color: red">*</span></label>
                    <select name="type" id="type" v-model="form.type" required>
                        <option value="task" selected>Task</option>
                        <option value="fix">Fix</option>
                    </select>
                </div>
                <div class="field">
                    <label for="priority">Priority <span style="color: red">*</span></label>
                    <select name="priority" v-model="form.priority" required id="priority">
                        <option value="high">High</option>
                        <option value="medium" selected>Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div class="field">
                    <label for="project">Project <span style="color: red">*</span></label>
                    <select name="project" id="project" v-model="form.project" required>
                        <option value="" disabled selected>Select a Project</option>
                        <option value="1">Project 1</option>
                    </select>
                </div>
                <div class="field">
                    <label for="assignee">Assignee</label>
                    <select name="assignee" v-model="form.assignee" id="assignee">
                        <option value="" disabled selected>Not assigneed</option>
                    </select>
                </div>
                <div class="field" v-if="prop.mode === 'update'">
                    <label for="status">Status <span style="color: red">*</span></label>
                    <select name="status" id="status" v-model.number="form.status" required>
                        <option value="working">Working</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="open" selected>Open</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div class="field" v-if="prop.mode === 'update'">
                    <label for="progress">Progress</label>
                    <input type="number" name="progress" v-model="form.progress" min="0" max="100" />
                </div>
            </div>
            <div class="line"></div>
            <h3 class="card_title">Timelines</h3>
            <div class="grid">
                <div class="field">
                    <label for="eStartDate">Expected Start Date</label>
                    <input type="date" id="eStartDate" v-model="form.Expected_start_date" name="eStartDate"/>
                </div>
                <div class="field">
                    <label for="eEndDate">Expected End Date</label>
                    <input type="date" id="eEndDate" v-model="form.Expected_end_date" name="eEndDate" />
                </div>
            </div>
            <div class="line"></div>
            <h3 class="card_title">Details</h3>
            <div class="grid">
                <div class="field full">
                    <label for="description">Description</label>
                    <textarea name="description" v-model="form.description" id="description"></textarea>
                    <small>Include all necessary details, requirements, and context</small>
                </div>
            </div>
            <div class="flex-btn" v-if="prop.mode === 'create'">
                <BaseButton type-button="cancel" @click="emit('cancel')" >
                    <Icon icon="charm:cross" />Cancel
                </BaseButton>
                <BaseButton type-button="primary">
                    <Icon icon="charm:tick" />Create Task
                </BaseButton>
            </div>
            <div class="flex-btn-btn" v-if="prop.mode === 'update'">
                <div class="deleteBtn">
                    <BaseButton type-button="danger" @click="emit('delete')">
                        <Icon icon="gravity-ui:trash-bin" />Delete
                    </BaseButton>
                </div>
                <div class="flex-btn">
                    <BaseButton type-button="cancel" @click="emit('cancel')">
                        <Icon icon="charm:cross" />
                        Cancel
                    </BaseButton>
                    <BaseButton type-button="primary">
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
</style>
