import React, { useState, useEffect, useRef } from "react";
import { TfiWorld } from "react-icons/tfi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { GoLocation } from "react-icons/go"; // Location icon
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../../pages/login/Login";
import MobileSidebar from "./MobileSidebar/MobileSidebar";
import useAuthStore from "../../stores";
import Avatar from "../../assets/icons/avatar.jpg";
import { toast } from "react-toastify";
import { Axios } from "../../config";
import requests from "../../libs/request";

const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, removeAuthUser } = useAuthStore();
  const [active, setActive] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedLocation, setSelectedLocation] = useState("Select Location"); // State for location
  const [locationDropdown, setLocationDropdown] = useState(false); // Location dropdown state
  const { pathname } = useLocation();
  const [loginModal, setLoginModal] = useState(false);
  const modalRef = useRef(null);

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
    "Bhubneswar",
    "Cuttack",
    "Rourkela",
    "Berhampur",
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setOpenDrop(false);
        setLanguageDropdown(false);
        setLocationDropdown(false); // Close location dropdown on outside click
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const backgroundChange = () => {
      window.scrollY > 0 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", backgroundChange);
    return () => {
      window.removeEventListener("scroll", backgroundChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await Axios.post(requests.logout);
      removeAuthUser();
      toast.success("Logout Successfully", {
        position: "bottom-right",
        toastId: 1,
        autoClose: 1000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setLanguageDropdown(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationDropdown(false);
  };

  const slideRight = () => {
    let slider = document.getElementById("navSlider");
    let maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft < maxScrollLeft) {
      slider.scrollLeft += 400;
    } else {
      slider.scrollLeft = 0;
    }
  };

  return (
    <header
      className={`flex items-center justify-center w-full flex-col text-white fixed top-0 transition-all ease-in-out z-20 ${
        active || pathname !== "/" ? "bg-white !text-darkColor" : ""
      }`}
    >
      <div className="contain w-full">
        <div className="w-full flex items-center justify-between py-4 relative">
          <MobileSidebar
            show={showLink}
            setShow={setShowLink}
            setLoginModal={setLoginModal}
          />

          <div className="flex items-center justify-center gap-2 flex-grow">
            <span onClick={() => setShowLink(true)} className="lg:hidden mt-1">
              <FaBars size={25} />
            </span>
            <Link
              to="/"
              className="text-4xl select-none font-black tracking-tighter"
            >
              <span>JUSTI</span>
              <span className="text-[#17548F]">CO.</span>
            </Link>
          </div>

          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-7 mx-auto">
              <Link to="/" className="cursor-pointer hidden lg:flex">
                Justico. Business
              </Link>
              <div className="cursor-pointer hidden lg:flex">Explore</div>

              {/* Location Dropdown */}
              <div
                className="relative cursor-pointer hidden lg:flex items-center gap-2"
                onClick={() => setLocationDropdown(!locationDropdown)}
              >
                <GoLocation />
                <span>{selectedLocation}</span>
                <FiChevronDown />
                {locationDropdown && (
                  <div
                    className="absolute top-10 left-0 bg-white text-black shadow-lg rounded-md w-40"
                    ref={modalRef}
                  >
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleLocationSelect(location)}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Dropdown */}
              <div
                className="relative cursor-pointer hidden lg:flex items-center gap-2"
                onClick={() => setLanguageDropdown(!languageDropdown)}
              >
                <TfiWorld />
                <span>{selectedLanguage}</span>
                <FiChevronDown />
                {languageDropdown && (
                  <div
                    className="absolute top-10 left-0 bg-white text-black shadow-lg rounded-md w-40"
                    ref={modalRef}
                  >
                    {languages.map((language) => (
                      <div
                        key={language.code}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleLanguageSelect(language)}
                      >
                        {language.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {authUser ? (
                <div
                  className="relative flex items-center gap-4 cursor-pointer"
                  onClick={() => setOpenDrop(!openDrop)}
                >
                  <img
                    src={authUser.img || Avatar}
                    alt="user_image"
                    className="w-[32px] h-[32px] rounded-full object-cover"
                  />
                  <span>{authUser?.username}</span>
                  <div
                    ref={modalRef}
                    className={`absolute top-12 right-0 p-3 z-10 bg-white border rounded-md text-black flex-col items-start gap-3 w-[200px] font-medium transition-transform duration-300 ${
                      openDrop ? "flex" : "hidden"
                    }`}
                  >
                    <NavLink to="/orders" className="w-full text-sm">
                      Orders
                    </NavLink>
                    <NavLink to="/messages" className="w-full text-sm">
                      Messages
                    </NavLink>
                    <div onClick={handleLogout} className="w-full text-sm">
                      Logout
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    onClick={() => {
                      navigate("/");
                      setLoginModal(true);
                    }}
                    className="cursor-pointer hidden sm:flex"
                  >
                    Sign in
                  </div>
                  <NavLink
                    to="/join"
                    className="border py-2 px-5 rounded hover:bg-primary hover:border-primary transition duration-300 text-sm font-semibold"
                  >
                    Join
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div
        className={`w-full transition-all duration-300 border-b ${
          active || pathname !== "/" ? "flex" : "hidden"
        }`}
      >
        <hr className="border-black" />
        <div className="contain relative">
          <div
            id="navSlider"
            className="w-full whitespace-nowrap scroll-smooth lg:flex items-center justify-between py-3 overflow-x-auto gap-5 font-medium text-sm"
          >
            {[
              "Advocates",
              "Notaries",
              "Mediators",
              "Arbitrator",
              "Document Writer",
            ].map((item, i) => (
              <span key={i} className="hover:border-b-2 mx-4 border-primary">
                {item}
              </span>
            ))}
          </div>
          <span onClick={slideRight} className="absolute top-3 -right-8 cursor-pointer">
            <FiChevronRight size={20} />
          </span>
        </div>
      </div>

      <Login show={loginModal} setShow={setLoginModal} />
    </header>
  );
};

export default Navbar;
