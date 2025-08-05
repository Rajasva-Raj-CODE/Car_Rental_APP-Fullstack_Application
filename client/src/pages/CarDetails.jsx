"use client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, returnDate, setPickupDate, setReturnDate } =
    useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        console.log("error",data);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setCar(cars.find((car) => car._id === id));
  }, [cars, id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return car ? (
    <motion.div 
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer hover:text-primary transition-colors duration-300"
        onClick={() => navigate(-1)}
        type="button"
        variants={itemVariants}
        whileHover={{ 
          x: -5,
          scale: 1.02
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img 
          src={assets.arrow_icon} 
          alt="" 
          className="rotate-180 opacity-65"
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        Back to all cars
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/*left car Image & details*/}
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <motion.img
            src={car.image}
            alt=""
            className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
            variants={imageVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {car.brand} {car.model}
              </motion.h1>
              <motion.p 
                className="text-gray-500 text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {car.category} • {car.year}
              </motion.p>
            </motion.div>
            <motion.hr 
              className="border-borderColor my-6" 
              variants={itemVariants}
            />
            <motion.div 
              className="grid sm:grid-cols-4 grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
              ].map(({ icon, text }, index) => (
                <motion.div
                  key={text}
                  className="flex flex-col items-center bg-light p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img 
                    src={icon} 
                    alt="icon" 
                    className="mb-5 h-5"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  {text}
                </motion.div>
              ))}
            </motion.div>
            {/*description*/}
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-xl font-medium mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Description
              </motion.h1>
              <motion.p 
                className="text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {car.description}
              </motion.p>
            </motion.div>
            {/*Features*/}
            <motion.div variants={itemVariants}>
              <motion.h1 
                className="text-xl font-medium mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Features
              </motion.h1>
              <motion.ul 
                className="grid sm:grid-cols-2 grid-cols-1 gap-2"
                variants={containerVariants}
              >
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Camera",
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center text-gray-500 hover:text-primary transition-colors duration-300"
                    variants={featureVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.img
                      src={assets.check_icon}
                      alt="check"
                      className="h-4 mr-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
        {/*right booking form*/}
        <motion.form
          onSubmit={handleSubmit}
          className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 bg-white"
          variants={formVariants}
          whileHover={{ 
            boxShadow: "0px 25px 50px rgba(0,0,0,0.15)",
            y: -5
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.p 
            className="flex items-center justify-between text-2xl text-gray-800 font-semibold"
            variants={itemVariants}
          >
            {currency} {car.pricePerDay}{" "}
            <span className="text-base text-gray-400 font-normal">Per day</span>
          </motion.p>
          <motion.hr 
            className="border-borderColor my-6" 
            variants={itemVariants}
          />

          <motion.div 
            className="flex flex-col gap-2"
            variants={itemVariants}
          >
            <label htmlFor="pickup-date">Pickup Date</label>
            <motion.input
              type="date"
              onChange={(e) => setPickupDate(e.target.value)}
              value={pickupDate}
              id="pickup-date"
              className="border border-borderColor px-3 py-2 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
              required
              min={new Date().toISOString().split("T")[0]}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>

          <motion.div 
            className="flex flex-col gap-2"
            variants={itemVariants}
          >
            <label htmlFor="return-date">Return Date</label>
            <motion.input
              type="date"
              onChange={(e) => setReturnDate(e.target.value)}
              value={returnDate}
              id="return-date"
              className="border border-borderColor px-3 py-2 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
              required
              min={new Date().toISOString().split("T")[0]}
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
          
          <motion.button 
            className="w-full bg-primary text-white py-3 rounded-xl hover:bg-primary-dull transition-all font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </motion.div>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Book Now
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.p 
            className="text-sm text-center text-gray-500"
            variants={itemVariants}
          >
            No credit card required to reserve
          </motion.p>
        </motion.form>
      </div>
    </motion.div>
  ) : (
    <Loader />
  );
};

export default CarDetails;
