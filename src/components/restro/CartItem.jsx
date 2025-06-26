import React from "react";
import { X, Minus, Plus } from "lucide-react";

const CartItem = ({ item, onUpdate, onRemove }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdate(item.id, "quantity", item.quantity - 1);
    } else {
      onRemove(item.id);
    }
  };

  const handleIncrease = () => {
    onUpdate(item.id, "quantity", item.quantity + 1);
  };

 

  const price = Number(item.price) || 0;
 const totalPrice = price * item.quantity;;
  

  return (
    <>
    
    <div className="border-t border-gray-200 first:border-t-0">
      
      <div className="grid grid-cols-[1fr_30px_30px_30px_60px_70px_30px] items-center gap-2 text-sm text-purple-800 py-2">
        {/* ITEM */}
        <div className="font-semibold text-purple-900">{item.name}</div>

        {/* PLUS */}
        <button
          onClick={handleIncrease}
          className="text-green-700 hover:text-green-400 transition-colors"
          title="Increase quantity"
        >
          <Plus size={16} />
        </button>

        {/* QTY */}
        <div className="text-center">{item.quantity}</div>

        {/* MINUS */}
        <button
          onClick={handleDecrease}
          className="text-red-900 hover:text-red-500 transition-colors"
          title="Decrease quantity"
        >
          <Minus size={16} />
        </button>

<div className="text-right">₹{price.toFixed(2)}</div>
<div className="text-right">₹{totalPrice.toFixed(2)}</div>

        {/* REMOVE */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 transition-colors"
          title="Remove item"
        >
          <X size={16} />
        </button>
      </div>
    </div>
    </>
  );
};

export default CartItem;
