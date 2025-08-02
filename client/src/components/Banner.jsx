import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-start items-center justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="text-white"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2 
          className="text-3xl font-medium"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Do You Own a Luxury Car?
        </motion.h2>
        
        <motion.p 
          className="mt-2"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Monetize your vehicle effortlessly by listing it on CarRental.
        </motion.p>
        
        <motion.p 
          className="max-w-130"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          We take care of insurance, driver verification and secure payments -
          so you can earn passive income stress-free.
        </motion.p>
        
        <motion.button
          className="px-6 py-2 bg-white hover:bg-slate-100 transition-all text-primary rounded-lg text-sm mt-4 cursor-pointer font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          List Your Car
        </motion.button>
      </motion.div>
      
      <motion.img 
        src={assets.banner_car_image} 
        alt="car" 
        className="max-h-45 mt-10"
        initial={{ opacity: 0, x: 50, rotateY: -15 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.0, delay: 0.3 }}
                animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 2, 0]
        }}
      />
    </motion.div>
  );
};

export default Banner;
