import React from "react";
import { MainCarousel } from "../../Components/HomeCarousel/MainCarousel";
// import { HomeSectionCard } from "../../Components/HomeSectionCard/HomeSectionCard";
import HomeSectionCarousel from "../../Components/HomeSectionCarousel/HomeSectionCarousel";

export const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Carousel */}
      <div className="w-full">
        <MainCarousel />
      </div>

      {/* Home Sections */}
      <div className="max-w-screen- mx-auto py-20 flex flex-col gap-16">
        <h2 className="text-3xl font-bold text-gray-800">Featured Collections</h2>
        <HomeSectionCarousel />
        <HomeSectionCarousel />
        <HomeSectionCarousel />
        <HomeSectionCarousel />
        <HomeSectionCarousel />
      </div>
    </div>
  );
};

