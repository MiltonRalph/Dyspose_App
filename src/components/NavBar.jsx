import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BiChart, BiHome, BiMoney, BiScan, BiUser } from "react-icons/bi";

import logo from "../assets/logo.png"; // Update the logo path as needed

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Navbar for large screens */}
      <nav className="hidden lg:flex sticky top-0 z-50 mx-auto max-w-8xl px-6 py-4 bg-gray-50 shadow-md">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <span className="ml-2 text-xl font-semibold text-green-700">Dyspose</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 ml-auto">
          <Link
            to="/dashboard"
            className={`px-3 py-2 text-lg font-medium ${
              pathname === "/dashboard" ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/trade"
            className={`px-3 py-2 text-lg font-medium ${
              pathname === "/trade" || pathname === "/buy" || pathname === "/sell" ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }`}
          >
            Trade Wastes
          </Link>
          <Link
            to="/scan-waste"
            className={`px-3 py-2 text-lg font-medium ${
              pathname === "/scan-waste" ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }`}
          >
            Scan Waste
          </Link>
          <Link
            to="/coupons"
            className={`px-3 py-2 text-lg font-medium ${
              pathname === "/coupons" ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }`}
          >
            Coupons
          </Link>
          <Link
            to="/profile"
            className={`px-3 py-2 text-lg font-medium ${
              pathname === "/profile" ? "text-green-700 border-b-2 border-green-700" : "text-gray-600 hover:text-green-700"
            }`}
          >
            Profile
          </Link>
        </div>
      </nav>

      {/* Navbar for small screens */}
      <nav className="lg:hidden fixed z-50 bottom-0 m-auto max-w-[800px] left-0 right-0 bg-white w-full shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Link to="/dashboard" className="flex flex-col items-center">
            <BiHome size={24} className={`${pathname === "/dashboard" ? "text-green-700" : "text-gray-600"}`} />
            <span className={`${pathname === "/dashboard" ? "text-green-700 text-xs font-medium" : "text-gray-600 text-xs font-medium"}`}>Home</span>
          </Link>
          <Link to="/trade" className="flex flex-col items-center">
            <BiChart size={24} className={`${pathname === "/trade" || pathname === "/buy" || pathname === "/sell" ? "text-green-700" : "text-gray-600"}`} />
            <span className={`${pathname === "/trade" || pathname === "/buy" || pathname === "/sell" ? "text-green-700 text-xs font-medium" : "text-gray-600 text-xs font-medium"}`}>Trade Waste</span>
          </Link>
          <Link to="/scan-waste" className="flex flex-col items-center">
            <BiScan size={24} className={`${pathname === "/scan-waste" ? "text-green-700" : "text-gray-600"}`} />
            <span className={`${pathname === "/scan-waste" ? "text-green-700 text-xs font-medium" : "text-gray-600 text-xs font-medium"}`}>Scan Waste</span>
          </Link>
          <Link to="/coupons" className="flex flex-col items-center">
            <BiMoney size={24} className={`${pathname === "/coupons" ? "text-green-700" : "text-gray-600"}`} />
            <span className={`${pathname === "/coupons" ? "text-green-700 text-xs font-medium" : "text-gray-600 text-xs font-medium"}`}>Coupons</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center">
            <BiUser size={24} className={`${pathname === "/profile" ? "text-green-700" : "text-gray-600"}`} />
            <span className={`${pathname === "/profile" ? "text-green-700 text-xs font-medium" : "text-gray-600 text-xs font-medium"}`}>Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
