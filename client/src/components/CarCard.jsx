import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg cursor-pointer bg-white"
      whileHover={{ 
        y: -8,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={car.image}
          alt="carImage"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        {car.isAvaliable && (
          <motion.p 
            className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Available Now
          </motion.p>
        )}
        <motion.div 
          className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <span className="font-semibold">
            {currency}
            {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80">/day</span>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-4 sm:p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
              {car.brand} {car.model}
            </h3>
            <p className="text-sm text-muted-foreground">
              {car.category} • {car.year}{" "}
            </p>
          </div>
        </div>
        
        <motion.div 
          className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <img src={assets.users_icon} alt="" className="h-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <img src={assets.fuel_icon} alt="" className="h-4 mr-2" />
            <span>{car.fuel_type}</span>
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <img src={assets.car_icon} alt="" className="h-4 mr-2" />
            <span>{car.trasmission}</span>
          </motion.div>
          <motion.div 
            className="flex items-center text-sm text-muted-foreground"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <img src={assets.location_icon} alt="" className="h-4 mr-2" />
            <span>{car.location}</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CarCard;
