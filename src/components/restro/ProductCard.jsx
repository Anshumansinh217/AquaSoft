import React, { useState } from "react";

const ProductCard = ({ product, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    const newValue = Math.max(1, value);
    setQuantity(newValue);
  };

  return (
    <div className="group relative bg-white border-2 border-purple-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="overflow-hidden rounded-lg mb-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-28 w-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        />
      </div>

      {/* Product Info */}
      <h3 className="font-semibold text-purple-900 text-base mb-1 line-clamp-1">
        {product.name}
      </h3>
      <p className="text-purple-800 font-medium text-sm mb-2">₹{product.price.toFixed(2)}</p>

      {/* Quantity Controls */}
      <div className="flex items-center mt-auto">
        <div className="flex items-center border border-purple-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-2 text-purple-700 hover:bg-purple-50 transition h-8"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="w-8 h-8 text-center text-sm border-x border-purple-200 focus:outline-none appearance-none no-spinner"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-2 text-purple-700 hover:bg-purple-50 transition h-8"
          >
            +
          </button>
        </div>
        <button
        // {/* Pass quantity here */}
          onClick={() => onAdd(product, quantity)}  
          className="ml-2 px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300"
        >
          Add
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300"></div>
    </div>
  );
};

export default ProductCard;