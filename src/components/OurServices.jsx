import React from "react";
import { Services } from "../Data";
import { useState } from "react";

function Ourservices() {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);
  const itemTOShow = showAll ? Services : Services.slice(0, 4);

  return (
    <div className="px-6 md:px-11 py-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Popular Daily</h1>
        <button
          className="text-red-600 font-semibold cursor-pointer hover:underline"
          onClick={toggleShowAll}
        >
          {showAll ? "Show less" : "Show all"}
        </button>
      </div>

      {/* Services Section */}
      <div className="flex flex-wrap justify-center gap-6">
        {itemTOShow.map((item, index) => (
          <div
            key={index}
            className="relative sm:w-72 w-96 h-80 bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            {/* Service Image */}
            <img
              src={item.service_img}
              alt={item.service}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Service Info */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 via-gray-800 to-transparent text-white p-4">
              <h3 className="text-lg font-bold">{item.service}</h3>
              <p className="text-sm">$ {item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ourservices;
