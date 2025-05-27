import React from "react";
import { X } from "lucide-react";

const CartItem = ({ item, onUpdate, onRemove }) => {
//   const handleChange = (value) => {
//     const parsedValue = parseInt(value);
//     onUpdate(item.id, "quantity", parsedValue);
//   };

  const totalPrice = item.price * item.quantity;

  return (
  <div className="bg-white/90 backdrop-blur-sm border border-purple-200 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 space-y-3">
  {/* Header Row */}
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-purple-900 text-lg">{item.name}</h3>
    <button
      onClick={() => onRemove(item.id)}
      className="text-red-500 hover:text-red-600 transition-colors"
      aria-label="Remove item"
    >
      <X size={18} />
    </button>
  </div>

     
      <div className="flex justify-between items-center gap-4">
        
        

               <div className="text-right">
          <p className="text-sm text-purple-700 font-medium">
            ₹{totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
