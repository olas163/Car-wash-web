// Constants for IDs
const NAV_IDS = {
  PROFILE: 1,
  BOOKING: 2,
  OFFERS: 3,
  SAVE: 4,
  ABOUT_US: 5,
};

// Enum-like object for list items
const NAV_ITEMS = {
  PROFILE: "profile",
  BOOKING: "booking",
  OFFERS: "offers",
  SAVE: "save",
  ABOUT_US: "about us",
};

const NAV_TITLE = "car wash";

// Navigation list
export const navList = [
  { id: NAV_IDS.PROFILE, list: NAV_ITEMS.PROFILE },
  { id: NAV_IDS.BOOKING, list: NAV_ITEMS.BOOKING },
  { id: NAV_IDS.OFFERS, list: NAV_ITEMS.OFFERS },
  { id: NAV_IDS.SAVE, list: NAV_ITEMS.SAVE },
  { id: NAV_IDS.ABOUT_US, list: NAV_ITEMS.ABOUT_US },
];

export const navTile = NAV_TITLE;

//Image slide Array C-two
export const images = [
  "/Landing-Page-1.png",
  "/discount-page.png",
  "/full-service-wash.jpg",
  "/oil-changing.jpg",
  "exterior_wash_2.jpg",
];

// Popular images C- three
// const IMG_IDS = {
//   INTERIOR_VACUUM: 1,
//   EXTERIOR_WASH: 2,
//   FULL_SERVICE_WASH: 3,
//   INTERIOR_DETAILING: 4,
//   TIRE_SHINE: 5,
//   WAXING: 6,
//   MOBILE_WASH: 7,
//   FLEET_CLEAN:8,

// }

export const Services = [
  {
    id: 1,
    service_img: "/Vacuum.jpg",
    service: "Interior Vacuuming",
    price: 20.56,
    about:
      "Interior vacuuming removes dirt, dust, and debris from your car’s upholstery, carpets, and other interior surfaces to keep your car looking clean and fresh.",
  },
  {
    id: 2,
    service_img: "/exterior_wash_2.jpg",
    service: "Exterior Wash",
    price: 22.33,
    about:
      "Exterior wash includes thorough cleaning of your vehicle's body, windows, and wheels, removing dirt, grime, and environmental contaminants for a clean, polished look.",
  },
  {
    id: 3,
    service_img: "/full-service-wash.jpg",
    service: "Full-Service Wash",
    price: 40,
    about:
      "A full-service wash covers both the interior and exterior of your vehicle, including vacuuming, washing, waxing, and window cleaning to make your car look spotless inside and out.",
  },
  {
    id: 4,
    service_img: "/interior -exterior.jpg",
    service: "Interior & Exterior Detailing",
    price: 21.33,
    about:
      "Interior & exterior detailing provides a deep clean for both the inside and outside of your car, including detailed cleaning, polishing, and protection for your vehicle's surfaces.",
  },
  {
    id: 5,
    service_img: "/tire-shine.png",
    service: "Tire Shine",
    price: 22.33,
    about:
      "Tire shine enhances the appearance of your tires by restoring a glossy, black finish and protecting them from cracking and fading caused by UV rays.",
  },
  {
    id: 6,
    service_img: "./public/waxing.jpg",
    service: "Waxing",
    price: 12.99,
    about:
      "Waxing provides a protective layer on your car’s paint, enhancing its shine and protecting it from the elements, water spots, and minor scratches.",
  },
  {
    id: 7,
    service_img: "/oil-changing.jpg",
    service: "Oil Changing",
    price: 23.99,
    about:
      "Oil changing is a routine maintenance service that replaces your car’s old engine oil with fresh oil to ensure optimal engine performance and longevity.",
  },
  {
    id: 8,
    service_img: "/brake-check.jpg", // New image for Brake Check
    service: "Brake Check",
    price: 19.99,
    about:
      "A brake check involves inspecting the brake system to ensure everything is functioning correctly, including the pads, rotors, and fluid levels to ensure safety.",
  },
  {
    id: 9,
    service_img: "/some-other-service.jpg", // Placeholder for another service
    service: "Battery Check",
    price: 18.99,
    about:
      "A battery check ensures your car's battery is in good health, measuring voltage and checking for signs of wear to prevent unexpected breakdowns.",
  },
];

export const footerList = [
  { id: 1, title: "HELP", list: ["Help Center", "How to Shop"] },
  {
    id: 2,
    title: "ABOUT",
    list: ["About car Wash", "Terms & Conditions", "Privacy Policy"],
  },
  {
    id: 3,
    title: "Contact us",
    list: [
      " Phone: +234 9060295114",
      "Open Hour: Every day 8.00 am- 5.00pm",
      "Email: info@example.com",
    ],
  },
];

// dashboard cart list

export const menuItems = [
  { id: "services", icon: "fa-shop", label: "Services" },
  { id: "cart", icon: "fa-cart-shopping", label: "Cart", count: 0 },
  { id: "booking", icon: "fa-check-to-slot", label: "Booking", count: 0 },
  { id: "save", icon: "fa-heart", label: "Save", count: 0 },
  { id: "about", icon: "fa-user", label: "About Us", count: 0 },
];

export const carWashCategories = [
  "Basic Car Wash Services",
  "Premium Car Wash Services",
  "Detailing Services",
  "Eco-Friendly Options",
  "Add-On Services",
  "Luxury & Fleet Services",
  "Membership Plans",
];
