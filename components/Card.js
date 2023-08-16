import React from "react";
import Image from "next/image";

const Card = ({
  imgSrc,
  title,
  description,
  bgColor,
  shadow,
  btnTitle,
  onBtnClick,
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
        <p className="mt-2 text-sm text-gray-500 line-clamp-4">{description}</p>
        <button
          className="mt-4 bg-yellow-500 py-2 px-4 text-white text-sm text-center hover:bg-yellow-600 transition-colors w-48"
          onClick={onBtnClick}
        >
          {btnTitle}
        </button>
      </div>
    </div>
  );
};

export default Card;
