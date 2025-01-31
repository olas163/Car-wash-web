import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalStateManagement";

const ServiceCard = ({ service, toggleSeeMore }) => {
  const { handleSavedItem, handleRemoveSavedItem, handleAboutUs } =
    useContext(GlobalContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // To toggle text expansion

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setIsFavorite(!!savedFavorites[service.id]);
  }, [service.id]);

  const handleFavoriteClick = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    if (isFavorite) {
      delete savedFavorites[service.id];
      handleRemoveSavedItem(service);
    } else {
      savedFavorites[service.id] = true;
      handleSavedItem(service);
    }
    localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative w-80 h-96 bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
      {/* Service Image with Overlay */}
      <div className="relative h-full">
        <img
          src={service.service_img}
          alt={service.service}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white z-10 space-y-2">
          <h3 className="text-xl font-bold truncate">{service.service}</h3>
          {/* About Text */}
          <p
            className={`text-sm text-gray-200 leading-tight ${
              isExpanded ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {service.about}
          </p>
          {/* "See More" Button */}
          <button
            onClick={() => {
              toggleDescription();
              handleAboutUs(service);
              toggleSeeMore();
            }}
            className="text-blue-400 hover:underline text-sm"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
          <p className="text-lg font-bold">${service.price.toFixed(2)}</p>
        </div>
        {/* Favorite Icon */}
        <button
          className={`absolute top-4 right-4 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-white hover:bg-gray-100 text-gray-600"
          }`}
          aria-label="Add to Favorites"
          onClick={handleFavoriteClick}
        >
          <i
            className={`fa-${
              isFavorite ? "solid" : "regular"
            } fa-heart text-xl`}
          ></i>
        </button>
      </div>
    </div>
  );
};

// const ServiceGrid = ({ services, toggleSeeMore }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
//       {services.map((service) => (
//         <ServiceCard
//           key={service.id}
//           service={service}
//           toggleSeeMore={toggleSeeMore}
//         />
//       ))}
//     </div>
//   );
// };

export default ServiceCard;
