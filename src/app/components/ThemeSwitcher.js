// "use client";

// import { useEffect, useState } from "react";

// export default function ThemeSwitcher() {
//   const [theme, setTheme] = useState("light");

//   useEffect(() => {
//     // Cek dan set tema dari localStorage atau preferensi sistem
//     const savedTheme = localStorage.getItem("theme") || "light";
//     if (savedTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     setTheme(savedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);

//     if (newTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   return (
//     <button
//       className="flex items-center w-14 h-7 mr-2 bg-gray-300 dark:bg-gray-700 rounded-full p-2 cursor-pointer"
//       onClick={toggleTheme}
//     >
 
 
//       {/* Handle toggle */}
//       <div
//         className={`w-5 h-5  bg-purple-600 dark:bg-purple-300 rounded-full transition-all duration-300 ease-in-out`}
//         style={{
//           transform: theme === "light" ? "translateX(0)" : "translateX(100%)",
//         }}
//       />
//     </button>
//   );
// }
