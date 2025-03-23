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

  // Fungsi untuk scroll ke bagian tertentu
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setShowMobileMenu(false); // Tutup mobile menu setelah klik
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
    <nav
      className={`fixed top-0 left-0 w-full bg-blue-900 z-50 transition-transform duration-300 shadow-md ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">
        {/* Logo */}
        <img src={assets.logo} alt="logo" className="w-24 md:w-32" />

        {/* Menu Desktop */}
        <ul className="items-center hidden gap-6 text-white md:flex">
          <Link
            to="/#header"
            onClick={() => handleScrollToSection("header")}
            className="hover:text-blue-300"
          >
            Home
          </Link>
          <Link
            to="/#about"
            onClick={() => handleScrollToSection("about")}
            className="hover:text-blue-300"
          >
            About
          </Link>
          <Link
            to="/#projects"
            onClick={() => handleScrollToSection("projects")}
            className="hover:text-blue-300"
          >
            Projects
          </Link>
          <Link
            to="/#testimonials"
            onClick={() => handleScrollToSection("testimonials")}
            className="hover:text-blue-300"
          >
            Testimonials
          </Link>
          <Link
            to="/list-users"
            onClick={handleListUsersClick}
            className="bg-transparent border-none hover:text-blue-300"
          >
            List Users
          </Link>
        </ul>

        {/* Tombol Login / Logout */}
        <div className="items-center hidden gap-4 md:flex">
          {isAuthenticated ? (
            <Link
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-500"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-gray-900 rounded-full hover:bg-gray-600"
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
        <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-screen text-white bg-blue-900 md:hidden">
          <button
            className="absolute text-xl text-white top-6 right-6"
            onClick={() => setShowMobileMenu(false)}
          >
            ✕
          </button>
          <ul className="flex flex-col items-center gap-6 text-lg font-medium">
            <Link
              to="/"
              onClick={() => {
                handleScrollToSection("home");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-300"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={() => {
                handleScrollToSection("about");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-300"
            >
              About
            </Link>
            <Link
              to="/#projects"
              onClick={() => {
                handleScrollToSection("projects");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-300"
            >
              Projects
            </Link>
            <Link
              to="/#testimonials"
              onClick={() => {
                handleScrollToSection("testimonials");
                setShowMobileMenu(false);
              }}
              className="hover:text-blue-300"
            >
              Testimonials
            </Link>
            <button
              onClick={(e) => {
                handleListUsersClick(e);
                setShowMobileMenu(false);
              }}
              className="bg-transparent border-none hover:text-blue-300"
            >
              List Users
            </button>

            {/* Tombol Login/Logout di Mobile */}
            {isAuthenticated ? (
              <button
                to="/login"
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="w-40 px-6 py-2 bg-red-500 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                <Link
                  to="/register"
                  onClick={() => setShowMobileMenu(false)}
                  className="w-40 px-6 py-2 text-center bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setShowMobileMenu(false)}
                  className="w-40 px-6 py-2 text-center bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  Login
                </Link>
              </div>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
