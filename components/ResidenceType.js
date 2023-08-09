import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "./Card";
import Spacer from "./Spacer";

const ResidenceType = () => {
  const cards = Array.from({ length: 4 }, (_, index) => ({
    imgSrc: `https://source.unsplash.com/random/200x200?sig=${index}`,
    title: `Card Title ${index + 1}`,
    description: `Card ${index + 1} description...`,
    href: `/details/${index + 1}`,
  }));
  return (
    <div className="max-width">
      <div className="flex justify-center items-center gap-5">
        <div className="flex-col items-center justify-center w-1/2">
          <h1>Arusa</h1>
          <p className="inline-block my-10">
            Aruga Resort and Residences – Mactan is Rockwell’s move to
            beachfront living in Cebu. Sitting on a popular sailing and
            snorkeling destination, within convenient reach of everything from
            the Lapu-Lapu shrine to the Mactan-Cebu International Airport, Aruga
            Resort and Residences – Mactan keeps your vacation open for
            adventures in and out of the resort and residential area.
          </p>
          <Link
            href=""
            className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm hover:bg-yellow-600 transition-colors w-56 text-center"
          >
            Learn more
          </Link>
        </div>

        <div className="flex-col items-center justify-center my-10 w-1/2">
          <Image
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <Spacer height="h-10" />
      <div>
        <h3 className="text-center font-semibold uppercase">Unit Types</h3>
        <Spacer height="h-8" />
        <div className="flex items-center justify-between">
          {cards.map((card) => (
            <div className="w-64" key={card.title}>
              <Card
                imgSrc={card.imgSrc}
                title={card.title}
                description={card.description}
                href={card.href}
                btnTitle="Request for floor plan"
              />
            </div>
          ))}
        </div>
      </div>
      <Spacer height="h-10" />
      <h3 className="text-center font-semibold uppercase">Amenities</h3>
      <div className="flex justify-center items-center gap-5">
        <div className="flex-col items-center justify-center w-1/2">
          <p>On this hill, the child in you awakens.</p>
          <p className="inline-block my-10">
            Whether looking for a space where you can get lost in your reading
            or wanting to spend a day outside with your family, The Arton caters
            to your needs. Get access to world-class amenities any time you
            want.
          </p>
          <ul className="list-disc">
            {[
              "Fitness Gym",
              "Function Room",
              "Swimming Pools",
              "Co-working Spaces",
              "Multi-Purpose Court",
            ].map((amenity) => (
              <li>{amenity}</li>
            ))}
          </ul>
          <Link
            href=""
            className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm hover:bg-yellow-600 transition-colors w-56 text-center"
          >
            Learn more
          </Link>
        </div>

        <div className="flex-col items-center justify-center my-10 w-1/2">
          <Image
            src="https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=1600"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <Spacer height="h-10" />
      <h3 className="text-center font-semibold uppercase">Location</h3>
      <div className="flex justify-center items-center gap-5">
        <div className="flex-col items-center justify-center w-1/2">
          <p>On this hill, the child in you awakens.</p>
          <p className="inline-block my-10">
            The Arton is a pre-selling residential condominium conveniently
            located along Aurora Boulevard, Brgy. Loyola Heights, Quezon City.
            Relish in its space by acquiring a unit for sale that fits your
            whole family and lifestyle needs. Its proximity to retail
            establishments and lifestyle hubs provides you an array of lifestyle
            options within your reach. Best of all, the country’s top
            universities are only a few minutes away. Imagine how easy it is to
            take your kids to school and come home to a relaxing community.
          </p>
          <p>Property Address</p>
          <p>The Arton by Rockwell</p>
          <p>Aurora Boulevard, Barangay Loyola Heights, Quezon City</p>
          <Link
            href=""
            className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm hover:bg-yellow-600 transition-colors w-56 text-center"
          >
            Learn more
          </Link>
        </div>

        <div className="flex-col items-center justify-center my-10 w-1/2">
          <Image
            src="https://images.pexels.com/photos/3646913/pexels-photo-3646913.jpeg?auto=compress&cs=tinysrgb&w=1600"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default ResidenceType;
