import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { HomeSectionCard } from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { mensKurtaPage1 } from "../../../Data/mens_kurta";
const HomeSectionCarousel = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 6;
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 4 },
    2000: { items: 6 },
  };

  const handleSlideChange = (e) => {
    setCurrentIndex(e.item)
  };
  const items = mensKurtaPage1.map((product, index) => (
    <div key={index} className="w-full flex justify-center">
      <HomeSectionCard product = {product}/>
    </div>
  ));
  return (
    <div className="border">
      <div className="relative p-5">
        {currentIndex > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-200 z-10"
            onClick={() => {
              carouselRef.current?.slidePrev();
              console.log(currentIndex);
            }}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </button>
        )}
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          // autoPlay
          // autoPlayInterval={2000}
          infinite={false}
          responsive={responsive}
          disableDotsControls
          onSlideChanged={handleSlideChange}
        />

        {currentIndex < totalSlides - 1 && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 text-gray-600 hover:bg-gray-200 z-10"
            onClick={() => {
              carouselRef.current?.slideNext();
              console.log(currentIndex);
              
            }}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
