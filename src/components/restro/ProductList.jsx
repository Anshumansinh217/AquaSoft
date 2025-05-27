import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAdd }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 p-4 bg-purple-50 rounded-xl shadow-inner">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;
