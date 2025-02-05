import React, { useState } from "react";
import { motion } from "motion/react";

const AccordionMotion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      title: "1. Apa itu Discord",
      content:
        "Discord adalah aplikasi komunikasi untuk obrolan teks, suara, dan video yang dirancang untuk membangun komunitas secara online. Awalnya populer di kalangan pemain game, namun kini digunakan oleh berbagai kelompok untuk berbincang, berbagi konten, dan berkolaborasi. Pengguna discord dapat membuat atau bergabung dengan server komunitas untuk berinteraksi. Aplikasi ini dapat diunduh di Play Store (Android), App Store (iOS), atau di discord.com untuk desktop. Discord dapat dibuka di perangkat Android, iOS, dan komputer (Windows, macOS, Linux), serta melalui browser. Lebih lanjut dapat mengujungi situs resmi Discord apps",
      image:
        "https://images.unsplash.com/photo-1679057001914-59ab4131dfff?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Foto 2 - Mountain",
      content:
        "Gunung adalah tempat yang luar biasa untuk petualangan dan eksplorasi.",
      image: "https://via.placeholder.com/200x200/8c9eff/333333?text=Mountain",
    },
    {
      title: "Foto 3 - Forest",
      content: "Hutan menyediakan ketenangan dan kedamaian, serta udara segar.",
      image: "https://via.placeholder.com/200x200/7eff7f/333333?text=Forest",
    },
  ];

  return (
    <div className="mt-5">
      {items.map((item, index) => (
        <div key={index} className=" overflow-hidden text-black">
          <button
            onClick={() => handleToggle(index)}
            className="w-full text-left flex items-center justify-between  py-2 text-4xl font-semibold border-b-2 border-black focus:outline-none"
          >
            <span className="text-lg lg:text-4xl font-bold">{item.title}</span>
            <span className="text-lg lg:text-4xl font-bold">
              {activeIndex === index ? "−" : "+"}
            </span>
          </button>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0,
              height: activeIndex === index ? "auto" : 0,
            }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-2">
              <motion.img
                src={item.image}
                alt={item.title}
                className=" h-52  object-cover mb-4 rounded-lg"
              />
              <p>{item.content}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMotion;
