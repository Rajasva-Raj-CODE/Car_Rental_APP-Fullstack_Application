import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, setIsOwner, axios } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = async () =>{
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if(data.success){
        setIsOwner(true);
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.8 
      }}
      className={`flex justify-between items-center py-3 px-4 md:px-8 lg:px-12 xl:px-16 text-gray-600 border-b border-borderColor relative transition-all ${
        location.pathname === "/" && "bg-light"
      }`}
    >
      {/* Logo with smooth hover effect */}
      <Link to="/">
        <motion.img
          whileHover={{ 
            scale: 1.05,
            filter: "brightness(1.1)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10 
          }}
          src={assets.logo} 
          alt="logo" 
          className="h-8" 
        />
      </Link>

      {/* Desktop Navigation */}
      <motion.div
        className="hidden sm:flex items-center gap-6"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          ease: "easeOut"
        }}
      >
        {menuLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.3 + index * 0.1,
              ease: "easeOut"
            }}
          >
            <Link
              to={link.path}
              className="relative group transition-colors duration-300 hover:text-primary focus:text-primary active:text-primary font-medium"
            >
              {link.name}
              <motion.span 
                className="absolute left-0 -bottom-1 h-0.5 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut"
                }}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="hidden lg:flex items-center gap-2 border border-borderColor px-3 rounded-full max-w-48 hover:border-primary transition-colors duration-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.4,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
        }}
        whileFocusWithin={{
          scale: 1.02,
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)"
        }}
      >
        <input
          type="text"
          className="py-1.5 w-full bg-transparent outline-none placeholder:text-gray-500 text-sm"
          placeholder="Search Products"
        />
        <motion.img 
          src={assets.search_icon} 
          alt="search"
          whileHover={{ 
            scale: 1.1,
            rotate: 5
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10 
          }}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        className="hidden sm:flex items-center gap-4"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        <motion.button 
          onClick={() => isOwner ? navigate("/owner"): changeRole()} 
          className="cursor-pointer font-medium hover:text-primary transition-colors duration-300 relative overflow-hidden px-3 py-1"
          whileHover={{ 
            scale: 1.02,
            y: -2
          }}
          whileTap={{ scale: 0.98 }}
        >
          {isOwner ? "Dashboard" : "List Cars"}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        <motion.button
          onClick={() => {
            user ? logout() : setShowLogin(true)
          }}
          className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg font-medium relative overflow-hidden text-sm"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="relative z-10"
            initial={{ color: "#ffffff" }}
            whileHover={{ color: "#ffffff" }}
          >
            {user ? "Logout" : "Login"}
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-white opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        className="sm:hidden cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}
      >
        <motion.img 
          src={open ? assets.close_icon : assets.menu_icon} 
          alt="menu"
          animate={{ 
            rotate: open ? 180 : 0,
            scale: open ? 1.1 : 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300,
              duration: 0.5
            }}
            className={`fixed top-16 right-0 h-screen w-80 max-w-[85vw] z-50 flex flex-col p-6 gap-6 ${
              location.pathname === "/" ? "bg-light" : "bg-white"
            } shadow-2xl border-l border-borderColor backdrop-blur-md`}
          >
            {/* Mobile Navigation Links */}
            <motion.div className="flex flex-col gap-4">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium hover:text-primary relative overflow-hidden group"
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.name}
                    </motion.span>
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-primary"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Search */}
            <motion.div 
              className="flex items-center gap-2 border border-borderColor px-3 rounded-full hover:border-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.3,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="text"
                className="py-2 w-full bg-transparent outline-none placeholder:text-gray-500"
                placeholder="Search Products"
              />
              <motion.img 
                src={assets.search_icon} 
                alt="search"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </motion.div>

            {/* Mobile Action Buttons */}
            <motion.div 
              className="flex flex-col gap-4 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4,
                ease: "easeOut"
              }}
            >
              <motion.button 
                onClick={() => {
                  isOwner ? navigate("/owner") : changeRole();
                  setOpen(false);
                }} 
                className="w-full py-3 px-4 text-left rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium hover:text-primary relative overflow-hidden"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOwner ? "Dashboard" : "List Cars"}
                </motion.span>
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 bg-primary"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
              <motion.button
                onClick={() => {
                  user ? logout() : setShowLogin(true);
                  setOpen(false);
                }}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg font-medium relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {user ? "Logout" : "Login"}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
