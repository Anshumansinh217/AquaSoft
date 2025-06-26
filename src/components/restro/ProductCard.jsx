import React from "react";


const ProductCard = ({ product, onAdd, onRemove }) => {
  const handleAdd = () => {
    onAdd(product, 1);
  };

 

  return (
    <div
      onClick={handleAdd}
      className="group relative bg-white border-2 border-purple-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      

      {/* Image */}
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
      <p className="text-purple-800 font-medium text-sm">₹{Number(product.price).toFixed(2)}</p>


      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300"></div>
    </div>
  );
};

export default ProductCard;
