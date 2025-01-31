import { GlobalContext } from "../GlobalStateManagement";
import { navList, navTile } from "../Data";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Header() {
  const { toggleMenu, openMenu } = useContext(GlobalContext);

  return (
    <header className="fixed left-0 right-0 -top-1 py-4 px-8 md:px-20  z-50 backdrop-blur-md bg-white/70 shadow-lg">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out hover:text-orange-500">
            {navTile}
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 capitalize cursor-pointer">
          {navList.map((item, index) => (
            <li
              key={item.id}
              className={`relative ${
                index === navList.length - 1 ? "" : "border-r-2 border-gray-300"
              } px-3 py-1`}
            >
              {/* Link for the first item */}
              {index === 0 ? (
                <Link
                  to={item.link || "/profile"}
                  className="text-gray-800 font-medium transition-all duration-300 ease-in-out hover:text-orange-500 hover:underline"
                >
                  {item.list}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium hover:text-orange-500">
                  {item.list}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden cursor-pointer text-gray-800"
        >
          <i className={`fa-solid ${openMenu ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Mobile Menu */}
        <ul
          className={`fixed top-1 right-1 bottom-0  w-64 transform transition-transform duration-300 ease-in-out shadow-lg rounded-l-lg z-50 ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
          role="navigation"
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Menu Items */}
          {navList.map((item, index) => (
            <li
              key={index}
              className="px-6 py-3 border-b border-gray-700 last:border-b-0  bg-gray-800"
            >
              {/* Link for the first item */}
              {
                <Link
                  to={item.link || "/profile"}
                  className="text-white text-lg font-semibold transition-all duration-300 ease-in-out hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                >
                  {item.list}
                </Link>
              }
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
