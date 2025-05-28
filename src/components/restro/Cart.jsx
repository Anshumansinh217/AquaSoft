import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({ items, onUpdate, onRemove }) => {
  const customer = {
    name: "Anshumansinh Rathore",
    balance: 850.00,
    id:12345,
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );

  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg p-4 sm:p-6 group">
      
     <div className="mb-3">
  {/* Line 1: Customer Name */}
  <div className="text-purple-900 font-semibold text-base sm:text-lg mb-1">
    Name: <span className="font-bold">{customer.name}</span>
  </div>

  {/* Line 2: ID and Balance */}
  <div className="flex justify-between text-blue-800 font-medium text-sm sm:text-base">
    <div>ID: {customer.id}</div>
    <div>Balance: ₹{customer.balance.toFixed(2)}</div>
  </div>
</div>


      {/* <h2 className="text-lg sm:text-xl font-bold text-purple-900 mb-4">Your Cart</h2> */}

      {items.length === 0 ? (
        <p className="text-purple-800/70 italic">No items added yet.</p>
      ) : (
        <>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
             {/* Header Row */}
  <div className="border-b border-gray-300 pb-1 mb-2 text-sm font-semibold text-purple-900 grid grid-cols-[1fr_30px_30px_30px_60px_70px_30px] gap-2">
    <div>Item</div>
    <div className="col-span-3 text-center">Qty</div>
    <div className="text-right">Rate</div>
    <div className="text-right">Total</div>
    <div></div>
  </div>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={onUpdate}
                onRemove={onRemove}
              />
            ))}
          </div>
           <div className="border-b border-gray-300 pb-1 mb-2 text-sm font-semibold text-purple-900 grid grid-cols-[1fr_30px_30px_30px_60px_70px_30px] gap-2">
    <div>Total</div>
    <div className="col-span-3 text-center">{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
    <div className="text-right"></div>
    <div className="text-right">₹{subtotal.toFixed(2)}</div>
    <div></div>
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
