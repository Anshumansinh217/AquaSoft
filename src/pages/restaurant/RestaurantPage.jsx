import React, { useState, useEffect } from "react";
import CategoryButtons from "../../components/restro/CategoryButtons";
import ProductList from "../../components/restro/ProductList";
import Cart from "../../components/restro/Cart";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RestaurantPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("starter");
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("restaurantProducts")) || [];
    setProducts(storedProducts);
  }, []);

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
      setCartItems((prev) => [...prev, { ...product, quantity, discount: 0 }]);
    }
  };

  const updateCartItem = (id, field, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: Math.max(1, value) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  const restaurantCategories = [
    { id: "starter", label: "Starters" },
    { id: "main", label: "Main Course" },
    { id: "dessert", label: "Desserts" },
    { id: "beverage", label: "Beverages" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate("/RestaurantTable")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-purple-400/50 text-gray-700 hover:text-purple-600 group transform hover:-translate-x-1"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Back to Restaurants</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 border border-purple-100">
          <CategoryButtons
            categories={restaurantCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <div className="mt-6">
            <ProductList products={filteredProducts} onAdd={handleAddToCart} />
          </div>
        </div>

        <div className="w-full lg:w-[520px]">
          <Cart
            items={cartItems}
            onUpdate={updateCartItem}
            onRemove={removeFromCart}
            source="restaurant"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
