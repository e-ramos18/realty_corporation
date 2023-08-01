import React from "react";

const Spacer = ({ height }) => {
  // You can add logic here to check if the height prop is a valid Tailwind class

  return <div className={`${height}`}></div>;
};

export default Spacer;
