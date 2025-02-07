"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { TextReveal } from "./ui/Typography";
import { useMediaQuery } from "../utils/useMediaQuery";
import Link from "next/link";
import { ArrowUpRight } from "./ui/icons";
import Menu from "./ui/menu.svg";
import Image from "next/image";
import { Transition } from "./ui/Transitions";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Services",
    href: "#services",
  },
  {
    title: "Projects",
    href: "#projects",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const Header = ({ social }) => {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  const MotionLink = motion.create(Link);

  const variants = {
    open: {
      clipPath: `inset(0% 0% 0% 0% round ${isMobile ? 0 : "24px"})`,
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      clipPath: `inset(5% 12% 93% 85% round ${isMobile ? 0 : "24px"})`,
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.header className="fixed top-0 md:mt-12 md:mr-12 right-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 flex items-center justify-between w-[95%] px-6 rounded-2xl bg-[#000000]">
      <div className="flex items-center justify-between w-full">
        <Link
          href={"/"}
          className="bg-[#000000] px-3 py-6 rounded-2xl text-[#ffffff] font-bold text-2xl"
        >
          Voisa Community
        </Link>
        <motion.div
          initial={false}
          animate={isActive ? "open" : "closed"}
          variants={variants}
          className={`absolute top-0 right-0 mx-[24px] my-[24px]  md:-top-6 md:-right-6 w-dvw md:w-[480px] h-dvh md:h-[calc(100dvh_-_2.5rem)] bg-black ${
            isActive ? "visible" : "hidden"
          } z-[-1000]`}
        >
          {isActive && (
            <nav className="flex justify-between flex-col w-full h-full px-10 pt-[100px] pb-[50px]">
              <div className="flex gap-2 flex-col">
                {navLinks.map((link, i) => {
                  const { title, href } = link;
                  return (
                    <div
                      key={`b_${i}`}
                      className=""
                      onClick={() => setIsActive(false)}
                    >
                      <Link
                        href={href}
                        className="flex flex-wrap overflow-hidden"
                      >
                        <motion.div
                          variants={perspective}
                          custom={i}
                          initial="initial"
                          animate="enter"
                          whileHover="whileHover"
                          whileTap="whileHover"
                          exit="exit"
                          className="text-5xl text-background flex items-center justify-between"
                        >
                          <motion.span
                            variants={{
                              initial: { x: -20 },
                              whileHover: { x: 0 },
                            }}
                          >
                            <ArrowUpRight />
                          </motion.span>
                          <motion.span
                            variants={{
                              initial: { x: 0 },
                              whileHover: { x: 20 },
                            }}
                          >
                            {title}
                          </motion.span>
                        </motion.div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <motion.div className="flex flex-wrap">
                {social.map((link, i) => {
                  const { platform, _id, url } = link;
                  return (
                    <MotionLink
                      href={url}
                      target="_blank"
                      className=" w-1/2 mt-1 text-background"
                      variants={slideIn}
                      custom={i}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      key={_id}
                    >
                      <TextReveal>{platform}</TextReveal>
                    </MotionLink>
                  );
                })}
              </motion.div>
            </nav>
          )}
        </motion.div>
        <Button
          isActive={isActive}
          toggleMenu={() => {
            setIsActive(!isActive);
          }}
        />
      </div>
    </motion.header>
  );
};

export default Header;

function Button({ toggleMenu }) {
  return (
    <button
      className="w-[50px] h-[50px] bg-[#ffffff] rounded-2xl flex items-center justify-center hover:opacity-80"
      onClick={() => {
        toggleMenu();
      }}
    >
      <Image src={Menu} alt="menu" className="w-[80%] h-[80%]" />
    </button>
  );
}

const perspective = {
  initial: {
    y: 50,
  },
  enter: (i) => ({
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};
