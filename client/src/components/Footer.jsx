import React from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Footer = () => {
  // Animation variants for staggered sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
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
      className="text-gray-500 text-sm mt-60 px-6 md:px-16 lg:px-24 xl:px-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-b border-borderColor"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={sectionVariants}>
          <motion.img 
            src={assets.logo} 
            alt="logo" 
            className="h-8 md:h-9"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p 
            className="max-w-80 mt-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Reliable car rentals made easy. Whether you're exploring the city or
            heading out on a road trip, we offer affordable rates,
            well-maintained vehicles, and 24/7 customer support to keep you
            moving with confidence.
          </motion.p>

          <motion.div 
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { icon: assets.facebook_logo, name: "facebook" },
              { icon: assets.twitter_logo, name: "twitter" },
              { icon: assets.instagram_logo, name: "instagram" },
              { icon: assets.gmail_logo, name: "gmail" }
            ].map((social, index) => (
              <motion.a 
                key={social.name}
                href="#"
                whileHover={{ 
                  scale: 1.2,
                  y: -5,
                  rotate: [0, -10, 10, 0]
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-5 h-5"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <motion.h2 
            className="text-base font-medium text-gray-800 uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quick Links
          </motion.h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {["Home", "Browse Cars", "List Your Car", "About Us"].map((link, index) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <motion.a
                  href="#"
                  className="hover:underline transition-all duration-200 hover:text-primary"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <motion.h2 
            className="text-base font-medium text-gray-800 uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Resources
          </motion.h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {["Help Center", "Terms of Service", "Privacy Policy", "Insurance"].map((link, index) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <motion.a
                  href="#"
                  className="hover:underline transition-all duration-200 hover:text-primary"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <motion.h2 
            className="text-base font-medium text-gray-800 uppercase"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact
          </motion.h2>
          <motion.ul 
            className="mt-3 flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              "123 Auto Drive, Cityville, CA 90001",
              "Phone: (123) 456-7890",
              "Email: support@carrentalhub.com",
              "Hours: Mon–Sat, 9AM–6PM"
            ].map((info, index) => (
              <motion.li
                key={info}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
              >
                {info}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between py-5 border-t border-gray-200 text-sm text-gray-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.p 
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          © {new Date().getFullYear()}{" "}
          <motion.a
            href="https://rajasva.vercel.app/"
            className="font-medium text-gray-800 hover:underline transition"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              color: "#3b82f6"
            }}
            transition={{ duration: 0.3 }}
          >
            Rajasva Raj
          </motion.a>
          . All rights reserved.
        </motion.p>

        <motion.ul 
          className="flex items-center gap-4 mt-2 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((link, index) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
            >
              <motion.a 
                href="#" 
                className="hover:underline transition hover:text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {link}
              </motion.a>
              {index < 2 && (
                <motion.span 
                  className="text-gray-400 mx-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                >
                  |
                </motion.span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
