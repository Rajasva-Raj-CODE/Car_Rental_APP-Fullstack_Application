import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user, axios, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/booking/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    user && fetchBookings();
  }, [user]);

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

  const bookingCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
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

  const statusVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={titleVariants}>
        <Title
          title="My Bookings"
          subTitle="Manage and track your vehicle bookings."
          align="left"
        />
      </motion.div>
      
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
        <motion.div variants={containerVariants}>
          <AnimatePresence mode="wait">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 hover:shadow-lg transition-all duration-300 bg-white"
                variants={bookingCardVariants}
                layout
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 15px 35px rgba(0,0,0,0.1)",
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/*car Image & details*/}
                <motion.div 
                  className="md:col-span-1"
                  variants={statusVariants}
                >
                  <motion.div 
                    className="rounded-md overflow-hidden mb-3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={booking.car.image}
                      alt=""
                      className="w-full h-auto aspect-video object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  <motion.p 
                    className="text-lg font-medium mt-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {booking.car.brand} {booking.car.model}
                  </motion.p>

                  <motion.p 
                    className="text-gray-500"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {booking.car.year} • {booking.car.category} •{" "}
                    {booking.car.location}
                  </motion.p>
                </motion.div>
                
                {/*booking details*/}
                <motion.div 
                  className="md:col-span-2"
                  variants={statusVariants}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.p 
                      className="px-3 py-1.5 bg-light rounded"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      Booking #{index + 1}
                    </motion.p>
                    <motion.p
                      className={`px-3 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? " bg-green-400/15 text-green-600"
                          : " bg-red-400/15 text-red-600"
                      } `}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {booking.status}
                    </motion.p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-2 mt-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <p className="text-gray-500">Rental Period</p>
                      <p>
                        {booking.pickupDate.split("T")[0]} To{" "}
                        {booking.returnDate.split("T")[0]}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start gap-2 mt-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.img
                      src={assets.location_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div>
                      <p className="text-gray-500">Pick-up Location</p>
                      <p>{booking.car.location}</p>
                    </div>
                  </motion.div>
                </motion.div>

                {/*Price */}
                <motion.div 
                  className="md:col-span-1 flex flex-col justify-between gap-6"
                  variants={statusVariants}
                >
                  <motion.div 
                    className="text-sm text-gray-500 text-right"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <p>Total Price</p>
                    <motion.h1 
                      className="font-semibold text-primary text-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {currency}{booking.price}
                    </motion.h1>
                    <p>Booked on {booking.createdAt.split("T")[0]}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!isLoading && bookings.length === 0 && (
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
                📋
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-500">
                You haven't made any bookings yet. Start exploring our cars!
              </p>
              <motion.button
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dull transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/cars'}
              >
                Browse Cars
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyBookings;
