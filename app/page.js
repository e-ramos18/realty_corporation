import Hero from "@components/Hero";
import FeaturedSLider from "@components/FeaturedSlider";
import Spacer from "@components/Spacer";

export default function Home() {
  return (
    <>
      <Hero />
      <Spacer height="h-16" />
      <FeaturedSLider />
    </>
  );
}
