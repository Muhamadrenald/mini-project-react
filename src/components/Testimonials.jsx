import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="container w-full py-10 mx-auto overflow-hidden lg:px-32"
      id="Testimonials"
    >
      <h1 className="mb-2 text-2xl font-bold text-center sm:text-4xl">
        Customer
        <span className="font-light underline underline-offset-4 decoration-1 under">
          Testimonials
        </span>
      </h1>
      <p className="mx-auto mb-12 text-center text-gray-500 max-w-80">
        Real Stories from Those Who Found Home with Us
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="max-w-[340px] border shadow-lg rounded px-8 py-12 text-center"
          >
            <img
              className="w-20 h-20 mx-auto mb-4 rounded-full"
              src={testimonial.image}
              alt={testimonial.alt}
            />
            <h2 className="text-xl font-medium text-gray-700">
              {testimonial.name}
            </h2>
            <p className="mb-4 text-sm text-gray-500">{testimonial.title}</p>
            <div className="flex justify-center gap-1 mb-4 text-red-500">
              {Array.from({ length: testimonial.rating }, (item, index) => (
                <img key={index} src={assets.star_icon} alt="star icon" />
                // <span>⭐</span>
              ))}
            </div>
            <p className="text-gray-600">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default Testimonials;
