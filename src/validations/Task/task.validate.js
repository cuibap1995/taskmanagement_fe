import { TASK_TYPE, TASK_PRIORITY, TASK_STATUS } from "@/constants/taskEnum";
import { normalizeDate } from "../../assets/js/dateFormat";

const today = normalizeDate(new Date());
const currentYear = today.getFullYear();

const isYearValid = (date) => {
  const year = date.getFullYear();
  return year === currentYear || year === currentYear + 1;
};

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

  // ---------- TYPE ----------
  if (!form.type) {
    return { valid: false, field: "type", message: "Type is required" };
  }
  const validTypes = Object.values(TASK_TYPE).map((i) => i.id);
  if (!validTypes.includes(Number(form.type))) {
    return { valid: false, field: "type", message: "Invalid type selected" };
  }

  // ---------- PRIORITY ----------
  if (!form.priority) {
    return { valid: false, field: "priority", message: "Priority is required" };
  }
  const validPriorities = Object.values(TASK_PRIORITY).map((i) => i.id);
  if (!validPriorities.includes(Number(form.priority))) {
    return {
      valid: false,
      field: "priority",
      message: "Invalid priority selected",
    };
  }

  // ---------- PROJECT ----------
  if (!form.project_id) {
    return {
      valid: false,
      field: "project_id",
      message: "Project is required",
    };
  }

  // ---------- EXPECTED START DATE ----------
  if (form.expected_start_date) {
    if (isNaN(Date.parse(form.expected_start_date))) {
      return {
        valid: false,
        field: "expected_start_date",
        message: "Invalid start date",
      };
    }

    const startDate = normalizeDate(form.expected_start_date);

    if (startDate < today) {
      return {
        valid: false,
        field: "expected_start_date",
        message: "Start date must be today or in the future",
      };
    }

    if (!isYearValid(startDate)) {
      return {
        valid: false,
        field: "expected_start_date",
        message: "Start date must be within this year or next year",
      };
    }
  }

  // ---------- EXPECTED END DATE ----------
  if (form.expected_end_date) {
    if (isNaN(Date.parse(form.expected_end_date))) {
      return {
        valid: false,
        field: "expected_end_date",
        message: "Invalid end date",
      };
    }

    const endDate = normalizeDate(form.expected_end_date);

    if (endDate <= today) {
      return {
        valid: false,
        field: "expected_end_date",
        message: "End date must be after today",
      };
    }

    if (form.expected_start_date) {
      const startDate = normalizeDate(form.expected_start_date);
      if (endDate <= startDate) {
        return {
          valid: false,
          field: "expected_end_date",
          message: "End date must be after start date",
        };
      }
    }

    if (!isYearValid(endDate)) {
      return {
        valid: false,
        field: "expected_end_date",
        message: "End date must be within this year or next year",
      };
    }
  }

  // ---------- DUE DATE ----------
  if (!form.due_date) {
    return { valid: false, field: "due_date", message: "Due date is required" };
  }

  if (isNaN(Date.parse(form.due_date))) {
    return { valid: false, field: "due_date", message: "Invalid due date" };
  }

  const dueDate = normalizeDate(form.due_date);

  if (dueDate <= today) {
    return {
      valid: false,
      field: "due_date",
      message: "Due date must be after today",
    };
  }

  if (form.expected_start_date) {
    const startDate = normalizeDate(form.expected_start_date);
    if (dueDate <= startDate) {
      return {
        valid: false,
        field: "due_date",
        message: "Due date must be after expected start date",
      };
    }
  }

  if (!isYearValid(dueDate)) {
    return {
      valid: false,
      field: "due_date",
      message: "Due date must be within this year or next year",
    };
  }

  // ---------- CREATED BY ----------
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

  // ---------- UPDATE MODE ----------
  if (mode === "update") {
    if (!form.status) {
      return { valid: false, field: "status", message: "Status is required" };
    }
    const validStatuses = Object.values(TASK_STATUS).map((i) => i.id);
    if (!validStatuses.includes(Number(form.status))) {
      return {
        valid: false,
        field: "status",
        message: "Invalid status selected",
      };
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
