import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../Data";
import { GlobalContext } from "../GlobalStateManagement";
import { auth } from "../firebase"; // Import auth
import { onAuthStateChanged } from "firebase/auth"; // Import onAuthStateChanged

function DashHeader() {
  const { selectedItem, changeSearchValue, searchValue, handlerSearch } =
    useContext(GlobalContext);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const toggleSearch = () => {
    setIsSearchExpanded((prev) => !prev);
  };

  return (
    <header className="bg-white fixed -top-1 left-0 right-0 py-4 h-[80px] shadow-md rounded-br-3xl z-50 ">
      <div className="flex justify-between items-center px-8 ">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#00304a] text-2xl font-bold hidden md:block"
        >
          Car Wash
        </Link>

        {/* Active Menu Item */}
        <div className="text-[#00304a] text-lg font-medium hidden md:block">
          {menuItems.map((item) =>
            selectedItem === item.id ? item.label : null
          )}
        </div>

        {/* Search Bar */}
        <div
          className={`relative transition-all duration-300  ${
            isSearchExpanded ? "w-full" : "w-auto"
          } md:w-1/3`}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={changeSearchValue}
            className={`${
              isSearchExpanded ? "block" : "hidden"
            } md:block w-full border-b-2 border-gray-300 px-8 py-1 focus:outline-none focus:border-[#00304a]`}
          />
          <i
            onClick={() => {
              toggleSearch();
              if (isSearchExpanded) {
                handlerSearch();
              }
            }}
            className={` fa-solid fa-magnifying-glass absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer  ${
              isSearchExpanded ? "" : "hidden"
            }`}
          ></i>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4 md:flex">
          {
            <>
              <h4 className="text-[#00304a] font-medium hidden lg:contents">
                {"User"}
              </h4>
              <img
                src={"https://via.placeholder.com/40"}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#00304a]"
              />
            </>
          }
        </div>
      </div>

      {/* Centered Search Icon for Mobile Devices (before expansion) */}
      <div className="flex justify-center md:hidden ">
        <i
          onClick={() => {
            toggleSearch();
            if (isSearchExpanded) {
              handlerSearch();
            }
          }}
          className={` fixed top-3 fa-solid fa-magnifying-glass text-gray-500 cursor-pointer text-base  bg-white shadow-md rounded-full p-2 ${
            isSearchExpanded ? "hidden" : ""
          }`}
        ></i>
      </div>
    </header>
  );
}

export default DashHeader;
