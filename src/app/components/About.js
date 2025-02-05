"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import GsapMagnetic from "./GsapMagnetic";
import TiltCard from "./tiltcard";
import AnimatedTitle from "./animatedTitle";
import AccordionGSAP from "./Accordions";
import AccordionMotion from "./Accordions";

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://discord.com/api/guilds/1234390981470715954/widget.json"
      );

      // Await res.json() to resolve the promise and get the actual data
      const dataServer = await res.json();
      setData(dataServer);
    }

    fetchPosts();
  }, []);

  if (!data) {
    return (
      <section className="relative flex text-center h-full">
        <div>Loading...</div>
      </section>
    );
  }

  const infoCard = [
    {
      title: "200",
      subTitle: "USER",
    },
    {
      title: data?.presence_count || "40",
      subTitle: "Online",
    },
    {
      title: "24/7",
      subTitle: "Aktivitas",
    },
    {
      title: "4",
      subTitle: "Musik",
    },
  ];

  const aboutDesc = [""];

  return (
    <>
      <section className=" mx-auto">
        <div className="lg:text-8xl text-3xl text-center md:ml-3 md:m-10 font-bold text-black">
          TENTANG KAMI.
        </div>
        <div className="flex flex-row w-4/4 flex-wrap text-center">
          {infoCard.map((i) => (
            <motion.div
              initial="initial"
              whileHover="whileHover"
              key={i.title}
              className=" w-2/4 lg:w-1/4 p-2 cursor-default lg:border-t-2 lg:border-b-2 border-black "
            >
              <div className="relative overflow-hidden group bg-clip-border border rounded-lg lg:rounded-none lg:border-none  border-black">
                <div
                  className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"
                  style={{
                    background: "linear-gradient(to top,  #56CCF2, #4A90E2)",
                  }}
                />
                <motion.svg
                  src="/iconfill.svg"
                  className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300"
                />
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: -16 },
                  }}
                  transition={{
                    type: "spring",
                    staggerChildren: 0.075,
                    delayChildren: 0.25,
                  }}
                  className="relative z-10 block text-1xl p-5 font-bold text-black transition-colors duration-500 group-hover:text-neutral-50 lg:text-5xl"
                >
                  <div>
                    {String(i.title)
                      .split("")
                      .map((l, i) => (
                        <motion.span
                          variants={{
                            initial: { x: 0 },
                            whileHover: { x: 16 },
                          }}
                          transition={{ type: "spring" }}
                          className="inline-block"
                          key={i}
                        >
                          {l}
                        </motion.span>
                      ))}
                  </div>
                  <div>
                    {String(i.subTitle)
                      .split("")
                      .map((l, i) => (
                        <motion.span
                          variants={{
                            initial: { x: 0 },
                            whileHover: { x: 16 },
                          }}
                          transition={{ type: "spring" }}
                          className="inline-block"
                          key={i}
                        >
                          {l}
                        </motion.span>
                      ))}
                  </div>
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="">
        <div className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-20 px-4 md:px-8 relative">
          <div className="">
            <h2 className="cursor-default text-sm lg:text-3xl font-semibold leading-relaxed">
              {"Kami adalah komunitas yang berasal dari aplikasi Anonymous di Playstore, yang bertujuan untuk menyatukan orang-orang dengan berbagai latar belakang di Indonesia. Di Voisa Community, kami menyediakan ruang untuk berbagi pengalaman, bertukar ide, dan menjalin persahabatan. Kami percaya bahwa setiap anggota memiliki cerita unik yang bisa menginspirasi dan memperkaya satu sama lain. Apakah Kamu mencari tempat untuk ngobrol santai, bermain game bersama, atau ikut kegiatan seru seperti meetup jalan-jalan? Kita siap menyambut kamu! kita juga senang berbagi rekomendasi buku, musik, film, atau bahkan diskusi tentang topik-topik menarik. Selain itu, Voisa Community adalah tempat yang tepat bagi Kamu yang ingin bersosialisasi dan berkolaborasi dalam kegiatan positif. Jadi, jika Kamu mencari tempat untuk berinteraksi, bersenang-senang, dan menjalin koneksi yang bermakna, Voisa Community adalah jawabannya!"
                .split(" ")
                .map((word, idx) => (
                  <span
                    key={idx}
                    className="inline-block hoverText mx-1 break-words"
                  >
                    {word}
                  </span>
                ))}
            </h2>
            <div className="mx-auto mt-20">
              <h2 className="uppercase text-lg lg:text-4xl font-semibold text-black">
                PERTANYAAN YANG MUNKIN BANYAK DITANYAKAN
              </h2>
              <AccordionMotion />
            </div>
          </div>
          <div className="relative">
            <div className="md:sticky mt-6 md:mt-0 top-6 w-full">
              <TiltCard />
            </div>
          </div>
        </div>
      </section>

      {/* <section className=" body-font">
        <div className=" px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-2/3 sm:w-2/3 content-start sm:pr-10">
            <GsapMagnetic>
              <div className="p-4 cursor-pointer bg-blue-300 sm:w-1/2 lg:w-1/4 w-1/2  text-center">
                <h2 className=" font-medium text-3xl text-[84px] ">2.7K</h2>
                <p className="leading-relaxed">Users</p>
              </div>
            </GsapMagnetic>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2  text-center">
              <h2 className="title-font font-medium text-3xl ">1.8K</h2>
              <p className="leading-relaxed">Subscribes</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2  text-center">
              <h2 className="title-font font-medium text-3xl ">35</h2>
              <p className="leading-relaxed">Downloads</p>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2  text-center">
              <h2 className="title-font font-medium text-3xl ">4</h2>
              <p className="leading-relaxed">Products</p>
            </div>
            <div className="w-full sm:p-4 px-4 mb-6">
              <h1 className="title-font font-medium text-4xl mb-2 ">
                Tentang Kita
              </h1>
              <div className="leading-relaxed text-2xl">
                Di Gang Sebelah, kami memupuk rasa kebersamaan yang kuat dan
                menyediakan ruang bagi orang-orang untuk saling terhubung,
                terlibat, dan bersenang-senang. Apakah Anda mencari obrolan umum
                yang hidup, kegiatan sehari-hari, rekomendasi musik, teman
                bermain game, diskusi kelompok lokal Indonesia, podcast yang
                berwawasan luas, kesempatan untuk berkontribusi pada kegiatan
                amal dan nirlaba, atau dukungan untuk belajar dan mengajar, kami
                siap membantu Anda.
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
            <motion.img
              className="object-cover object-center w-full h-full"
              src="/2.svg"
              alt="stats"
            />
          </div>
        </div>
      </section> */}
    </>
  );
};

export default About;
