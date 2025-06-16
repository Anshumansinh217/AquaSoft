import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { saveRestaurantBooking, saveArticleBooking } from "../../services/bookingService";

const CartSummary = ({ items, source = "restaurant" }) => {
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );

  const gstTotal = items.reduce((sum, item) => {
    const gstRate = item.gst ?? 18;
    const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
    return sum + (itemTotal * gstRate / 100);
  }, 0);

  const total = subtotal + gstTotal;

  const handleCheckout = () => {
    const token = Date.now();

    const bookingData = {
      token,
      customer: { name: "Anshumansinh Rathore", id: 12345 },
      items,
      subtotal,
      gst: gstTotal,
      total,
      date: new Date().toISOString(),
    };

    if (source === "restaurant") {
      saveRestaurantBooking(bookingData);
    } else if (source === "ArticleSalesPage") {
      saveArticleBooking(bookingData);
    }

    navigate("/print-token", { state: { items, token, source } });
  };

  return (
    <div className="space-y-3 mt-4 border-t border-purple-200 pt-4 text-sm sm:text-base">
      <div className="flex justify-between text-base sm:text-lg">
        <span className="font-bold text-purple-900">Total:</span>
        <span className="font-bold text-blue-600">₹{total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className={`relative overflow-hidden w-full mt-4 px-6 py-3 rounded-xl font-bold text-white shadow-lg 
          transition-all duration-300 transform hover:scale-[1.02] active:scale-95
          ${
            items.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          }`}
      >
        <span className="relative z-10 flex items-center justify-center">
          Proceed to Checkout
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        {items.length > 0 && (
          <span className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-white/30 rounded-full animate-ping"></span>
        )}
      </button>
    </div>
  );
};

export default CartSummary;
