import React from "react";

const Banner = ({ imageSrc, altText }) => {
  return (
    <div className="w-full mb-8">
      <img
        src={imageSrc}
        alt={altText}
        className="object-cover w-full h-48 rounded-lg shadow-lg md:h-64"
      />
    </div>
  );
};

export default Banner;
