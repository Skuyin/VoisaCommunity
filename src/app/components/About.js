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
      <section className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-2">Loading members...</p>
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
      <section className="mx-auto" id="about">
        <div className="lg:text-8xl text-3xl text-center md:ml-3 md:m-10 font-bold text-black">
          TENTANG KAMI.
        </div>
        <br className="bg-blue-500" />
        <div className="flex flex-row w-4/4 flex-wrap text-center">
          {infoCard.map((i) => (
            <motion.div
              initial="initial"
              whileHover="whileHover"
              key={i.title}
              className=" w-2/4 lg:w-1/4 p-2 cursor-default lg:border-t-2 lg:border-b-2 border-black "
            >
              <div className="relative overflow-hidden group bg-clip-border border lg:border-none border-black">
                <div
                  className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"
                  style={{
                    background: "linear-gradient(to top,  #56CCF2, #4A90E2)",
                  }}
                />
                {/* <motion.svg
                  src="/iconfill.svg"
                  className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300"
                /> */}
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
                  className="relative z-10 block text-1xl md:p-5 font-bold text-black transition-colors duration-500 group-hover:text-neutral-50 lg:text-5xl"
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
        <div className="grid md:grid-cols-[1.8fr_1fr] gap-x-10 py-5 md:py-20 px-4 md:px-8 relative">
          <div className="">
            <h1 className="text-black mx-1 font-bold lg:text-7xl md:text-5xl sm:text-4xl">
              VOISA COMMUNITY
            </h1>
            <h2 className="cursor-default text-black text-sm lg:text-3xl font-semibold leading-relaxed">
              "Kami adalah komunitas yang berasal dari aplikasi Anonymous di
              Playstore, yang bertujuan untuk menyatukan orang-orang dengan
              berbagai latar belakang di Indonesia. Di Voisa Community, kami
              menyediakan ruang untuk berbagi pengalaman, bertukar ide, dan
              menjalin persahabatan. Kami percaya bahwa setiap anggota memiliki
              cerita unik yang bisa menginspirasi dan memperkaya satu sama lain.
              Apakah Kamu mencari tempat untuk ngobrol santai, bermain game
              bersama, atau ikut kegiatan seru seperti meetup jalan-jalan? Kita
              siap menyambut kamu! kita juga senang berbagi rekomendasi buku,
              musik, film, atau bahkan diskusi tentang topik-topik menarik.
              Selain itu, Voisa Community adalah tempat yang tepat bagi Kamu
              yang ingin bersosialisasi dan berkolaborasi dalam kegiatan
              positif. Jadi, jika Kamu mencari tempat untuk berinteraksi,
              bersenang-senang, dan menjalin koneksi yang bermakna, Voisa
              Community adalah jawabannya!"
            </h2>
            <div className="mx-auto">
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
    </>
  );
};

export default About;
