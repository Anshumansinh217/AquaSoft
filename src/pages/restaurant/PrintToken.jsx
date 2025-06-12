import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const PrintToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef(null);
  const { items, token, source = "restaurant" } = location.state || {};

  // Receipt content configuration
  const receiptConfig = {
    restaurant: {
      title: " Restaurant Order",
      thankYou: "Thank you for dining with us!",
      icon: "🍽️",
    },
    ArticleSalesPage: {
      title: " Article Purchase",
      thankYou: "Thank you for shopping with us!",
      icon: "🛍️",
    },
    default: {
      title: " Order Receipt",
      thankYou: "Thank you for your purchase!",
      icon: "🧾",
    },
  };

  const currentConfig = receiptConfig[source] || receiptConfig.default;

  const handlePrint = () => {
    window.print();
    navigate(`/${source}`);
  };

  const handleDownloadPDF = () => {
    // In a real implementation, you would generate a PDF here
    alert("PDF download functionality would be implemented here");
    navigate(`/${source}`);
  };

  // Auto-focus the receipt div for better printing
  useEffect(() => {
    if (receiptRef.current) {
      receiptRef.current.focus();
    }
  }, []);

  if (!items) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">Invalid access. No data to print.</p>
      </div>
    );
  }

  // Calculate order totals
  const orderSummary = items.reduce(
    (acc, item) => {
      const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
      return {
        subtotal: acc.subtotal + itemTotal,
        items: [
          ...acc.items,
          {
            ...item,
            total: itemTotal,
          },
        ],
      };
    },
    { subtotal: 0, items: [] }
  );

  const gst = orderSummary.subtotal * 0.18;
  const total = orderSummary.subtotal + gst;

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-container, .receipt-container * {
            visibility: visible;
          }
          .receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 print:bg-white p-4">
        <div
          ref={receiptRef}
          className="receipt-container w-full max-w-xs bg-white p-6 shadow-md rounded-lg border border-gray-200 print:border-none print:shadow-none"
          tabIndex="-1"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-xl">
              {currentConfig.icon} {currentConfig.title}
            </h2>
            <p className="text-sm text-gray-600">Order Token: {token}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleString()}
            </p>
          </div>

          {/* Items List */}
          <div className="space-y-2 border-t border-gray-200 pt-3">
            {orderSummary.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} <span className="text-gray-500">(x{item.quantity})</span>
                </span>
                <span className="font-medium">₹{item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-4 pt-3 border-t border-dashed border-gray-300 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center">
            <p className="text-xs text-gray-600">{currentConfig.thankYou}</p>
            <p className="text-[10px] text-gray-400 mt-2">
              Please retain this receipt for your records
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 no-print">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Print Receipt
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintToken;