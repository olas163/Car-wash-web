import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./GlobalStateManagement";
import Header from "./components/Header";
import CarSlides from "./components/CarSlides";
import Ourservices from "./components/Ourservices";
import DiscountPage from "./components/DiscountPage";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";
import Dashboard from "./dashboard-components/Dashboard";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        {/* Header and Car Slides are displayed on all pages for a consistent look */}
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <>
                <Header />

                <CarSlides />
                <Ourservices />
                <DiscountPage />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
