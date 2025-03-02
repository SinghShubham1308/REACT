import React, { useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import { HomeSectionCard } from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const HomeSectionCarousel = () => {
  const carouselRef = useRef(null);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
    2000: { items: 6 },
  };
  const items = [1, 1, 1, 1, 1, 1].map((_, index) => (
    <div key={index} className="w-full flex justify-center">
      <HomeSectionCard />
    </div>
  ));
  return (
    <div className="relative px-4 lg:px-8">
      <div className="relative p-5">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-200 z-10"
          onClick={() => {
            carouselRef.current?.slidePrev();
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </button>
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          // autoPlay
          // autoPlayInterval={2000}
          infinite
          responsive={responsive}
          disableDotsControls
        />
        {/* <button><KeyboardArrowLeftIcon /></button> */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-200 z-10"
          onClick={() => {
            carouselRef.current?.slideNext();
          }}
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
