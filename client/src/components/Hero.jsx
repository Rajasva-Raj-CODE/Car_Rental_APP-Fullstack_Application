import React, { useState } from "react";
import { motion } from "motion/react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } =
    useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center overflow-hidden">
      {/* Animated Title */}
      <motion.h1 
        className="text-5xl md:text-5xl font-semibold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
        >
          Luxury
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-block"
        >
          Cars
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-block"
        >
          on Rent
        </motion.span>
      </motion.h1>

      {/* Animated Search Form */}
      <motion.form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 1.0 
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0px 12px 30px rgba(0,0,0,0.15)"
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8">
          <motion.div 
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-xs text-gray-500">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <label htmlFor="pickup-date">Pick-up Date</label>
            <input
              type="date"
              id="pickupDate"
              min={new Date().toISOString().split("T")[0]}
              className="text-sm text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <label htmlFor="return-date">Return Date</label>
            <input
              type="date"
              id="return-date"
              className="text-sm text-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </motion.div>
        </div>
        
        <motion.button
          type="submit"
          className="flex gap-2 items-center justify-center px-9 py-3 max-sm:mt-4 rounded-full bg-primary hover:bg-primary-dull cursor-pointer text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={assets.search_icon}
            alt="search"
            className="brightness-300"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          Search
        </motion.button>
      </motion.form>

      {/* Animated Car Image */}
      <motion.img 
        src={assets.main_car} 
        alt="car" 
        className="max-h-74"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut",
          delay: 2.0 
        }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5
        }}
      />
    </div>
  );
};

export default Hero;
