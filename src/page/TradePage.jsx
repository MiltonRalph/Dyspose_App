import React from "react";
import { Link } from "react-router-dom";
import { BiCart, BiStore } from "react-icons/bi";

const TradePage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-gray-50 min-h-screen md:p-8 lg:mb-0">
      {/* Header Section */}
      <div className="text-center mb-8 m-1">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Trade Waste</h1>
        <p className="text-gray-600 text-lg">
          Choose whether you want to <span className="font-semibold text-green-700">Buy</span> or <span className="font-semibold text-green-700">Sell</span> waste.
        </p>
      </div>

      {/* Options Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 w-full max-w-4xl">
        {/* Buy Waste Card */}
        <Link
          to="/buy"
          className="group flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 border-2 border-gray-200 hover:border-green-700 hover:shadow-xl transition duration-300"
        >
          <BiCart className="text-green-700 text-6xl group-hover:scale-110 transition duration-300" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-green-700 transition">
            Buy Waste
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Browse a wide range of available waste products ready for recycling or reuse.
          </p>
        </Link>

        {/* Sell Waste Card */}
        <Link
          to="/sell"
          className="group flex flex-col justify-center items-center bg-white shadow-lg rounded-lg p-8 border-2 border-gray-200 hover:border-green-700 hover:shadow-xl transition duration-300"
        >
          <BiStore className="text-green-700 text-6xl group-hover:scale-110 transition duration-300" />
          <h2 className="text-2xl font-bold text-gray-800 mt-4 group-hover:text-green-700 transition">
            Sell Waste
          </h2>
          <p className="text-gray-600 text-center mt-2">
            List your waste products for others to buy. Help the environment while earning money!
          </p>
        </Link>
      </div>

      {/* Decorative Section */}
      <div className="mt-12 text-center m-2">
        <h3 className="text-xl font-semibold text-gray-700">
          Making the world greener, one trade at a time!
        </h3>
        <p className="text-gray-600 mt-2">
          Join our community and take part in the recycling revolution.
        </p>
      </div>
    </div>
  );
};

export default TradePage;
