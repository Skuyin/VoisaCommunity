"use client";
import Skills from "./components/Skills";
import Header from "./components/header";
import { skills, testimonials } from "../../src/dummy";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import MessageForm from "./components/messsage-form";
import About from "./components/About";
import MembersServer from "./components/MembersServer";
import HeroSection from "./components/HeroSection";
import FloatingAudioButton from "./components/floatingAudiobutton";
import ActivityServer from "./components/ActivityServer";



export default function Home() {
  return (
    <main className="relative">
      
      <Header  />
      {/* <Hero /> */}
      <HeroSection />
      <About />
      <Skills skills={skills} />
      <ActivityServer />
      <MembersServer />
      <Testimonials testimonials={testimonials} />
      <MessageForm />
      <FloatingAudioButton />
    </main>
  );
}
