"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
        <div className="text-xl font-bold">Voisa Community</div>

        <button
          className="lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="lg:flex hidden space-x-6">
          <ThemeSwitcher />
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Services
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="fixed inset-y-0 right-0 w-64 bg-blue-600 text-white shadow-lg z-50 lg:hidden"
        >
          <div className="flex flex-col h-full p-4">
            <button
              className="self-end mb-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
            <a href="#" className="py-2 hover:underline">
              Home
            </a>
            <a href="#" className="py-2 hover:underline">
              Services
            </a>
            <a href="#" className="py-2 hover:underline">
              About
            </a>
            <a href="#" className="py-2 hover:underline">
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
