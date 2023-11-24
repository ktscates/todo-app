"use client";
import React, { useState } from "react";
import { RiMoonFill } from "react-icons/ri";
import { MdOutlineWbSunny } from "react-icons/md";
import InputField from "./components/InputField";
import Tasks from "./components/Tasks";

export default function Home() {
  const [theme, setTheme] = useState("light");

  const changeTheme = () => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <main
      className={`flex flex-col min-h-screen pt-[90px]  w-full ${
        theme === "light" ? "bg-lightgrey" : "bg-darkgrey"
      }`}
    >
      <div className="lg:mx-auto lg:w-1/2 flex justify-between mx-6">
        <h1 className="lg:text-4xl text-2xl font-bold text-darkgrey dark:text-white">
          TODO
        </h1>
        <div className="cursor-pointer" onClick={changeTheme}>
          {theme === "dark" ? (
            <MdOutlineWbSunny size={30} className="text-white" />
          ) : (
            <RiMoonFill size={30} className="text-darkgrey" />
          )}
        </div>
      </div>

      <InputField />
      <Tasks />
    </main>
  );
}
