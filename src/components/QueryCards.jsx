import React from "react";

const QueryCards = ({ query, key, handleSuggest }) => {
  return (
    <div
      key={key}
      className="bg-gray-800 p-3 rounded-lg relative h-44 cursor-pointer hover:bg-gray-700 transition-all duration-200 ease-in-out"
      onClick={() => handleSuggest(query.query)}
    >
      <p className="">{query.query}</p>
      <div className="bg-white p-1 inline-block absolute bottom-3 right-3 rounded-full">
        <img src={query.img} alt={query.img} className="w-6" />
      </div>
    </div>
  );
};

export default QueryCards;
