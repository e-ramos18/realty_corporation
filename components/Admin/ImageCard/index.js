import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const ImageCard = (props) => {
  return (
    <React.Fragment>
      <div className="relative h-56 w-full">
        <Image
          src={"/uploads/hero/1691491779930-hero1.jpeg"}
          alt={props.title ? props.title : `alt-${props.source}`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
    </React.Fragment>
  );
};

ImageCard.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ImageCard;
