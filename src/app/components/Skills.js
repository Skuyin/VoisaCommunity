"use client";

import ParallaxText from "./ui/ParallaxText";

export default function Skills({ skills }) {
  return (
    <section id="skills" className="">
      <ParallaxText baseVelocity={-5}>
        {skills.map((skill) =>
          skill.enabled ? (
            <span
              key={skill._id}
              className="md:text-7xl text-xl font-semibold uppercase text-black tracking-tighter"
            >
              {skill.name} •
            </span>
          ) : null
        )}
      </ParallaxText>
      <ParallaxText baseVelocity={5}>
        {skills.map((skill) =>
          skill.enabled ? (
            <span
              key={skill._id}
              className="md:text-7xl text-xl font-semibold uppercase text-black tracking-tighter"
            >
              {skill.name} •
            </span>
          ) : null
        )}
      </ParallaxText>
    </section>
  );
}


