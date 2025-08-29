import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const hasToken = localStorage.getItem("token");

  return (
    <header className="lg:px-16 px-4 bg-blue-900 flex flex-wrap items-center py-4 shadow-lg sticky top-0 z-50">
      <div className="flex-1 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/573/624/original/map-pointer-gps-icon-vector.jpg"
            alt="Pothole Reporter Logo"
            className="h-8 w-8 object-contain"
          />
          <Link
            to="/"
            className="text-xl font-bold text-white hover:text-amber-400 transition-colors"
          >
            Pothole Reporter
          </Link>
        </div>
      </div>

      <label htmlFor="menu-toggle" className="pointer-cursor md:hidden block">
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden md:flex md:items-center md:w-auto w-full"
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
            <li>
              <Link
                to="/about"
                className="md:p-4 py-3 px-0 block hover:text-amber-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/report"
                className="md:p-4 py-3 px-0 block hover:text-amber-400 transition-colors"
              >
                Report
              </Link>
            </li>
            <li>
              <Link
                to="/potholes"
                className="md:p-4 py-3 px-0 block hover:text-amber-400 transition-colors"
              >
                Potholes
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="md:p-4 py-3 px-0 block hover:text-amber-400 transition-colors"
              >
                Feedback
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="md:p-4 py-3 px-0 block md:mb-0 mb-2 hover:text-amber-400 transition-colors"
              >
                Contact
              </Link>
            </li>
            {!hasToken && (
              <li>
                <Link
                  to="/login"
                  className="ml-4 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
