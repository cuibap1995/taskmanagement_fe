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

  const typeList = ["bug", "feature", "task", "enhancement"];
  if (!form.type) {
    return { valid: false, field: "type", message: "Type is required" };
  }
  if (!typeList.includes(form.type)) {
    return { valid: false, field: "type", message: "Invalid type" };
  }

  const priorityList = ["low", "medium", "high"];
  if (!form.priority) {
    return { valid: false, field: "priority", message: "Priority is required" };
  }
  if (!priorityList.includes(form.priority)) {
    return {
      valid: false,
      field: "priority",
      message: "Invalid priority",
    };
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
    const statusList = ["open", "working", "pending review", "completed"];
    if (!form.status) {
      return { valid: false, field: "status", message: "Status is required" };
    }
    if (!statusList.includes(form.status)) {
      return { valid: false, field: "status", message: "Invalid status" };
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
