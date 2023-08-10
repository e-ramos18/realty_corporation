import React from "react";
import PropTypes from "prop-types";
import ImageCard from "../ImageCard";
import ConfirmDialogBox from "../ConfirmDialogBox";

const CardCarousel = (props) => {
  const [isShowConfirmDialog, setIsShowConfirmDialog] = React.useState(false);
  const [selectedImageId, setSelectedImageId] = React.useState(null);

  const onClickDeleteIcon = (imageId) => {
    setSelectedImageId(imageId);
    setIsShowConfirmDialog(true);
  };

  const onClickConfirmYes = (imageId) => {
    setIsShowConfirmDialog(false);
    props.onClickHandlerDelete(imageId);
  };

  return (
    <React.Fragment>
      <div className="flex ml-4 mt-2 overflow-x-auto max-w-6xl">
        {props.data.map((item) => (
          <div className="m-1" key={`key-${item.id}`}>
            <ImageCard
              source={`${item.location}${item.filename}`}
              hasDelete={true}
              onClickHandlerDelete={() => onClickDeleteIcon(item.id)}
            />
          </div>
        ))}
      </div>
      <ConfirmDialogBox
        title={"Dealer Image"}
        description="Are you sure you want to delete this image?"
        isShow={isShowConfirmDialog}
        onCloseHandler={() => setIsShowConfirmDialog(false)}
        onClickHandlerConfirmYes={() => onClickConfirmYes(selectedImageId)}
        onClickHandlerConfirmNo={() => setIsShowConfirmDialog(false)}
      />
    </React.Fragment>
  );
};

CardCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  onClickHandlerDelete: PropTypes.func,
};

export default CardCarousel;
