import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({ items, onUpdate, onRemove }) => {
  const customer = {
    name: "Ravi Mehta",
    balance: 850.00,
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg p-4 sm:p-6 group">
      
      {/* Customer Info */}
      <div className="mb-3 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="text-purple-900 font-semibold text-base sm:text-lg">
        Customer: <span className="font-bold">{customer.name}</span>
        </div>
        <div className="text-blue-800 font-medium text-sm sm:text-base mt-1 sm:mt-0">
          Balance: ₹{customer.balance.toFixed(2)}
        </div>
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-purple-900 mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-purple-800/70 italic">No items added yet.</p>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-purple-200 pt-3 mt-2"></div>

          <CartSummary items={items} />
        </>
      )}
    </div>
  );
};

export default Cart;
