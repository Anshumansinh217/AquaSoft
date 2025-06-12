import React, { useState } from "react";
import CategoryButtons from "../../components/restro/CategoryButtons";
import ProductList from "../../components/restro/ProductList";
import Cart from "../../components/restro/Cart";
import articlesData from "../../data/articlesData";

const ArticleSalesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("women");
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart with quantity
  const handleAddToCart = (product, quantity = 1) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, quantity, discount: 0 },
      ]);
    }
  };

  // Update quantity or discount
  const updateCartItem = (id, field, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: Math.max(1, value) } : item
      )
    );
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter products by selected category
  const filteredProducts = articlesData.filter(
    (product) => product.category === selectedCategory
  );

  const articleCategories = [
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Products */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 border border-yellow-300">
            <CategoryButtons
              categories={articleCategories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <div className="mt-6">
              <ProductList
                products={filteredProducts}
                onAdd={handleAddToCart}
              />
            </div>
          </div>

          {/* Right: Cart */}
          <div className="w-full lg:w-[520px]">
            <Cart
  items={cartItems}
  onUpdate={updateCartItem}
  onRemove={removeFromCart}
  source="ArticleSalesPage"  // Add this prop
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSalesPage;
