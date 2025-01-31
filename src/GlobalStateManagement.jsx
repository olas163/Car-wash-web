import React, { createContext, useEffect, useState } from "react";
import { Services } from "./Data";
// Create a context
export const GlobalContext = createContext();

// Safe parse function for localStorage retrieval
const safeParse = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    if (value === null || value === "undefined") {
      // Return defaultValue if value is null or "undefined"
      return defaultValue;
    }
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState(() => safeParse("cart", []));
  const [bookedItems, setBookedItems] = useState(() =>
    safeParse("bookedItems", [])
  );

  const [savedItems, setSavedItems] = useState(() =>
    safeParse("saveItems", [])
  );
  const [aboutItems, setAbout] = useState(() => safeParse("aboutItems", []));
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  // Cleanup invalid storage values (optional)
  useEffect(() => {
    const cleanupInvalidStorage = () => {
      const keysToCheck = ["cart", "bookedItems", "saveItems", "aboutItems"];
      keysToCheck.forEach((key) => {
        const value = localStorage.getItem(key);
        if (value === "undefined") {
          localStorage.removeItem(key);
        }
      });
    };
    cleanupInvalidStorage();
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Persist booked items to localStorage
  useEffect(() => {
    localStorage.setItem("bookedItems", JSON.stringify(bookedItems));
  }, [bookedItems]);

  // Persist saved items to localStorage
  useEffect(() => {
    localStorage.setItem("saveItems", JSON.stringify(savedItems));
  }, [savedItems]);

  // persist about items to LocalStorage
  useEffect(() => {
    localStorage.setItem("aboutItems", JSON.stringify(aboutItems));
  }, [aboutItems]);
  // Function for updating the search input value
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  // Function for filtering items based on the search value
  const handlerSearch = () => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    // Filter items matching the search value
    const filteredItems = Services.filter((item) =>
      item.service.toLowerCase().includes(normalizedSearchValue)
    );

    return filteredItems;
  };

  // Function to add an item to the cart
  const handleAddToCart = (service) => {
    setCart((prevCart) => {
      const existingService = prevCart.find((item) => item.id === service.id);
      if (existingService) {
        return prevCart.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const totalItems = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (service) => {
    const updatedCart = cart.filter((item) => item.id !== service.id);
    setCart(updatedCart);
  };

  // Function to book an item
  const handleBookItem = (service) => {
    setBookedItems((prev) => {
      const existingBook = prev.find((item) => item.id === service.id);
      if (existingBook) {
        return prev.map((item) =>
          item.id === service.id ? { ...item } : item
        );
      } else {
        return [...prev, { ...service }];
      }
    });
  };

  const handleBookNow = (service) => {
    // Check if the service is already in the `bookedItems` array
    const isAlreadyBooked = bookedItems.some(
      (bookedService) => bookedService.id === service.id
    );

    if (!isAlreadyBooked) {
      handleBookItem(service); // Add the service to the `bookedItems` array
      resetModalFields();
    }
  };

  // function about us
  const handleAboutUs = (service) => {
    setAbout((prev) => {
      const existingAbout = prev.find((item) => item.id === service.id);
      if (existingAbout) {
        return prev.map((item) =>
          item.id === service.id ? { ...item } : item
        );
      } else {
        return [...prev, { ...service }];
      }
    });
  };
  const resetModalFields = () => {
    localStorage.removeItem("selectedService");
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("phoneNumber");
  };

  const clearBooking = () => {
    setBookedItems([]);
  };

  // booking totalItems
  const bookingTotalItems = () => {
    return bookedItems.reduce((total, item) => {
      const quantity = item.quantity || 1; // Default to 1 if quantity is undefined
      const price = item.price || 0; // Default to 0 if price is undefined
      return total + price * quantity; // Calculate total for each item
    }, 0); // Start with an initial total of 0
  };
  const handleSavedItem = (service) => {
    setSavedItems((prev) => {
      const existingSaved = prev.find((item) => item.id === service.id);
      if (existingSaved) {
        return prev.map((item) =>
          item.id === service.id ? { ...item } : item
        );
      } else {
        return [...prev, { ...service }];
      }
    });
  };

  const handleRemoveSavedItem = (service) => {
    const updatedSaved = savedItems.filter((item) => item.id !== service.id);
    setSavedItems(updatedSaved);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchValue,
        changeSearchValue,
        handlerSearch,
        cart,
        setCart,
        handleAddToCart,
        bookedItems,
        setBookedItems,
        handleBookItem,
        handleBookNow,
        bookingTotalItems,
        openMenu,
        toggleMenu: () => setOpenMenu((prev) => !prev),
        selectedItem,
        setSelectedItem,
        handleRemoveItem,
        updateQuantity,
        totalItems,
        clearBooking,
        savedItems,
        handleSavedItem,
        handleRemoveSavedItem,
        clearSaves: () => setSavedItems([]),
        aboutItems,
        handleAboutUs,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
