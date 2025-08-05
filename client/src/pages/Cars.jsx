" use client";
import React, { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Cars = () => {
  //getting search params from url

  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  const { cars, axios } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const [filteredCars, setFilteredCars] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = async () => {
    if (input === "") {
      setFilteredCars(cars);
      return null;
    }
    const filtered = cars.slice().filter(
      (car) =>
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase()) ||
        car.fuel_type.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const searchCarAvailablity = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/bookings/check-availability", {
        pickupDate,
        returnDate,
        location: pickupLocation,
      });
      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast.error("No cars available for the selected dates and location.");
        }
      }
    } catch (error) {
      toast.error("Error checking car availability");
    } finally {
      setIsLoading(false);
    }
    return null;
  };
  
  useEffect(() => {
    isSearchData && searchCarAvailablity();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilters();
  }, [input, cars]);

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const searchBarVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col items-center py-20 bg-light max-md:px-4"
        variants={titleVariants}
      >
        <Title
          title="Available Cars"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
        <motion.div 
          className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow"
          variants={searchBarVariants}
          whileHover={{ 
            boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
            scale: 1.02
          }}
          whileFocus={{ 
            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
            scale: 1.02
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={assets.search_icon}
            alt="search"
            className="w-4.5 h-4.5 mr-2"
            animate={{ rotate: input ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full h-full outline-none text-gray-500"
            placeholder="Search by car name, model, and category"
          />
          <motion.img
            src={assets.filter_icon}
            alt="search"
            className="w-4.5 h-4.5 ml-2"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10"
        variants={containerVariants}
      >
        <motion.p 
          className="text-gray-500 xl:px-20 max-w-7xl mx-auto"
          variants={titleVariants}
        >
          Showing {filteredCars.length} Cars
        </motion.p>
        
        {isLoading ? (
          <motion.div 
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto"
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredCars.map((car, index) => (
                <motion.div 
                  key={car._id || index}
                  variants={cardVariants}
                  layout
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!isLoading && filteredCars.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚗
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No cars found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new vehicles.
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cars;
