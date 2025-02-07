"use client";

import { InfiniteScroll } from "./ui/InfiniteScroll";
import { SlideIn, Transition } from "./ui/Transitions";
import { SectionHeading } from "./ui/Typography";

const Testimonials = ({ testimonials }) => {
  return (
    <section className="py-20 relative" id="testimonials">

      <Testimonial testimonials={testimonials} speed="normal" pauseOnHover />
      <Testimonial
        testimonials={testimonials}
        pauseOnHover
        speed="normal"
        direction="left"
      />
    </section>
  );
};

export default Testimonials;

const Testimonial = ({ testimonials, direction, speed, pauseOnHover }) => {
  return (
    <Transition viewport={{ once: true }}>
      <InfiniteScroll
        direction={direction}
        speed={speed}
        pauseOnHover={pauseOnHover}
        className="pb-4"
      >
        
        {testimonials.map((val) => (
          <li
            key={val._id}
            className="md:p-6 p-4 md:w-[450px] w-[300px] rounded-2xl space-y-2 relative overflow-hidden z-0"
          >
            <div className="relative">
              <p className=" opacity-90 md:text-xl">
                {val.review}
              </p>
            </div>
            <div className="flex gap-3 pt-6">
              <img
                src={val.image.url}
                width={50}
                height={50}
                alt={val.name}
                className="object-scale-down size-10 bg-black rounded-full"
              />
              <div>
                <h4 className="md:font-semibold font-medium">{val.name}</h4>
                <h5 className="md:text-sm text-xs opacity-60">
                  {val.position}
                </h5>
              </div>
            </div>
          </li>
        ))}
      </InfiniteScroll>
    </Transition>
  );
};
