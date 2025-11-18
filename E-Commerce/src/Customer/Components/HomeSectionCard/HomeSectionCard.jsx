import React from "react";

export const HomeSectionCard = ({ product }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 border">
      {/* Product Image */}
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <p className="mt-2 text-sm text-gray-500">
          <span className="text-red-500 font-bold">
            ₹{product.selling_Price}
          </span>{" "}
          <span className="line-through text-gray-400">₹{product.price}</span>{" "}
          <span className="text-green-500">{product.discount}</span>
        </p>
      </div>
    </div>
  );
};
