function RenderAboutContent({
  aboutItems,
  handleAddToCart,
  isVisibleAlert,
  alertMessage,
  visibleAlert,
}) {
  return (
    <div className="flex flex-col p-4">
      {isVisibleAlert && (
        <div className="fixed top-20 left-1/2 z-50 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
          {alertMessage}
        </div>
      )}

      {aboutItems.length > 0 ? (
        <div className="space-y-8">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col md:flex-row p-6 border rounded-lg shadow-lg bg-white w-full md:w-3/4 lg:w-2/3 mx-auto transform transition-all duration-300 hover:scale-95"
            >
              <img
                src={item.service_img}
                alt={item.service}
                className="w-full md:w-1/3 h-60 object-cover rounded-lg shadow-lg"
              />

              <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6">
                <p className="font-bold text-gray-900 text-xl hover:text-blue-600 transition duration-300">
                  {item.service}
                </p>
                <p className="text-base text-gray-700 mt-3">
                  {item.about}
                </p>

                <p className="text-black text-2xl font-semibold mt-4">
                  ${item.price}
                </p>

                <button
                  className="bg-black text-white py-2 px-6 md:px-12 rounded-lg transition duration-300 hover:bg-gray-800 mt-4 flex items-center gap-2"
                  onClick={() => {
                    handleAddToCart(item);
                    visibleAlert(item.service, "cart");
                  }}
                >
                  Add to Cart
                  <span className="material-symbols-outlined text-xl">
                    add_shopping_cart
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-lg font-semibold text-center">
          No About items
        </p>
      )}
    </div>
  );
}

export default RenderAboutContent;
