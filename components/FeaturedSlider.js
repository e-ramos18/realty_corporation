"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./Card";

export default function FeaturedSlider() {
  const cards = Array.from({ length: 10 }, (_, index) => ({
    imgSrc: `https://source.unsplash.com/random/200x200?sig=${index}`,
    title: `The Arton ${index + 1}`,
    description: `Card ${
      index + 1
    } A community designed to inspire curious minds nestled in an vibrant neighborhood in Katipunan, Quezon City.`,
    href: `/details/${index + 1}`,
  }));

  return (
    <Carousel
      interval={5000}
      centerMode
      emulateTouch
      centerSlidePercentage={26} // adjust this based on the size of your cards and viewport
      className="max-width"
      showThumbs={false}
      showArrows
    >
      {cards.map((card) => (
        <div className="w-64" key={card.title}>
          <Card
            imgSrc={card.imgSrc}
            title={card.title}
            description={card.description}
            href={card.href}
            bgColor="bg-white"
            shadow="shadow-md"
            btnTitle="View Details"
          />
        </div>
      ))}
    </Carousel>
  );
}
