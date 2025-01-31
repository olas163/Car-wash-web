import React, { useContext, useEffect, useState } from "react";
import { menuItems, Services } from "../Data";
import { GlobalContext } from "../GlobalStateManagement";
import MenuItem from "./MenuItem";
import ServiceCard from "./ServiceCard";
import RenderCartContent from "./menu-render/RenderCartContent";
import RenderBookingContent from "./menu-render/RenderBookingContent";
import RenderSavedContent from "./menu-render/RenderSavedContent";
import RenderAboutContent from "./menu-render/RenderAboutContent";

function SideBar() {
  const {
    selectedItem,
    setSelectedItem,
    cart,
    handleRemoveItem,
    updateQuantity,
    totalItems,
    bookingTotalItems,
    handleBookItem,
    handleBookNow, // function to book item with booking details
    handleAddToCart,
    setCart,
    bookedItems,
    clearBooking,
    savedItems,
    clearSaves,
    aboutItems,
    handlerSearch, // Import handlerSearch from context
  } = useContext(GlobalContext); // Access cart and bookedItems from context

  const [showServices, setShowServices] = useState(false);
  const [showCartContent, setShowCartContent] = useState(false);
  const [showSavedContent, setShowSavedContent] = useState(false);
  const [showBookingContent, setShowBookingContent] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle the display of services and reset selected item and cart content
  // const handlePrices = () => {
  //   setShowServices(true);
  //   setSelectedItem(null);
  //   setShowCartContent(false);
  //   setShowBookingContent(false);
  //   setShowSavedContent(false);
  //   setShowAboutUs(false);
  // };

  // Function to toggle pages and save the selected page to localStorage
  const togglePage = (page) => {
    setShowServices(page === "services");
    setShowCartContent(page === "cart");
    setShowBookingContent(page === "booking");
    setShowSavedContent(page === "save");
    setShowAboutUs(page === "about");

    localStorage.setItem("selectedPage", page);
  };

  useEffect(() => {
    // Load the saved page from localStorage
    const savedPage = localStorage.getItem("selectedPage") || "services";
    setSelectedItem(savedPage);
    togglePage(savedPage);
  }, []);

  // function to see more about the service in about us section
  const toggleSeeMore = () => {
    setShowAboutUs(true);
    setSelectedItem("about");
    setShowServices(false);
  };

  const visibleAlert = (serviceName, menuLabel) => {
    setAlertMessage(
      `${serviceName}  has been successfully added to your ${menuLabel}. Please check the sidebar to proceed.`
    );
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // useEffect(() => {
  //   const checkReminders = () => {
  //     const today = new Date();
  //     bookedItems.forEach((item) => {
  //       const bookingDate = new Date(bookingDetails[item.id]?.date);
  //       const timeDifference = bookingDate - today;
  //       const daysDifference = Math.ceil(
  //         timeDifference / (1000 * 60 * 60 * 24)
  //       );

  //       if (daysDifference === 1 || daysDifference === 0) {
  //         setReminderAlert(
  //           `Reminder: Your booking for ${item.service} is ${
  //             daysDifference === 1 ? "tomorrow" : "today"
  //           }.`
  //         );
  //       }
  //     });
  //   };

  //   checkReminders();
  // }, [bookedItems, bookingDetails]);

  // Show booking error alert

  // Confirm booking function
  // const handleConfirmBtn = (item) => {
  //   const date = bookingDetails[item.id]?.date; // Extract date
  //   const time = bookingDetails[item.id]?.time; // Extract time

  //   if (!date || !time) {
  //     alertBookingError();
  //     return;
  //   }

  //   handleBookItem({ ...item, date, time });

  //   setBookedItems((prev) =>
  //     prev.map((bookedItem) =>
  //       bookedItem.id === item.id
  //         ? { ...bookedItem, isConfirmed: true, date, time } // Add date and time to the item
  //         : bookedItem
  //     )
  //   );
  // };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-[75px] bottom-0 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg w-[70%] sm:w-[40%] md:w-1/4 lg:w-1/5 
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6">
          {/* Close Button (Visible on Mobile) */}
          <button
            className="absolute top-4 right-4 text-gray-700 text-xl lg:hidden"
            onClick={toggleSidebar}
          >
            ✖
          </button>

          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                selectedItem={selectedItem}
                setSelectedItem={(page) => {
                  setSelectedItem(page);
                  togglePage(page);
                  setIsSidebarOpen(false);
                }}
                setShowServices={setShowServices}
                setShowCartContent={setShowCartContent}
                setShowSavedContent={setShowSavedContent}
                setShowBookingContent={setShowBookingContent}
                setShowAboutUs={setShowAboutUs}
                cart={cart}
                savedItems={savedItems}
                bookedItems={bookedItems}
                handleBookItem={handleBookItem}
                s
              />
            ))}

            {/* Log Out Section */}
            <div className="mt-40">
              <p className="flex items-center cursor-pointer text-[#00304a]">
                <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
                Log Out
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Menu (Mobile Only) */}
      <button
        className="fixed top-4 left-4 text-2xl text-gray-700 lg:hidden z-50"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="flex-1 ml-0  pt-28 w-full px-4 lg:ml-[20%] lg:pt-28">
        {/* Show reminder alert pop up */}
        {/* {reminderAlert && (
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4">
            <div className="bg-blue-100 text-blue-700 border-2 border-blue-600 rounded-lg shadow-lg p-6 max-w-sm w-full">
              <p className="font-semibold">{reminderAlert}</p>
              <button
                onClick={() => setReminderAlert(null)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Dismiss
              </button>
            </div>
          </div>
        )} */}

        {/* Display Services */}
        {showServices && (
          <div className="flex flex-wrap gap-4 justify-center">
            {handlerSearch().map((service, index) => (
              <div className="border-2 px-4 py-4 rounded-lg" key={index}>
                <ServiceCard service={service} toggleSeeMore={toggleSeeMore} />
              </div>
            ))}
          </div>
        )}

        {/* Display Cart */}
        {selectedItem === "cart" && showCartContent && (
          <RenderCartContent
            cart={cart}
            updateQuantity={updateQuantity}
            handleRemoveItem={handleRemoveItem}
            totalItems={totalItems}
            setCart={setCart}
          />
        )}

        {/* Display Booking */}
        {selectedItem === "booking" && showBookingContent && (
          <RenderBookingContent
            bookedItems={bookedItems}
            clearBooking={clearBooking}
            bookingTotalItems={bookingTotalItems}
          />
        )}

        {/* Display Saved items */}
        {selectedItem === "save" && showSavedContent && (
          <RenderSavedContent
            savedItems={savedItems}
            clearSaves={clearSaves}
            handleBookNow={handleBookNow}
            handleAddToCart={handleAddToCart}
            isVisibleAlert={isAlertVisible}
            alertMessage={alertMessage}
            visibleAlert={visibleAlert}
          />
        )}

        {/* Display About us */}

        {selectedItem === "about" && showAboutUs && (
          <RenderAboutContent
            aboutItems={aboutItems}
            handleAddToCart={handleAddToCart}
            isVisibleAlert={isAlertVisible}
            alertMessage={alertMessage}
            visibleAlert={visibleAlert}
          />
        )}
      </div>
    </div>
  );
}

export default SideBar;
