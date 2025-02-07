import React, { useState } from "react";
import { motion } from "framer-motion";

const AccordionMotion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-5 mx-auto">
      {/* Item 1: Apa itu Discord? */}
      <div className="overflow-hidden text-black">
        <button
          onClick={() => handleToggle(1)}
          className="w-full text-left flex items-center justify-between py-3 text-2xl font-semibold border-b-2 border-black focus:outline-none"
        >
          <span className="text-sm lg:text-2xl font-bold">
            1. Apa itu Discord?
          </span>
          <motion.span
            animate={{ rotate: activeIndex === 1 ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {activeIndex === 1 ? "−" : "+"}
          </motion.span>
        </button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: activeIndex === 1 ? 1 : 0,
            height: activeIndex === 1 ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3">
            <motion.img
              src="https://images.unsplash.com/photo-1679057001914-59ab4131dfff?q=80&w=1932&auto=format&fit=crop"
              alt="Discord"
              className="h-52 w-full object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700">
              Discord adalah platform komunikasi berbasis teks, suara, dan video
              yang banyak digunakan untuk komunitas gaming, kerja tim, dan
              pertemanan. Dengan berbagai fitur seperti server, channel, dan
              bot, Discord mempermudah komunikasi dalam grup besar maupun kecil.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Item 2: Cara Mengunduh dan Menginstal Discord */}
      <div className="overflow-hidden text-black mt-3">
        <button
          onClick={() => handleToggle(2)}
          className="w-full text-left flex items-center justify-between py-3 text-2xl font-semibold border-b-2 border-black focus:outline-none"
        >
          <span className="text-sm lg:text-2xl font-bold">
            2. Cara Mengunduh dan Menginstal Discord
          </span>
          <motion.span
            animate={{ rotate: activeIndex === 2 ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {activeIndex === 2 ? "−" : "+"}
          </motion.span>
        </button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: activeIndex === 2 ? 1 : 0,
            height: activeIndex === 2 ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3">
            <motion.img
              src="https://via.placeholder.com/200x200/8c9eff/333333?text=Download"
              alt="Download Discord"
              className="h-52 w-full object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700">
              Anda dapat mengunduh Discord dari situs resminya di{" "}
              <a href="https://discord.com/" className="text-blue-500">
                https://discord.com/
              </a>
              . Pilih versi yang sesuai untuk PC (Windows/macOS/Linux) atau
              perangkat mobile (Android/iOS). Setelah terinstal, login atau
              daftar akun baru untuk mulai menggunakan Discord.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Item 3: Cara Bergabung ke Server Discord */}
      <div className="overflow-hidden text-black mt-3">
        <button
          onClick={() => handleToggle(3)}
          className="w-full text-left flex items-center justify-between py-3 text-2xl font-semibold border-b-2 border-black focus:outline-none"
        >
          <span className="text-sm lg:text-2xl font-bold">
            3. Cara Bergabung ke Server Discord
          </span>
          <motion.span
            animate={{ rotate: activeIndex === 3 ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {activeIndex === 3 ? "−" : "+"}
          </motion.span>
        </button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: activeIndex === 3 ? 1 : 0,
            height: activeIndex === 3 ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3">
            <motion.img
              src="https://via.placeholder.com/200x200/ff8c8c/333333?text=Server"
              alt="Join Server"
              className="h-52 w-full object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700">
              Untuk bergabung ke server, dapatkan tautan undangan dari teman
              atau komunitas. Klik ikon **"+"** di sidebar Discord, pilih
              **"Join a Server"**, lalu tempel tautan tersebut dan klik
              **"Join"**. Anda juga bisa membuat server sendiri dengan menekan
              tombol **"Create a Server"**.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Item 4: Mengenal Text Channel dan Voice Channel */}
      <div className="overflow-hidden text-black mt-3">
        <button
          onClick={() => handleToggle(4)}
          className="w-full text-left flex items-center justify-between py-3 text-2xl font-semibold border-b-2 border-black focus:outline-none"
        >
          <span className="text-sm lg:text-2xl font-bold">
            4. Mengenal Text Channel dan Voice Channel
          </span>
          <motion.span
            animate={{ rotate: activeIndex === 4 ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl font-bold"
          >
            {activeIndex === 4 ? "−" : "+"}
          </motion.span>
        </button>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: activeIndex === 4 ? 1 : 0,
            height: activeIndex === 4 ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3">
            <motion.img
              src="https://via.placeholder.com/200x200/7eff7f/333333?text=Channels"
              alt="Text & Voice Channels"
              className="h-52 w-full object-cover mb-4 rounded-lg"
            />
            <p className="text-gray-700">
              **Text Channel** digunakan untuk mengirim pesan teks, gambar, dan
              file dalam server. Channel ini diawali dengan tanda **"#"**.
              **Voice Channel** memungkinkan Anda berbicara langsung dengan
              anggota lain melalui suara. Untuk masuk, cukup klik channel
              tersebut.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccordionMotion;
