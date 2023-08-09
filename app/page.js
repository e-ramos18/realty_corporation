import Hero from "@components/Hero";
import FeaturedSLider from "@components/FeaturedSlider";
import Spacer from "@components/Spacer";
import ResidenceType from "@components/ResidenceType";

export default function Home() {
  return (
    <>
      <Hero />
      <Spacer height="h-16" />
      <FeaturedSLider />
      <Spacer height="h-16" />
      <ResidenceType />
    </>
  );
}
