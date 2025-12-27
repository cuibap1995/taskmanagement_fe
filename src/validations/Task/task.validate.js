import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from '@/constants/taskEnum';

export const validateTask = (form, mode = "create") => {
  if (!form.title || !form.title.trim()) {
    return { valid: false, field: "title", message: "Title is required" };
  }
  if (form.title.length < 3) {
    return {
      valid: false,
      field: "title",
      message: "Title must be at least 3 characters",
    };
  }

  if (form.description && form.description.length > 255) {
    return {
      valid: false,
      field: "description",
      message: "Description must be less than 255 characters",
    };
  }

  if (!form.type) {
    return { valid: false, field: "type", message: "Type is required" };
  }
  const validTypes = Object.values(TASK_TYPE).map(item => item.id);
  if (!validTypes.includes(Number(form.type))) {
    return { valid: false, field: "type", message: "Invalid type selected" };
  }

  if (!form.priority) {
    return { valid: false, field: "priority", message: "Priority is required" };
  }
  const validPriorities = Object.values(TASK_PRIORITY).map(item => item.id);
  if (!validPriorities.includes(Number(form.priority))) {
    return { valid: false, field: "priority", message: "Invalid priority selected" };
  }
  if (!form.project_id) {
    return {
      valid: false,
      field: "project_id",
      message: "Project is required",
    };
  }
  if (form.expected_start_date && isNaN(Date.parse(form.expected_start_date))) {
    return {
      valid: false,
      field: "expected_start_date",
      message: "Invalid start date",
    };
  }

  if (form.expected_end_date) {
    if (isNaN(Date.parse(form.expected_end_date))) {
      return {
        valid: false,
        field: "expected_end_date",
        message: "Invalid end date",
      };
    }
    if (
      form.expected_start_date &&
      new Date(form.expected_end_date) < new Date(form.expected_start_date)
    ) {
      return {
        valid: false,
        field: "expected_end_date",
        message: "End date must be after start date",
      };
    }
  }

  if (!form.due_date) {
    return { valid: false, field: "due_date", message: "Due date is required" };
  }
  if (isNaN(Date.parse(form.due_date))) {
    return {
      valid: false,
      field: "due_date",
      message: "Invalid due date",
    };
  }

  if (!form.created_by) {
    return {
      valid: false,
      field: "created_by",
      message: "Created by is required",
    };
  }
  if (!Number.isInteger(form.created_by)) {
    return {
      valid: false,
      field: "created_by",
      message: "Created by must be an integer",
    };
  }

  if (mode === "update") {
    // status
    if (!form.status) {
      return { valid: false, field: "status", message: "Status is required" };
    }
    const validStatuses = Object.values(TASK_STATUS).map(item => item.id);
    if (!validStatuses.includes(Number(form.status))) {
      return { valid: false, field: "status", message: "Invalid status selected" };
    }

    if (form.progress === null || form.progress === undefined) {
      return {
        valid: false,
        field: "progress",
        message: "Progress is required",
      };
    }
    if (!Number.isInteger(form.progress)) {
      return {
        valid: false,
        field: "progress",
        message: "Progress must be an integer",
      };
    }
    if (form.progress < 0 || form.progress > 100) {
      return {
        valid: false,
        field: "progress",
        message: "Progress must be between 0 and 100",
      };
    }
  }

  return { valid: true };
};
