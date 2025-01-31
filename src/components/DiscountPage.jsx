import React, { useState } from "react";
import { Services } from "../Data";

function DiscountPage() {
  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? Services : Services.slice(0, 3);

  const exploreMore = () => {
    setShowAll(!showAll);
  };

  return (
    <article className="max-w-screen-xl mx-auto py-6 mb-11 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 justify-center items-center">
        <div className="relative w-full lg:w-2/3">
          <img
            src="/discount-page.png"
            alt="50% off discount on first booking"
            loading="lazy"
            className="object-cover w-full rounded-lg shadow-lg"
          />
          <p className="absolute top-1/4 left-8 text-2xl sm:text-3xl font-semibold text-white">
            Get <br /> <span className="text-yellow-400">50% off</span> <br />
            Discount on first Booking
          </p>
        </div>

        <div className="flex flex-col justify-center w-full lg:w-1/3">
          <h1 className="text-xl font-bold mb-4 text-center lg:text-left">
            Thinking About What to Get?
          </h1>
          <div>
            {itemsToShow.map((item, index) => (
              <div key={index} className="mb-3">
                <p className="text-lg text-gray-700">{item.service}</p>
              </div>
            ))}
          </div>

          <button
            className="mt-4 py-2 px-6 bg-black text-white rounded-full hover:bg-gray-700 transition-colors duration-300 self-center lg:self-start"
            onClick={exploreMore}
          >
            {showAll ? "Show less" : "Explore More"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default DiscountPage;