"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./Card";

export default function FeaturedSlider() {
  const cards = Array.from({ length: 10 }, (_, index) => ({
    imgSrc: `https://source.unsplash.com/random/200x200?sig=${index}`,
    title: `Card Title ${index + 1}`,
    description: `Card ${index + 1} description...`,
    href: `/details/${index + 1}`,
  }));

  return (
    <Carousel
      interval={5000}
      centerMode
      emulateTouch
      centerSlidePercentage={25} // adjust this based on the size of your cards and viewport
      className="max-w-6xl"
    >
      {cards.map((card, index) => (
        <div className="mr-2">
          <Card
            key={index}
            imgSrc={card.imgSrc}
            title={card.title}
            description={card.description}
            href={card.href}
          />
        </div>
      ))}
    </Carousel>
  );
}
