import React from "react";
import { motion } from "motion/react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      address: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "Booking a car was super easy and the vehicle was in perfect condition. It made exploring the city stress-free and enjoyable. Highly recommended!",
    },
    {
      name: "Liam Johnson",
      address: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "Great service! The pickup and return process was smooth, and the car was clean and fuel-efficient. I'll definitely use this service again on my next trip.",
    },
    {
      name: "Sophia Lee",
      address: "Seoul, South Korea",
      image: assets.testimonial_image_1,
      testimonial:
        "Excellent car rental experience. The team was friendly and the rates were very reasonable. It made my travel across the city hassle-free!",
    },
  ];

  // Animation variants for staggered cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="py-28 px-6 md:px-16 lg:px-24 xl:px-44"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Title
          title="Testimonials"
          subTitle="Discover why discerning travelers choose CarRental for their luxury accommodations around the world"
        />
      </motion.div>
      
      <motion.div 
        className="flex justify-center mt-18"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg cursor-pointer relative overflow-hidden"
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                scale: 1.02
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Floating background decoration */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div 
                className="flex items-center gap-3 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <motion.img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <p className="text-xl font-medium">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.address}</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-1 mt-4 relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <motion.img 
                      key={starIndex} 
                      src={assets.star_icon} 
                      alt="star"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.8 + index * 0.1 + starIndex * 0.1 
                      }}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, 10, -10, 0]
                      }}
                    />
                  ))}
              </motion.div>
              
              <motion.p 
                className="text-gray-500 max-w-90 mt-4 font-light relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                "{testimonial.testimonial}"
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Testimonial;
