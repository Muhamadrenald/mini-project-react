import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect ke login jika mencoba akses list-users tanpa login
  useEffect(() => {
    if (location.pathname === "/list-users" && !isAuthenticated) {
      toast.error("You must be logged in to access this page!");
      navigate("/login");
    }
  }, [location, isAuthenticated, navigate]);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
  };

  // Fungsi untuk menangani klik List Users
  const handleListUsersClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/list-users");
    } else {
      toast.error("You must be logged in to access this page!");
      navigate("/login");
    }
  };

  // Deteksi Scroll untuk menyembunyikan Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } shadow-md bg-blue-900`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-10 py-4 max-w-7xl">
        {/* Logo */}
        <img src={assets.logo} alt="logo" className="w-24 md:w-32" />

        {/* Menu Desktop */}
        <ul className="hidden text-white gap-7 md:flex items-center">
          <Link to="/" className="cursor-pointer hover:text-blue-300">
            Home
          </Link>
          <Link to="/#about" className="cursor-pointer hover:text-blue-300">
            About
          </Link>
          <Link to="/#projects" className="cursor-pointer hover:text-blue-300">
            Projects
          </Link>
          <Link
            to="/#testimonials"
            className="cursor-pointer hover:text-blue-300"
          >
            Testimonials
          </Link>
          <button
            onClick={handleListUsersClick}
            className="cursor-pointer hover:text-blue-300 bg-transparent border-none"
          >
            List Users
          </button>
        </ul>

        {/* Tombol Login / Logout */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-blue-600 px-4 py-2 rounded-full text-white hover:bg-blue-500"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-900 px-4 py-2 rounded-full text-white hover:bg-gray-600"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <img
          src={assets.menu_icon}
          alt="menu icon"
          className="cursor-pointer md:hidden w-7"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-full h-screen bg-blue-900 text-white md:hidden z-50">
          <div className="flex justify-end p-6 cursor-pointer">
            <img
              src={assets.cross_icon}
              alt="close icon"
              className="w-6"
              onClick={() => setShowMobileMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium">
            <Link
              to="/"
              onClick={() => setShowMobileMenu(false)}
              className="hover:text-blue-300"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={() => setShowMobileMenu(false)}
              className="hover:text-blue-300"
            >
              About
            </Link>
            <Link
              to="/#projects"
              onClick={() => setShowMobileMenu(false)}
              className="hover:text-blue-300"
            >
              Projects
            </Link>
            <Link
              to="/#testimonials"
              onClick={() => setShowMobileMenu(false)}
              className="hover:text-blue-300"
            >
              Testimonials
            </Link>
            <button
              onClick={(e) => {
                handleListUsersClick(e);
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-300 bg-transparent border-none"
            >
              List Users
            </button>

            {/* Tombol Login/Logout di Mobile */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="bg-red-500 px-6 py-2 w-40 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <button className="px-6 py-2 w-40 bg-blue-500 rounded-full hover:bg-blue-600">
                  <Link to="/register" onClick={() => setShowMobileMenu(false)}>
                    Sign Up
                  </Link>
                </button>
                <button className="px-6 py-2 w-40 bg-gray-700 rounded-full hover:bg-gray-600">
                  <Link to="/login" onClick={() => setShowMobileMenu(false)}>
                    Login
                  </Link>
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
