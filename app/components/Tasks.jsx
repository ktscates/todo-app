import React, { useState, useEffect } from "react";
import NoTask from "./NoTask";
import { CiTrash } from "react-icons/ci";
import { MdEdit, MdOutlineSaveAlt } from "react-icons/md";
import API from "../api/api";

const Tasks = ({ setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    // Fetch tasks when the component mounts or when tasks prop changes
    const fetchTasks = async () => {
      try {
        const result = await API().getTodos();
        setTasks(result);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

  // Function to handle task editing
  const handleEdit = (taskId, currentTask) => {
    setIsEditing(taskId);
    setUpdatedTask(currentTask);
  };

  // Function to handle updating the task
  const handleUpdateTask = async (taskId) => {
    try {
      await API().updateTodo(taskId, { task: updatedTask });
      // After updating a task, fetch the updated task list
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleImportance = async (taskId, isImportant) => {
    try {
      await API().updateTodo(taskId, { important: !isImportant });
      // After updating to important, fetch the updated task list
      const updatedTasks = await API().getTodos();

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling importance:", error);
    }
  };

  const toggleCompletion = async (taskId, isCompleted) => {
    try {
      await API().updateTodo(taskId, {
        status: isCompleted ? "active" : "completed",
      });
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API().deleteTodo(taskId);
      // After deleting a task, fetch the updated task list
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to clear all tasks
  const clearAllTasks = async () => {
    try {
      await API().clearAllTodos();

      // After clearing tasks, fetch the updated task list
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Active") return task.status !== "completed";
    if (selectedFilter === "Completed") return task.status === "completed";
    return true;
  });

  // Sort the filtered tasks
  const sortedTasks = filteredTasks.slice().sort((a, b) => {
    // Sort by completion status
    if (a.status === "completed" && b.status !== "completed") return 1;
    if (a.status !== "completed" && b.status === "completed") return -1;

    // Sort by importance
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;

    // if both tasks are completed and important, sort by id
    if (
      a.status === "completed" &&
      b.status === "completed" &&
      b.important &&
      a.important
    ) {
      return b.id - a.id;
    }

    // Sort by ID for other cases
    return a.id - b.id;
  });

  return (
    <div className="relative mt-12 bg-white dark:bg-inputs h-[600px] rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-darkgrey dark:text-white text-center pt-4">
        Todo Lists
      </h1>
      <ul className="overflow-y-auto lg:max-h-[500px] max-h-[450px] dark:overflow-y-auto">
        {sortedTasks && sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between px-8 py-2 mt-6 border-b-2 border-border dark:border-darkgrey items-center ${
                task.status === "completed" ? "line-through" : ""
              }`}
            >
              <div className="flex justify-between gap-2 items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() =>
                    toggleCompletion(task.id, task.status === "completed")
                  }
                />
                {isEditing === task.id ? (
                  <input
                    className="placeholder:text-inputs bg-gray-200 p-2 dark:bg-lightgrey rounded-md dark:placeholder:text-placeholder dark:text-inputs text-inputs outline-none focus:outline-none"
                    type="text"
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                  />
                ) : (
                  <h6
                    onClick={() => toggleImportance(task.id, task.important)}
                    className={`cursor-pointer text-lg ${
                      task.important && task.status !== "completed"
                        ? "text-orange dark:text-yellow-500"
                        : task.status === "completed"
                        ? "text-placeholder cursor-not-allowed"
                        : "text-darkgrey dark:text-white"
                    }`}
                  >
                    {task.task}
                  </h6>
                )}
              </div>
              <div className="flex justify-between items-center gap-4">
                {isEditing === task.id ? (
                  <MdOutlineSaveAlt
                    className="cursor-pointer"
                    onClick={() => handleUpdateTask(task.id)}
                    size={20}
                    color="green"
                  />
                ) : (
                  <MdEdit
                    className={`cursor-pointer ${
                      task.status === "completed"
                        ? "cursor-none"
                        : "cursor-pointer "
                    }`}
                    onClick={() => handleEdit(task.id, task.task)}
                    size={20}
                    color="blue"
                  />
                )}
                {task.status === "completed" ? (
                  <CiTrash size={20} color="red" />
                ) : (
                  <CiTrash
                    className="cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                    size={20}
                    color="red"
                  />
                )}
              </div>
            </li>
          ))
        ) : (
          <NoTask />
        )}
      </ul>
      <div className="absolute bottom-0 w-full flex lg:flex-row md:flex-row flex-col justify-between items-center p-4 text-actions dark:text-actionsD">
        <h6>
          {tasks.filter((task) => task.status !== "completed").length} items
          left
        </h6>
        <div className="flex justify-center items-center gap-4">
          {["All", "Active", "Completed"].map((state) => (
            <button
              key={state}
              onClick={() => setSelectedFilter(state)}
              className={` ${selectedFilter === state ? "text-blue" : ""}`}
            >
              {state}
            </button>
          ))}
        </div>
        <button onClick={() => clearAllTasks()}>Clear All Tasks</button>
      </div>
    </div>
  );
};

export default Tasks;
