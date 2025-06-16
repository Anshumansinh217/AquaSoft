import { useNavigate  } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CostumeReceipt = () => {
  const navigate = useNavigate();
 
  const receiptRef = useRef(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("costumeFormData"));
    setReceipt(data);
    if (receiptRef.current) {
      receiptRef.current.focus();
    }
  }, []);

  if (!receipt) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">No Receipt Data Available.</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
    navigate("/CostumeForm");
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here");
    navigate("/CostumeForm");
  };

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-container, .receipt-container * { visibility: visible; }
          .receipt-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 print:bg-white p-4">
        <div
          ref={receiptRef}
          className="receipt-container w-full max-w-sm bg-white p-6 shadow-md rounded-lg border border-gray-200 print:border-none print:shadow-none"
          tabIndex="-1"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-xl text-purple-700">🎭 Costume Receipt</h2>
            <p className="text-xs text-gray-500 mt-1">
              {new Date().toLocaleString()}
            </p>
          </div>

          {/* Items List */}
          <div className="space-y-2 border-t border-gray-200 pt-3">
            {receipt.costumeDetails.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} <span className="text-gray-500">(x{item.quantity})</span></span>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-4 pt-3 border-t border-dashed border-gray-300 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{receipt.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{receipt.gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base mt-2 pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>₹{receipt.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center">
            <p className="text-xs text-gray-600">Thank you for your costume rental!</p>
            <p className="text-[10px] text-gray-400 mt-2">Please keep this receipt for reference.</p>
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

export default CostumeReceipt;
