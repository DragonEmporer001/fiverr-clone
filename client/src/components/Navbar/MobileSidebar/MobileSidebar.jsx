import React, { useState, useEffect, useRef } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { GoLocation } from "react-icons/go"; // Location icon
import { FiChevronDown } from "react-icons/fi"; // Chevron icon for dropdowns
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MobileSidebar = ({ show, setShow, setLoginModal }) => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLocation, setSelectedLocation] = useState("Select Location");

  const showRef = useRef(null);
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "bn", name: "বাংলা" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "mr", name: "मराठी" },
    { code: "ur", name: "اردو" },
  ];

  const locations = [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "New Delhi", 
    "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
    "Pune", "Ahmedabad"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRef.current && !showRef.current.contains(event.target)) {
        setShow(false);
        setLanguageDropdown(false);
        setLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setLanguageDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationDropdown(false);
  };

  return (
    <div
      className={`w-full h-full bg-black/40 fixed top-0 z-40 left-0 transition-all duration-500 ${
        show ? "flex" : "hidden"
      }`}
    >
      <motion.div
        animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }}
        transition={{ duration: 0.3 }}
        ref={showRef}
        className="flex flex-col gap-4 justify-start items-start w-[250px] bg-white absolute top-0 z-20 h-screen p-6"
      >
        <div className="sticky top-0 bg-white w-full flex flex-col gap-6">
          <NavLink
            to="/join"
            className="border py-3 px-6 rounded bg-[#17548F] border-[#17548F] text-white transition-all duration-300 text-base font-semibold"
          >
            Join JUSTI CO.
          </NavLink>
          <div
            onClick={() => {
              navigate("/");
              setShow(false);
              setLoginModal(true);
            }}
            className="cursor-pointer text-gray-400 text-base font-medium"
          >
            Sign in
          </div>
        </div>

        <p className="cursor-pointer text-gray-400 text-base font-medium">
          Browse Categories
        </p>
        <p className="cursor-pointer text-gray-400 text-base font-medium">
          Explore
        </p>

        <NavLink to="/" className="text-base font-semibold text-gray-400">
          JUSTI CO. Business
        </NavLink>

        <div className="mt-5 border-t w-full flex flex-col gap-4 pt-3">
          {/* Location Dropdown */}
          <div
            className="cursor-pointer text-gray-400 text-base font-medium flex items-center gap-2"
            onClick={() => setLocationDropdown(!locationDropdown)}
          >
            <GoLocation />
            <span>{selectedLocation}</span>
            <FiChevronDown />
            {locationDropdown && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-full">
                {locations.map((location, index) => (
                  <p
                    key={index}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div
            className="cursor-pointer text-gray-400 text-base font-medium flex items-center gap-2"
            onClick={() => setLanguageDropdown(!languageDropdown)}
          >
            <TfiWorld />
            <span>{selectedLanguage}</span>
            <FiChevronDown />
            {languageDropdown && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 w-full">
                {languages.map((language) => (
                  <p
                    key={language.code}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language.name}
                  </p>
                ))}
              </div>
            )}
          </div>

        
        </div>
      </motion.div>
    </div>
  );
};

export default MobileSidebar;
