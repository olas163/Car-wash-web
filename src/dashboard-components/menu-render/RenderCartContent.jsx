import React, { useEffect } from "react";

const RenderCartContent = ({
  cart,
  updateQuantity,
  handleRemoveItem,
  totalItems,
  setCart,
}) => {
  // const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const cartSummary = document.getElementById("cart-summary");
      if (cartSummary && window.innerWidth >= 640) {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const containerHeight = cartSummary.offsetHeight;
        const maxTop = windowHeight - containerHeight - 100;
        cartSummary.style.top = `${Math.min(scrollTop + 100, maxTop)}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className=" mt-0 lg:mt-1 px-4">
      {cart.length > 0 ? (
        <div className="space-y-6 ">
          {cart.map((item, index) => (
            <div
              key={index}
              className="relative w-full lg:w-2/3  flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center sm:flex-row flex-col sm:space-x-6">
                <img
                  src={item.service_img}
                  alt={item.service}
                  className="w-full sm:w-40 h-40 sm:h-56 object-cover rounded-lg mb-4 sm:mb-0"
                />
                <div className="text-center sm:text-left">
                  <p className="font-bold text-gray-900 text-lg">
                    {item.service}
                  </p>
                  <p className="text-gray-600 text-sm">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mt-4 sm:mt-0">
                <div className="flex items-center border rounded-lg px-3 py-1">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="text-gray-600 hover:text-gray-900 px-3 text-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="text-gray-600 hover:text-gray-900 px-3 text-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="text-red-600 hover:text-red-800 absolute button-1/3 right-4 sm:absolute sm:top-4 sm:right-4"
                >
                  <i className="fa-solid fa-trash text-xl"></i>
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div
            id="cart-summary"
            className="w-full sm:w-64 bg-white p-4 rounded-lg shadow-md text-[#00304a] sm:fixed sm:top-20 sm:right-20"
          >
            {/* Collapsible for mobile */}
            <div className="sm:hidden">
              <h1 className="font-semibold text-xl mb-3">Products Summary</h1>
              <div className="mt-4">
                <p className="text-base font-sans font-semibold mb-2">
                  Product Count: 0{cart.length}
                </p>
                <p className="text-base font-sans font-semibold">
                  Total: ${totalItems().toFixed(2)}
                </p>
                <button className="py-2 px-8 bg-[#00304a] text-white rounded-lg text-center font-semibold mt-4 ml-20">
                  Checkout
                </button>
              </div>
            </div>

            {/* Always visible for larger screens */}
            <div className="hidden sm:block">
              <h1 className="font-semibold text-xl mb-3">Products Summary</h1>

              <p className="text-lg font-sans font-semibold mb-2">
                Product Count: 0{cart.length}
              </p>
              <p className="text-lg font-sans font-semibold">
                Total: ${totalItems().toFixed(2)}
              </p>
              <button className="py-2 px-8 bg-[#00304a] text-white rounded-lg text-center font-semibold mt-4 ml-12">
                Checkout
              </button>
            </div>
          </div>

          {/* Clear Cart Button */}
          <button
            onClick={() => setCart([])}
            className="mt-6 px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your cart is empty!</p>
      )}
    </div>
  );
};

export default RenderCartContent;
