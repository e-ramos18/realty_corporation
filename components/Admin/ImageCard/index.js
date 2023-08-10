import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/outline";
import IconButton from "../IconButton";

const ImageCard = (props) => {
  return (
    <React.Fragment>
      <div className="relative h-56 w-56">
        <Image
          src={props.source}
          alt={props.title ? props.title : `alt-${props.source}`}
          // layout="fill"
          width={200}
          height={200}
          // objectFit="cover"
          priority={true}
          className="w-full h-full border-2 border-dark-gold rounded-md"
        />
        {props.hasDelete && (
          <div className="absolute top-2 right-2">
            <IconButton
              Icon={XCircleIcon}
              name={`delete-123`}
              onClickHandler={props.onClickHandlerDelete}
              tooltip="Delete"
              iconStyle="text-primary-error"
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

ImageCard.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string,
  hasDelete: PropTypes.bool,
  onClickHandlerDelete: PropTypes.func,
};

export default ImageCard;
