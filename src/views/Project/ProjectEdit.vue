<template>
    <div class="webTitle">
        <span>Update Project</span>
        <small>Update project information and track progress</small>
    </div>
    <ProjectForm mode="create" @submit="handleCreate" @cancel="handleCancel" />
</template>
<script setup>
import ProjectForm from "./ProjectForm.vue";
</script>
<style scoped>
.webTitle {
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