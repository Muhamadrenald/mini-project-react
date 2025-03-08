import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const handleListUsersClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/list-users");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="absolute top-0 left-0 z-10 w-full">
      {/* <div className="container flex items-center justify-around gap-5 px-6 py-4 mx-auto bg-transparent md:px-20 lg:px-32"> */}
      <div className="flex items-center justify-between w-full gap-5 px-6 py-4 mx-auto bg-transparent  md:px-20 lg:px-32">
        <img src={assets.logo} alt="logo" />
        <ul className="hidden text-white gap-7 md:flex">
          <Link to="/" className="cursor-pointer hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="cursor-pointer hover:text-gray-400">
            About
          </Link>
          <Link to="/projects" className="cursor-pointer hover:text-gray-400">
            Projects
          </Link>
          <Link
            to="/testimonials"
            className="cursor-pointer hover:text-gray-400"
          >
            Testimonials
          </Link>
          <button
            onClick={handleListUsersClick}
            className="bg-transparent border-none cursor-pointer hover:text-gray-400"
          >
            List Users
          </button>
        </ul>
        <div className="hidden gap-5 md:flex">
          <button className="hidden px-8 py-2 bg-white rounded-full md:block hover:bg-gray-300">
            {/* Sign up */}
            <Link to="/register">Sign Up</Link>
          </button>
          <button className="px-6 py-2 bg-white rounded-full hover:bg-gray-300">
            <Link to="/login">Login</Link>
          </button>
        </div>
        <img
          src={assets.menu_icon}
          alt="menu icon"
          className="cursor-pointer md:hidden w-7"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>
      {/* mobile menu */}
      {showMobileMenu && (
        <div className="fixed top-0 bottom-0 right-0 w-full bg-white md:hidden">
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              src={assets.cross_icon}
              alt="close icon"
              className="w-6"
              onClick={() => setShowMobileMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium">
            <Link to="/" onClick={() => setShowMobileMenu(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setShowMobileMenu(false)}>
              About
            </Link>
            <Link to="/projects" onClick={() => setShowMobileMenu(false)}>
              Projects
            </Link>
            <Link to="/testimonials" onClick={() => setShowMobileMenu(false)}>
              Testimonials
            </Link>
            <button
              onClick={(e) => {
                handleListUsersClick(e);
                setShowMobileMenu(false);
              }}
              className="bg-transparent border-none cursor-pointer hover:text-gray-400"
            >
              List Users
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
