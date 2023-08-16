"use client";

import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getHeroImages } from "@utils/apiCalls";

const Hero = () => {
  const [images, setImages] = useState([]);
  // const images = [
  //   "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // ];

  useEffect(() => {
    getHero();
  }, []);

  const getHero = async () => {
    const heroImages = await getHeroImages();

    setImages(heroImages.response.data);
  };

  return (
    <Carousel
      showThumbs={false}
      className="w-full h-[45rem] relative overflow-hidden flex items-center justify-center"
      showIndicators
      emulateTouch
    >
      {images.length &&
        images.map((image) => (
          <div
            key={image.id}
            className="relative flex items-center justify-center"
          >
            <img
              src={`${image.location}${image.filename}`}
              alt={`Carousel Image ${image.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}
    </Carousel>
  );
};

export default Hero;
