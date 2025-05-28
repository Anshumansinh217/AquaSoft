import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onAdd }) => {
  return (
    <div
      className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-0 p-0 overflow-y-auto"
      style={{ maxHeight: "75vh" }} // or any height you want, like 60vh or 600px
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default ProductList;
