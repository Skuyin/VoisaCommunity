"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const MenuLinks = [
  {
    nama: "Beranda",
    link: "#",
    menuColor: "#FF008C",
  },
  {
    nama: "Aktivitas",
    link: "#",
    menuColor: "#D309E1",
  },
  {
    nama: "About",
    link: "#",
    menuColor: "#9C1AFF",
  },
  {
    nama: "Learderboard",
    link: "#",
    menuColor: "#7700FF",
  },
  {
    nama: "Contact",
    link: "#",
    menuColor: "#4400FF",
  },
];

// Variants for animations
const sidebarVariants = {
  open: {
    clipPath: `circle(1400px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: `circle(24px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: { y: { stiffness: 1000 } },
  },
};

const NavigationVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Path = (props) => {
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen bg-gradient-to-b flex justify-center items-center overflow-hidden">
      <motion.nav
        className=" fixed top-0 left-0 bottom-0 w-72"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {/* Sidebar Background */}
        <motion.div className="absolute top-0 left-0 bottom-0 w-72 bg-white" />

        {/* Navigation Items */}
        <motion.ul
          className="absolute top-24 left-10 w-56"
          variants={NavigationVariants}
        >
          {MenuLinks.map((i) => (
            <motion.li
              key={i.menuColor}
              className="flex items-center mb-5 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-2xl" style={{ color: i.menuColor }}>{i.nama}</h1>
            </motion.li>
          ))}
          
        </motion.ul>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 left-4 w-12 h-12 rounded-full bg-transparent flex items-center  justify-center"
        >
          <svg width="23" height="23" viewBox="0 0 23 23">
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <motion.path
              d="M 2 9.423 L 20 9.423"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              fill="transparent"
              strokeWidth="3"
              stroke="hsl(0, 0%, 18%)"
              strokeLinecap="round"
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </svg>
        </button>
      </motion.nav>
    </div>
  );
}
