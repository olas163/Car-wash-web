import React, { useContext } from "react";
import { GlobalContext } from "../GlobalStateManagement";

const MenuItem = ({
  item,
  selectedItem,
  setSelectedItem,
  setShowServices,
  setShowCartContent,
  setShowBookingContent,
  setShowSavedContent,
  setShowAboutUs,
}) => {
  const { cart, bookedItems, savedItems, aboutItems } =
    useContext(GlobalContext);

  // Handle menu item click
  const handleMenuClick = () => {
    // Mapping item IDs to state-updating functions
    const menuActions = {
      services: () => setShowServices(true),
      cart: () => setShowCartContent(true),
      booking: () => setShowBookingContent(true),
      save: () => setShowSavedContent(true),
      about: () => setShowAboutUs(true),
    };
  
    // Execute the corresponding function if it exists
    if (menuActions[item.id]) {
      menuActions[item.id]();
    }
  
    // Update the selected menu item
    setSelectedItem(item.id);
  };
  

  return (
    <div
      key={item.id}
      className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
        selectedItem === item.id
          ? "bg-[#f0f8ff] font-bold"
          : "hover:bg-[#f5f5f5]"
      }`}
      onClick={handleMenuClick}
      role="menuitem"
      aria-selected={selectedItem === item.id}
    >
      {selectedItem === item.id && (
        <div className="bg-[#00304a] rounded-r-2xl w-11 h-14 absolute -left-8"></div>
      )}
      <div className="flex items-center space-x-2">
        <i className={`fa-solid ${item.icon} text-xl text-[#00304a]`}></i>
        <p className="text-md text-[#00304a]">{item.label}</p>
      </div>
      {item.id !== "services" && (
        <div className="h-8 w-8 bg-[#00304a] rounded-full font-semibold text-white flex items-center justify-center">
          {item.id === "cart"
            ? cart.length
            : item.id === "booking"
            ? bookedItems.length
            : item.id === "save"
            ? savedItems.length
            : item.id === "about"
            ? aboutItems.length
            : item.count}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
