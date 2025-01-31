import React from "react";

function RenderSavedContent({
  savedItems,
  clearSaves,
  handleBookNow,
  handleAddToCart,
  isVisibleAlert,
  alertMessage,
  visibleAlert,
}) {
  return (
    <div className="flex flex-col items-center px-4 md:px-8 lg:px-16">
      {isVisibleAlert && (
        <div className="fixed top-20 left-1/2 z-50 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md text-center">
          {alertMessage}
        </div>
      )}

      {savedItems.length > 0 ? (
        <div className="space-y-6 w-full md:w-3/4">
          {savedItems.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row p-6 border rounded-lg shadow-lg bg-white w-full transform transition-all duration-300 hover:scale-95"
            >
              {/* Image Section */}
              <div className="flex justify-center sm:justify-start">
                <img
                  src={item.service_img}
                  alt={item.service}
                  className="w-full sm:w-2/3 md:w-72 h-60 object-cover rounded-lg shadow-md"
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

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-6 mt-4 sm:mt-6">
                 
                  <div className="flex space-x-4">
                    <button
                      className="bg-gray-300 py-2 px-4 rounded-lg text-gray-700 transition duration-300 hover:bg-gray-400 w-full sm:w-auto"
                      onClick={() => {
                        handleBookNow(item);
                        visibleAlert(item.service, "bookings");
                      }}
                    >
                      In Shop
                    </button>
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-800 w-full sm:w-auto"
                      onClick={() => {
                        handleAddToCart(item);
                        visibleAlert(item.service, "cart");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-lg font-semibold">No saved items</p>
      )}

      {/* Clear Saves Button */}
      <button
        className="bg-red-500 text-white rounded-sm py-2 px-4 w-28 mt-6"
        onClick={clearSaves}
      >
        Clear Saves
      </button>
    </div>
  );
}

export default RenderSavedContent;
