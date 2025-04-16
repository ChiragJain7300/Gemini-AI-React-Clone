import React, { useContext, useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FaClockRotateLeft } from "react-icons/fa6";
import {
  RxCountdownTimer,
  RxGear,
  RxQuestionMarkCircled,
} from "react-icons/rx";
import { geminiContext } from "../context/geminiContext";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const { prevPrompts, resetChat, onSend } = useContext(geminiContext);
  return (
    <section
      className={`h-full dark:bg-gray-900 flex flex-col gap-4 p-6 ${
        extended ? "items-start" : "items-center"
      }`}
    >
      <div
        className="mb-10 border-2 border-transparent hover:border-gray-400 dark:hover:border-gray-600 p-1 rounded cursor-pointer transition duration-200"
        onClick={() => setExtended(!extended)}
      >
        <CgMenu size={28} className="text-black dark:text-white " />
      </div>

      {/* New Chat */}
      <div
        className="bg-slate-700 rounded-full p-3 flex items-center gap-2 cursor-pointer hover:bg-slate-600 transition duration-300 ease-in-out justify-evenly mb-5 "
        onClick={resetChat}
      >
        <img
          src="/assets/plus_icon.png"
          alt="plus_icon.png"
          className="w-5 mx-1"
        />
        {extended ? (
          <span className="text-sm font-bold text-white me-1.5">New Chat</span>
        ) : null}
      </div>

      {/* Chat history */}
      <div>
        <h1 className="text-md text-white font-bold">Recent</h1>
        <div
          className={`flex flex-col gap-3 mt-3 ${
            extended ? "w-64" : "w-0"
          } h-72 overflow-y-auto hide-scrollbar`}
        >
          {prevPrompts.map((prompt, index) => (
            <div
              className="dark:bg-slate-700 text-white w-full py-1 px-5 rounded-2xl overflow-auto hide-scrollbar min-h-12 max-h-16 leading-5 text-sm cursor-pointer dark:hover:bg-slate-600 duration-200 flex items-center"
              key={index}
              onClick={() => onSend(prompt, true)}
            >
              {prompt}
            </div>
          ))}
        </div>
      </div>

      {/* helpers */}
      <div className="mt-auto flex flex-col">
        <div className="helpers">
          <RxQuestionMarkCircled
            className="text-dark dark:text-white"
            size={20}
          />

          {extended ? <span className="text-md text-white">Help</span> : null}
        </div>
        <div className="helpers">
          <RxCountdownTimer className="text-dark dark:text-white" size={20} />

          {extended ? (
            <span className="text-md text-white">Activity</span>
          ) : null}
        </div>
        <div className="helpers">
          <RxGear className="text-dark dark:text-white" size={20} />

          {extended ? (
            <span className="text-md text-white">Settings</span>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
