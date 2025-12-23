import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setFilter as setTaskFilter,
} from "../store/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, loading, filter } = useSelector((state) => state.tasks);

  useEffect(() => {
    const status = filter === "all" ? null : filter;
    dispatch(fetchTasks(status));
  }, [filter, dispatch]);

  const handleCreateTask = async (taskData) => {
    const result = await dispatch(createTask(taskData));
    if (result.type === "tasks/createTask/fulfilled") {
      setShowForm(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    const result = await dispatch(
      updateTask({ id: editingTask._id, taskData })
    );
    if (result.type === "tasks/updateTask/fulfilled") {
      setEditingTask(null);
      setShowForm(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    dispatch(deleteTask(taskId));
  };

  const handleCompleteTask = async (task) => {
    if (task.status === "completed") return;

    const result = await dispatch(
      updateTask({
        id: task._id,
        taskData: {
          ...task,
          status: "completed",
        },
      })
    );

    if (result.type === "tasks/updateTask/fulfilled") {
      // Task completed successfully
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setTaskFilter(newFilter));
  };

  const getStatusCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter((t) => t.status === "pending").length,
      "in-progress": tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Task Manager
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Welcome, {user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              All Tasks
            </h3>
            <p className="text-2xl font-semibold text-gray-900 mt-2">
              {statusCounts.all}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Pending
            </h3>
            <p className="text-2xl font-semibold text-amber-600 mt-2">
              {statusCounts.pending}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              In Progress
            </h3>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              {statusCounts["in-progress"]}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Completed
            </h3>
            <p className="text-2xl font-semibold text-emerald-600 mt-2">
              {statusCounts.completed}
            </p>
          </div>
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterChange(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  filter === status
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status.replace("-", " ")}
              </button>
            ))}
          </div>

          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Task
            </button>
          )}
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-6">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-gray-300 border-r-transparent"></div>
            <p className="text-gray-500 text-sm mt-3">Loading...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
