"use client";

import { getCondominiums } from "@utils/apiCalls";
import React, { useState, useEffect } from "react";
import FeaturedSlider from "./FeaturedSlider";
import Spacer from "@components/Spacer";
import ResidenceType from "@components/ResidenceType";
import Loader from "./Loader";

const MainContent = () => {
  const [condos, setcondos] = useState([]);
  const [condo, setCondo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCondos();
  }, []);

  const getCondos = async () => {
    setIsLoading(true);
    const condos = await getCondominiums();
    setcondos(condos.response.data);
    setCondo(condos.response.data[0]);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading || !condo ? (
        <Loader />
      ) : (
        <>
          <FeaturedSlider condos={condos} setCondo={setCondo} />
          <Spacer height="h-16" />
          <ResidenceType condo={condo} />
        </>
      )}
    </>
  );
};

export default MainContent;
