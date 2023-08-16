"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./Card";

export default function FeaturedSlider({ condos, setCondo }) {
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
      {condos.length &&
        condos.map((condo) => (
          <div className="w-64" key={condo.name}>
            <Card
              imgSrc={`${condo.main_directory}${condo.main_filename}`}
              title={condo.name}
              description={condo.main_description}
              bgColor="bg-white"
              shadow="shadow-md"
              btnTitle="View Details"
              onBtnClick={() => setCondo(condo)}
            />
          </div>
        ))}
    </Carousel>
  );
}
