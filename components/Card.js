import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({
  imgSrc,
  title,
  description,
  href,
  bgColor,
  shadow,
  btnTitle,
}) => {
  return (
    <div className={`flex flex-col ${bgColor} ${shadow} overflow-hidden`}>
      <div className="relative h-56 w-full">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block bg-yellow-500 py-2 px-4 text-white text-sm text-center hover:bg-yellow-600 transition-colors w-48"
        >
          {btnTitle}
        </Link>
      </div>
    </div>
  );
};

export default Card;
