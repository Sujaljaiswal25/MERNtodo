import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { taskAPI } from "../api";
import { toast } from "react-toastify";

// Async thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (status = null, { rejectWithValue }) => {
    try {
      const response = await taskAPI.getTasks(status);
      if (response.data.success) {
        return response.data.tasks;
      }
    } catch (error) {
      const message = error.response?.data?.error || "Failed to fetch tasks";
      return rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await taskAPI.createTask(taskData);
      if (response.data.success) {
        toast.success("Task created successfully!");
        return response.data.task;
      }
    } catch (error) {
      const message = error.response?.data?.error || "Failed to create task";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, taskData }, { rejectWithValue }) => {
    try {
      const response = await taskAPI.updateTask(id, taskData);
      if (response.data.success) {
        toast.success("Task updated successfully!");
        return response.data.task;
      }
    } catch (error) {
      const message = error.response?.data?.error || "Failed to update task";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await taskAPI.deleteTask(taskId);
      if (response.data.success) {
        toast.success("Task deleted successfully!");
        return taskId;
      }
    } catch (error) {
      const message = error.response?.data?.error || "Failed to delete task";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
};

// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter, clearError } = taskSlice.actions;
export default taskSlice.reducer;
