"use client";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Tasks from "./Tasks";
import API from "../api/api";

const InputField = () => {
  const [taskInput, setTaskInput] = useState("");

  const addTask = async () => {
    console.log("adding tasks");
    if (taskInput.trim() !== "") {
      try {
        await API().createTodo({
          task: taskInput,
          priority: "Medium", // You can set a default priority or fetch it from a dropdown
          completed: false,
        });

        // After adding a task, you may want to update the task list
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
    </div>
  );
};

export default InputField;
