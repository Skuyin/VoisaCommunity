"use client";
import Skills from "./components/Skills";
import Header from "./components/header";
import { skills, social_handles, testimonials } from "../../src/dummy";
import Hero from "./components/hero";
import Testimonials from "./components/testimonials";
import MessageForm from "./components/messsage-form";
import About from "./components/About";
import MembersServer from "./components/MembersServer";

export default function Home() {
  return (
    <main className="relative">
      <Header social={social_handles} />
      <Hero />
      <About />
      <Skills skills={skills} />
      <MembersServer />
      <Testimonials testimonials={testimonials} />
      <MessageForm />
    </main>
  );
}
