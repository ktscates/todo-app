import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import API from "../api/api";
import NoTask from "./NoTask";

const Tasks = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const result = await API().getTodos();
      console.log("API Response:", result);
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log("tasks", tasks);

  const priorities = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const actionStates = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Completed", label: "Completed" },
  ];

  //Change the task priority
  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);
    setShowDropdown(false); // Close the dropdown after selecting a priority
  };

  return (
    <div className="relative lg:mx-auto lg:w-1/2 mx-6 mt-12 bg-white dark:bg-inputs h-[600px] rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-darkgrey dark:text-white text-center pt-4">
        Todo Lists
      </h1>
      <ul className="overflow-y-auto lg:max-h-[500px] max-h-[450px] dark:overflow-y-auto">
        {tasks.length > 0 ? (
          tasks
            .slice()
            .reverse()
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between px-8 py-2 mt-6 border-b-2 border-border dark:border-darkgrey items-center"
              >
                <div>
                  <h6 className=" text-darkgrey dark:text-white">
                    {task.task}
                  </h6>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="relative -mt-2">
                    <button
                      className="flex justify-between items-center gap-4 px-3 py-2 rounded-md shadow-lg border dark:border-darkgrey text-darkgrey dark:text-white"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <span>
                        {selectedPriority ? selectedPriority : "Priority"}
                      </span>
                      <IoIosArrowDown />
                    </button>
                    {showDropdown && (
                      <div className="absolute top-full left-0 mt-1 bg-white dark:bg-inputs px-6 py-2 rounded-md shadow-lg border dark:border-darkgrey outline-none focus:outline-none">
                        {priorities.map((priority) => (
                          <button
                            key={priority.value}
                            onClick={() => handlePriorityChange(priority.value)}
                            className="flex flex-col justify-between items-center text-darkgrey dark:text-white"
                          >
                            {priority.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input type="radio" />
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
