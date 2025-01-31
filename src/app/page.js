"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import Skills from "./components/Skills";
import Header from "./components/header";
import { skills, social_handles, testimonials } from "../../src/dummy";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import MessageForm from "./components/messsage-form";
import About from "./components/About";

export default function Home() {
  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Testimonials testimonials={testimonials} />
      <MessageForm />
    </main>
  );
}
