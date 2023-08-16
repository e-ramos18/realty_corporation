import React from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "./Card";
import Spacer from "./Spacer";

const ResidenceType = ({ condo }) => {
  const cards = Array.from({ length: 4 }, (_, index) => ({
    imgSrc: `https://source.unsplash.com/random/200x200?sig=${index}`,
    title: `Card Title ${index + 1}`,
    description: `Card ${index + 1} description...`,
    href: `/details/${index + 1}`,
  }));
  return (
    <>
      {condo && (
        <div className="max-width">
          <div className="flex justify-center items-center gap-5">
            <div className="flex-col items-center justify-center w-1/2">
              <h1>{condo.name}</h1>
              <p className="inline-block my-10">{condo.main_description}</p>
              <Link
                href=""
                className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm hover:bg-yellow-600 transition-colors w-56 text-center"
              >
                Learn more
              </Link>
            </div>

            <div className="flex-col items-center justify-center my-10 w-1/2">
              <Image
                src={`${condo.main_directory}${condo.main_filename}`}
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
              <p className="mb-10">{condo.amenities_description}</p>
              <ul className="list-disc">
                {condo.amenities_list.split(/\r?\n/).map((amenity) => (
                  <li key={amenity}>{amenity !== "" && amenity}</li>
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
                src={`${condo.amenities_directory}${condo.amenities_filename}`}
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
              <p className="inline-block my-10">{condo.location_description}</p>
              {condo.address.split(/\r?\n/).map((add) => (
                <p key={add}>{add !== "" && add}</p>
              ))}
              <Link
                href=""
                className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm hover:bg-yellow-600 transition-colors w-56 text-center"
              >
                Learn more
              </Link>
            </div>

            <div className="flex-col items-center justify-center my-10 w-1/2">
              <Image
                src={`${condo.location_directory}${condo.location_filename}`}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResidenceType;
