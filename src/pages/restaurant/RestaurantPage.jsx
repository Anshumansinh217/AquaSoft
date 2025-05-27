import React, { useState } from "react";
import CategoryButtons from "../../components/restro/CategoryButtons";
import ProductList from "../../components/restro/ProductList";
import Cart from "../../components/restro/Cart";
import productsData from "../../data/products";

const RestaurantPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("starter");
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

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products by selected category
  const filteredProducts = productsData.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Products */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 border border-purple-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-purple-900">Restaurant Menu</h1>
              <div className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in Cart
              </div>
            </div>
            <CategoryButtons
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <div className="mt-6">
              <ProductList products={filteredProducts} onAdd={handleAddToCart} />
            </div>
          </div>

          {/* Right: Cart */}
          <div className="w-full lg:w-96">
            <div className="sticky top-6 bg-white rounded-2xl shadow-sm p-6 border border-purple-100">
              <Cart
                items={cartItems}
                onUpdate={updateCartItem}
                onRemove={removeFromCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;