"use client";

import { getCondominiums } from "@utils/apiCalls";
import React, { useState, useEffect } from "react";
import FeaturedSlider from "./FeaturedSlider";
import Spacer from "@components/Spacer";
import ResidenceType from "@components/ResidenceType";

const MainContent = () => {
  const [condos, setcondos] = useState([]);
  const [condo, setCondo] = useState(null);

  useEffect(() => {
    getCondos();
  }, []);

  const getCondos = async () => {
    const condos = await getCondominiums();
    setcondos(condos.response.data);
  };

  return (
    <>
      <FeaturedSlider condos={condos} setCondo={setCondo} />
      <Spacer height="h-16" />
      <ResidenceType condo={condo} />
    </>
  );
};

export default MainContent;
