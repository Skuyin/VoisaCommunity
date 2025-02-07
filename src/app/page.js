"use client";
import Skills from "./components/Skills";
import Header from "./components/header";
import { skills, social_handles, testimonials } from "../../src/dummy";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import MessageForm from "./components/messsage-form";
import About from "./components/About";
import MembersServer from "./components/MembersServer";
import Ngetes from "./components/Ngetes";
import FloatingAudioButton from "./components/floatingAudiobutton";
import ActivityServer from "./components/ActivityServer";

export default function Home() {
  return (
    <main className="relative">
      
      <Header social={social_handles} />
      {/* <Hero /> */}
      <Ngetes />
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
