"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Tasks from "./Tasks";
import API from "../api/api";

const InputField = () => {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("CA")
  );

  const addTask = async () => {
    console.log("adding tasks");
    if (taskInput.trim() !== "") {
      try {
        await API().createTodo({
          task: taskInput,
          status: "active",
          important: false,
          createdAt: currentDate,
        });
        // After adding a task, fetch the updated task list
        const updatedTasks = await API().getTodos();
        setTasks(updatedTasks);
        setTaskInput("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="lg:mx-auto lg:w-1/2 mt-8 mx-6">
      <div className="w-full bg-white dark:bg-inputs flex justify-between rounded-lg shadow-lg p-2">
        <div>
          <input
            type="text"
            className="placeholder:text-lightgrey p-4 xl:w-[410px] lg:w-[400px] md:w-[400px] w-10/12 dark:bg-inputs dark:placeholder:text-placeholder dark:text-white text-darkgrey outline-none focus:outline-none"
            placeholder="Add a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={addTask}
            className=" bg-green-800 p-4 rounded-lg shadow-lg text-white text-md flex items-center justify-center gap-2"
          >
            <span>
              <FiPlus size={18} className="-mt-0.5" />
            </span>
            Add
          </button>
        </div>
      </div>
      <Tasks setTasks={setTasks} tasks={tasks} />
    </div>
  );
};

export default InputField;
