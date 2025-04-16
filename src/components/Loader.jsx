import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center gap-2 text-gray-500 animate-pulse mt-2">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.4s]"></span>
      <span className="ml-2 text-lg font-bold">Thinking...</span>
    </div>
  );
};

export default Loader;
