import React from "react";

export const HomeSectionCard = () => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3">
      <div className="h-[13rem] w-[10rem]">
        <img className="object-cover object-top w-full h-full" src="https://manyavar.scene7.com/is/image/manyavar/ML12056_303-Beige.1075_23-04-2024-10-54:650x900?&dpr=on,2" alt="" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font medium text-gray-900">Nofilter</h3>
        <p className="mt-2 text-sm text-gray-500">
          Men Solid Pure Cotton Straing Kurta
        </p>
      </div>
    </div>
  );
};
