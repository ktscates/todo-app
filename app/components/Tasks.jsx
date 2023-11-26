import React, { useState, useEffect } from "react";
import NoTask from "./NoTask";
import { CiTrash } from "react-icons/ci";
import { MdEdit, MdOutlineSaveAlt } from "react-icons/md";
import API from "../api/api";

const Tasks = ({ setTasks, tasks }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");

  useEffect(() => {
    // Fetch tasks from localStorage when the component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Function to save tasks to localStorage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

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
      saveTasksToLocalStorage(updatedTasks); // Save tasks to localStorage
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle toggling importance
  const toggleImportance = async (taskId, isImportant) => {
    try {
      await API().updateTodo(taskId, { important: !isImportant });
      // After toggling importance, fetch the updated task list
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks); // Save tasks to localStorage
    } catch (error) {
      console.error("Error toggling importance:", error);
    }
  };

  // Function to handle deleting a task
  const deleteTask = async (taskId) => {
    try {
      await API().deleteTodo(taskId);
      // After deleting a task, fetch the updated task list
      const updatedTasks = await API().getTodos();
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks); // Save tasks to localStorage
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  console.log("taski", tasks);
  const actionStates = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Completed", label: "Completed" },
  ];

  return (
    <div className="relative mt-12 bg-white dark:bg-inputs h-[600px] rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-darkgrey dark:text-white text-center pt-4">
        Todo Lists
      </h1>
      <ul className="overflow-y-auto lg:max-h-[500px] max-h-[450px] dark:overflow-y-auto">
        {tasks && tasks.length > 0 ? (
          tasks
            .slice()
            .sort((a, b) => (a.important && !b.important ? -1 : 1))
            // .reverse()
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between px-8 py-2 mt-6 border-b-2 border-border dark:border-darkgrey items-center"
              >
                <div>
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
                      className={`cursor-pointer ${
                        task.important
                          ? "text-yellow-500"
                          : "text-darkgrey dark:text-white "
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
                      className="cursor-pointer"
                      onClick={() => handleEdit(task.id, task.task)}
                      size={20}
                      color="blue"
                    />
                  )}
                  <CiTrash
                    className="cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                    size={20}
                    color="red"
                  />
                </div>
              </li>
            ))
        ) : (
          <NoTask />
        )}
      </ul>
      <div className="absolute bottom-0 w-full flex lg:flex-row md:flex-row flex-col justify-between items-center p-4 text-actions dark:text-actionsD">
        <h6>{tasks.length} items left</h6>
        <div className="flex justify-center items-center gap-4">
          {actionStates.map((state) => (
            <button key={state.value}>{state.label}</button>
          ))}
        </div>
        <button>Clear Completed</button>
      </div>
    </div>
  );
};

export default Tasks;
