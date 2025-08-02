import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Circle, ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full p-5 shadow-2xl cursor-pointer group border-4 border-gray-700 hover:border-primary/50"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          transition={{ 
            duration: 0.4, 
            ease: "easeOut",
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.4), 0px 0px 30px rgba(59, 130, 246, 0.4)",
            rotate: [0, -10, 10, 0],
            y: -8
          }}
          whileTap={{ 
            scale: 0.85,
            rotate: [0, 8, -8, 0],
            y: 0
          }}
        >
          {/* Steering Wheel Design */}
          <div className="relative w-8 h-8">
            {/* Outer Steering Wheel Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-3 border-gray-400"
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            {/* Inner Steering Wheel Ring */}
            <motion.div
              className="absolute inset-1 rounded-full border-2 border-gray-300"
              animate={{ 
                rotate: [0, -360]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            {/* Center Hub */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-400"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Steering Wheel Icon */}
            <motion.div
              className="absolute inset-3 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Circle 
                size={16} 
                className="text-primary drop-shadow-lg"
                fill="currentColor"
              />
            </motion.div>
            
            {/* Steering Wheel Spokes */}
            {[0, 90, 180, 270].map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-gray-400 rounded-full origin-bottom"
                style={{ 
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-4px)`
                }}
                animate={{ 
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
            ))}
            
            {/* Center Arrow */}
            <motion.div
              className="absolute inset-4 flex items-center justify-center"
              animate={{ 
                y: [0, -2, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <ChevronUp 
                size={12} 
                className="text-primary font-bold drop-shadow-lg"
              />
            </motion.div>
            
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          {/* Enhanced Hover Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 pointer-events-none font-medium border border-gray-600 shadow-xl"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Circle size={14} className="text-primary" fill="currentColor" />
              Back to Top
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
          
          {/* Enhanced Pulse Ring Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/40"
            animate={{ 
              scale: [1, 1.6, 1],
              opacity: [0.4, 0, 0.4]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
          
          {/* Second Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ 
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeOut",
              delay: 0.5
            }}
          />
          
          {/* Click Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ 
              scale: [0, 1.8, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/5"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 