<script setup>
const props = defineProps({
    mode: {
        type: String,
        default: 'create'
    }
});
</script>

<template>
    <div class="form-card">
        <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            <div class="form-group">
                <label class="label required">Project Name</label>
                <input type="text" class="input-control" placeholder="Ex: Design Mockup..." />
                <span class="helper-text">Enter a clear and concise name for the project</span>
            </div>
            <div class="form-group" v-if="mode === 'update'">
                <label class="label required">Status</label>
                <div class="select-wrapper">
                    <select class="input-control">
                        <option value="1">Planning</option>
                        <option value="2" selected>Working</option>
                        <option value="3">Completed</option>
                    </select>
                    <span class="select-arrow">▼</span>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="form-section">
            <h3 class="section-title">Timeline</h3>
            <div class="grid-2-col">
                <div class="form-group">
                    <label class="label">Start Date</label>
                    <input type="date" class="input-control" />
                </div>
                <div class="form-group">
                    <label class="label">End Date</label>
                    <input type="date" class="input-control" />
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="form-section">
            <h3 class="section-title">Details</h3>
            <div class="form-group">
                <label class="label">Description</label>
                <textarea class="input-control textarea" placeholder="Provide detailed information..."></textarea>
                <span class="helper-text">Include all necessary details, requirements, and context</span>
            </div>
        </div>
        <div class="form-actions" :class="mode === 'update' ? 'actions-update' : 'actions-create'">

            <button v-if="mode === 'update'" class="btn btn-danger">
                <span class="icon">🗑</span> Delete
            </button>

            <div class="right-group">
                <button class="btn btn-outline">Cancel</button>
                <button class="btn btn-primary">
                    {{ mode === 'create' ? 'Create Project' : 'Update Project' }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 900px;
    margin: 0 auto;
    padding-bottom: 50px;
    font-family: 'Inter', sans-serif;
}

.form-header {
    margin-bottom: 24px;
}

.form-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px 0;
}

.form-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
}

.form-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 18px;
    font-weight: 700;
    color: #1f2937;
}

.divider {
    height: 1px;
    background-color: #f3f4f6;
    margin: 12px 0;
}

/* --- FORM CONTROLS --- */
.form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.label {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
}

.label.required::after {
    content: " *";
    color: #ef4444;
}

/* Inputs */
.input-control {
    width: 100%;
    height: 44px;
    padding: 10px 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    background-color: #fff;
    box-sizing: border-box;
    transition: border-color 0.2s;
}

.input-control:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.input-control::placeholder {
    color: #9ca3af;
}

.textarea {
    height: 120px;
    resize: vertical;
    line-height: 1.5;
    font-family: inherit;
}

.helper-text {
    font-size: 12px;
    color: #9ca3af;
}

.grid-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
}

.select-wrapper {
    position: relative;
}

.input-control[type="date"],
select.input-control {
    appearance: none;
    -webkit-appearance: none;
}

.select-arrow {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 10px;
    color: #6b7280;
    pointer-events: none;
}

.form-actions {
    display: flex;
    align-items: center;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #f3f4f6;
}

.actions-create {
    justify-content: flex-end;
}

.actions-update {
    justify-content: space-between;
}

.right-group {
    display: flex;
    gap: 12px;
}

/* Responsive Mobile */
@media (max-width: 640px) {
    .grid-2-col {
        grid-template-columns: 1fr;
    }

    .form-actions {
        flex-direction: column-reverse;
        gap: 16px;
    }

    .right-group {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .btn-danger {
        width: 100%;
    }
}
</style>