import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import PaymentInfoPage from "../booking-pages/PaymentInfoPage";
import { carWashCategories } from "../../Data";

Modal.setAppElement("#root");

const RenderBookingContent = ({
  bookedItems,
  clearBooking,
  bookingTotalItems,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(() => {
    return localStorage.getItem("selectedService") || null;
  });
  const [modalPage, setModalPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem("selectedDate") || null;
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    return localStorage.getItem("selectedTime") || null;
  });
  const [selectedAddress, setSelectedAddress] = useState(() => {
    return localStorage.getItem("selectedAddress") || "";
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem("phoneNumber") || "";
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const [bookedItemIds, setBookedItemIds] = useState(() => {
    const savedItemIds = localStorage.getItem("bookedItemIds");
    return savedItemIds ? JSON.parse(savedItemIds) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookedItemIds", JSON.stringify(bookedItemIds));
  }, [bookedItemIds]);

  useEffect(() => {
    localStorage.setItem("selectedService", selectedService);
  }, [selectedService]);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem("selectedTime", selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem("selectedAddress", selectedAddress);
  }, [selectedAddress]);

  useEffect(() => {
    localStorage.setItem("phoneNumber", phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const totalPriceContainer = document.getElementById(
        "totalPriceContainer"
      );
      if (totalPriceContainer) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const containerHeight = totalPriceContainer.offsetHeight;
        const maxTop = windowHeight - containerHeight - 100;
        totalPriceContainer.style.top = `${Math.min(
          scrollTop + 100,
          maxTop
        )}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmitBooking = () => {
    if (editingItemId !== null) {
      setBookedItemIds((prev) => [...prev, editingItemId]);
    }
    setIsModalOpen(false);
    setShowConfirmation(false);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(true);
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
    setModalPage(4);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < 6 ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const toggleTransition = () => {
    setIsTransitioning(!isTransitioning);
  };
  const cancelToggleTransition = () => {
    setIsTransitioning(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleModalNext = () => {
    if (modalPage === 1 && !selectedService) {
      setErrorMessage("Please select a service.");
      return;
    }
    if (modalPage === 2 && (!selectedDate || !selectedTime)) {
      setErrorMessage("Please select both date and time.");
      return;
    }
    if (modalPage === 3 && (!selectedAddress || !phoneNumber)) {
      setErrorMessage("Please enter address and phone number.");
      return;
    }
    setErrorMessage("");
    setModalPage((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const handleModalBack = () => {
    setModalPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    if (e.target.value.length > 11) return;
    if (isNaN(e.target.value)) return;
  };

  const handleReview = () => {
    setShowReview(true);
  };

  const closeReview = () => {
    setShowReview(false);
  };

  const handleClearBooking = () => {
    clearBooking();
    setBookedItemIds([]);
    localStorage.removeItem("bookedItemIds");
  };

  return (
    <div className="mt-6">
      {bookedItems.length > 0 ? (
        <div className="space-y-6 w-full md:w-full">
          {bookedItems.map((item, index) => (
            <div
              key={index}
              className="relative w-full px-8 lg:w-2/3  flex flex-col sm:flex-row p-6 border rounded-lg shadow-lg bg-white  transform transition-all duration-300 hover:scale-95"
            >
              <div className="flex flex-col lg:flex-row items-center space-x-6">
                {/* Image Section */}
                <div className="flex justify-center sm:justify-start">
                  <img
                    src={item.service_img}
                    alt={item.service}
                    className="w-full lg:w-60 h-60 object-cover rounded-lg shadow-md"
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col w-full sm:ml-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <div className="w-full sm:w-3/4">
                      <p className="font-bold text-gray-900 text-lg hover:text-blue-600 transition duration-300 text-center sm:text-left">
                        {item.service}
                      </p>
                      <p className="text-base text-gray-700 mt-2 text-center sm:text-left">
                        {item.about}
                      </p>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex flex-col items-center sm:items-end space-y-2 mt-4 sm:mt-0">
                      <p className="text-black text-xl font-semibold">
                        ${item.price}
                      </p>
                      <p className="text-lg text-gray-500">
                        QTY:{" "}
                        <span className="text-xl text-black">
                          {item.quantity || 1}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-6 mt-4 ">
                    {bookedItemIds.includes(item.id) ? (
                      <div className="flex  space-x-4 items-center justify-center">
                        <button className="bg-green-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-green-700">
                          Booked
                        </button>
                        <button
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
                          onClick={handleReview}
                        >
                          <i className="fa-regular fa-star"></i> Review
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-4">
                        <button className="bg-gray-300 py-2 px-4 rounded-lg text-gray-700 transition duration-300 hover:bg-gray-400">
                          Processing
                        </button>
                        <button
                          className="bg-black text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-800"
                          onClick={() => {
                            setEditingItemId(item.id);
                            openModal();
                          }}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No booked items!</p>
      )}

      {/* booked items total price */}
      {bookedItems.length > 0 && (
        <div
          id="totalPriceContainer"
          className=" w-full flex justify-center mt-4 sm:mt-0 sm:w-64 sm:fixed sm:right-16 bg-gray-100 p-4 rounded-lg shadow-lg  transition-transform transform translate-y-0"
        >
          <div className="sm:hidden ">
            <div className="font-semibold text-xl text-gray-800 mb-4">
              <p> Total: ${bookingTotalItems().toFixed(2)}</p>
            </div>
            <button
              className="bg-black ml-6  text-white py-4 px-6 rounded-lg transition duration-300 hover:scale-105"
              onClick={toggleTransition}
            >
              Processed Booking
            </button>
          </div>

          {/* Always visible for larger screens */}
          <div className="hidden sm:block">
            <div className="font-semibold text-xl text-gray-800 mb-4">
              <p> Total: ${bookingTotalItems().toFixed(2)}</p>
            </div>
            <button
              className="bg-black ml-6  text-white py-4 px-6 rounded-lg transition duration-300 hover:scale-105"
              onClick={toggleTransition}
            >
              Processed Booking
            </button>
          </div>
        </div>
      )}

      <div className="flex space-x-12 mt-4">
        <button className="border-2 block" onClick={handleClearBooking}>
          Clear Booking
        </button>
      </div>

      <div className="relative overflow-hidden mt-8">
        <div
          className={`fixed top-20 right-0 bottom-20  bg-gray-800 w-96 transform transition-transform duration-300 ease-in-out shadow-lg rounded-l-lg z-50 ${
            isTransitioning ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {currentPage === 1 && <PaymentInfoPage />}

          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
              onClick={() => {
                handlePreviousPage;
                cancelToggleTransition();
              }}
            >
              Back
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Select Service"
        className="fixed inset-0 flex items-center justify-center z-50 mt-20 w-full px-4 lg:px-0  lg:w-2/6 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {openModal && (
          <div className="absolute top-12 right-12 z-50">
            <button
              className="bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700 transition duration-200 shadow-lg"
              onClick={closeModal}
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md h-[600px] overflow-y-auto flex flex-col justify-between">
          {errorMessage && (
            <div className="bg-red-100 text-red-700 border-2 border-red-600 rounded-lg shadow-lg p-4 mb-4">
              <p>{errorMessage}</p>
            </div>
          )}
          {modalPage === 1 ? (
            <div>
              <div className=" bg-white py-2 text-center">
                <h2 className="text-xl font-bold mb-4">Select Service</h2>
              </div>
              <div className="flex justify-center ">
                <ul className="space-y-4 w-full  ">
                  {carWashCategories.map((item, index) => (
                    <li
                      key={index}
                      className={`group bg-[#00304a] font-sans border-2 border-[#00304a] py-[2px] relative rounded-lg overflow-hidden ${
                        selectedService === item
                          ? "bg-white border-none"
                          : "bg-[#0b2b3cd8]"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 transition-all duration-1000 transform group-hover:translate-x-0 group-hover:bg-gray-50 translate-x-full`}
                      ></div>

                      <button
                        className={`w-full h-full focus:outline-none text-sm relative z-10 text-white px-4 py-3 hover:text-black hover:font-black ${
                          selectedService === item
                            ? "bg-[#FFAA33] scale-105"
                            : "text-gray-900 group-hover:scale-105"
                        }`}
                        onClick={() => handleServiceSelect(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : modalPage === 2 ? (
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-bold mb-4 text-center">
                Select Date and Time
              </h2>
              <div className="flex flex-col items-center space-y-4">
                <input
                  type="date"
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
                <input
                  type="time"
                  className="border-2 border-gray-300 p-2 rounded-lg"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                />
              </div>
            </div>
          ) : modalPage === 3 ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xl font-bold mb-4 text-center">
                Enter Details
              </p>
              <select
                name="address"
                id="address"
                className="border-2 border-gray-300 p-2 rounded-lg w-full"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                <option value="UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara">
                  UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara
                </option>
                <option value="UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara">
                  UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara
                </option>
                <option value="UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara">
                  UBA, FHM7+GF2, uba, Challenge Road, Ilorin 240101, Kwara
                </option>
              </select>
              <form className="w-full">
                <label htmlFor="number" className="block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 9060295114"
                  className="border-2 border-gray-300 p-2 rounded-lg w-full"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </form>
            </div>
          ) : (
            modalPage === 4 && (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Review Your Booking
                </h2>
                <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
                  <p className="font-semibold text-lg">Selected Service:</p>
                  <p className="mb-4 text-gray-700">{selectedService}</p>
                  <p className="font-semibold text-lg">
                    Selected Booking Date:
                  </p>
                  <p className="mb-4 text-gray-700">{selectedDate}</p>
                  <p className="font-semibold text-lg">
                    Selected Booking Time:
                  </p>
                  <p className="mb-4 text-gray-700">{selectedTime}</p>
                  <p className="font-semibold text-lg">Selected Address:</p>
                  <p className="mb-4 text-gray-700">{selectedAddress}</p>
                  <p className="font-semibold text-lg">Phone Number:</p>
                  <p className="mb-4 text-gray-700">{phoneNumber}</p>
                </div>
              </div>
            )
          )}

          <div className="mt-6 flex justify-between">
            <button
              className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
              onClick={handleModalBack}
            >
              Back
            </button>
            {modalPage === 4 ? (
              <button
                className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
                onClick={handleConfirmSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
                onClick={handleModalNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </Modal>

      {showConfirmation && (
        <Modal
          isOpen={showConfirmation}
          onRequestClose={handleCancelSubmit}
          contentLabel="Confirm Submission"
          className="fixed inset-0 flex items-center justify-center z-50 mt-20 w-full px-8 sm:w-2/6 mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-base font-bold mb-4">
              Are you sure you want to submit?
            </h2>
            <div className="flex justify-between">
              <button
                className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
                onClick={handleCancelSubmit}
              >
                No
              </button>
              <button
                className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
                onClick={handleSubmitBooking}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showReview && (
        <Modal
          isOpen={showReview}
          onRequestClose={closeReview}
          contentLabel="Review Booking"
          className="fixed inset-0 flex items-center justify-center z-50 mt-20 w-full px-4 sm:w-2/6 mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Review Your Booking
            </h2>
            <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold text-lg">Selected Service:</p>
              <p className="mb-4 text-gray-700">{selectedService}</p>
              <p className="font-semibold text-lg">Selected Booking Date:</p>
              <p className="mb-4 text-gray-700">{selectedDate}</p>
              <p className="font-semibold text-lg">Selected Booking Time:</p>
              <p className="mb-4 text-gray-700">{selectedTime}</p>
              <p className="font-semibold text-lg">Selected Address:</p>
              <p className="mb-4 text-gray-700">{selectedAddress}</p>
              <p className="font-semibold text-lg">Phone Number:</p>
              <p className="mb-4 text-gray-700">{phoneNumber}</p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="py-2 px-4 border-2 bored-[#00304a] rounded-lg shadow-md hover:bg-[#00304a] hover:text-white transition duration-200"
                onClick={closeReview}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RenderBookingContent;
