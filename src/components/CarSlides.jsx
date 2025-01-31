import React, { useCallback, useEffect, useState } from "react";
import { images } from "../Data";

function CarSlides() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = direction + prevIndex;
      return newIndex >= images.length
        ? (setDirection(-1), prevIndex - 1)
        : newIndex < 0
        ? (setDirection(1), prevIndex + 1)
        : newIndex;
    });
  }, [direction, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="w-full h-screen overflow-hidden relative z-0">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative  "
          >
            <img
              src={src}
              className="w-full h-full object-cover object-center"
              alt={`Car Wash Service ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            {/* Friendly text for car wash services */}
            <div className="absolute inset-0 flex items-center justify-end pr-5 md:pr-20">
              <div className="text-white text-right max-w-md bg-black bg-opacity-50 p-6 rounded-lg">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {index === 0 && "Sparkling Clean Cars"}
                  {index === 1 && "Eco-Friendly Wash"}
                  {index === 2 && "Premium Detailing"}
                  {index === 3 && "Express Service"}
                  {index === 4 && "Ceramic Coating"}
                </h2>
                <p className="text-lg md:text-xl mb-6">
                  {index === 0 && "We make your car shine like new!"}
                  {index === 1 && "Environmentally safe cleaning solutions."}
                  {index === 2 && "Give your car the care it deserves."}
                  {index === 3 &&
                    "Fast and efficient service to save you time!"}
                  {index === 4 &&
                    "Long-lasting protection for your car's paint."}
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="hidden sm:contents absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-4xl z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      <button
        className="  hidden sm:contents absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-4xl z-10 bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-70 transition-all duration-300"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hidden sm:contents ${
              currentIndex === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            role="button"
            tabIndex={0}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CarSlides;
