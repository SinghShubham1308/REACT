// import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { carouselData } from "./MainCarouselData";

export const MainCarousel = () => {
  //   const navigate = useNavigate();

  const items = carouselData.map((item, index) => (
    <img
      // key={index}
      className="cursor-pointer w-full h-full object-cover"
      src={item.image}
      alt={`Slide ${index + 1}`}
      role="presentation"
      //   onClick={() => navigate(item.path)}
    />
  ));

  return (
    <div >
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
      />
    </div>
  );
};
