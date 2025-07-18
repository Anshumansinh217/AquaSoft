import React from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = ({ items, onUpdate, onRemove, source }) => {
  const customer = {
    name: "Anshumansinh Rathore",
    balance: 850.0,
    id: 12345,
  };

const subtotal = items.reduce(
  (sum, item) =>
    sum + Number(item.price) * item.quantity * (1 - (Number(item.discount) || 0) / 100),
  0
);

const gstTotal = items.reduce((sum, item) => {
  const gstRate = Number(item.gst) || 18;
  const itemTotal = Number(item.price) * item.quantity * (1 - (Number(item.discount) || 0) / 100);
  return sum + (itemTotal * gstRate) / 100;
}, 0);


  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg p-4 sm:p-6 group">
      <div className="mb-3">
        <div className="text-purple-900 font-semibold text-base sm:text-lg mb-1">
          Name: <span className="font-bold">{customer.name}</span>
        </div>
        <div className="flex justify-between text-blue-800 font-medium text-sm sm:text-base">
          <div>ID: {customer.id}</div>
          <div>Balance: ₹{customer.balance.toFixed(2)}</div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-purple-800/70 italic">No items added yet.</p>
      ) : (
        <>
          <div className="flex flex-col h-[300px]">
            <div className="border-b border-gray-300 pb-1 mb-1 text-sm font-semibold text-purple-900 grid grid-cols-[1fr_30px_30px_30px_70px_70px_30px] gap-2">
              <div>Item</div>
              <div className="col-span-3 text-center">Qty</div>
              <div className="text-right">Rate</div>
              <div className="text-right">Total</div>
              <div></div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={onUpdate} onRemove={onRemove} />
              ))}
            </div>

            <div className="border-t border-gray-300 pt-2 mt-2 text-sm font-semibold text-purple-900 grid grid-cols-[1fr_30px_30px_30px_55px_80px_30px] gap-2 items-center">
              <div>Total</div>
              <div className="col-span-3 text-center">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
              <div className="text-right"></div>
              <div className="text-right">₹{subtotal.toFixed(2)}</div>
              <div></div>
            </div>

            <div className="grid grid-cols-[1fr_30px_30px_30px_60px_80px_30px] gap-2 text-sm font-medium text-purple-800 mt-1">
              <div className="col-span-5 text-left pr-2">GST (Item Wise):</div>
              <div className="text-right font-semibold">₹{gstTotal.toFixed(2)}</div>
              <div></div>
            </div>
          </div>

          <div className="border-t border-purple-200 pt-3 mt-2"></div>
          <CartSummary items={items} source={source} />
        </>
      )}
    </div>
  );
};

export default Cart;
