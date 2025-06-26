import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LockerReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef(null);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const data = location.state?.receiptData;
    setReceipt(data);
    if (printRef.current) {
      printRef.current.focus();
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print();
    navigate("/locker-issuance");
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here.");
    navigate("/locker-issuance");
  };

  if (!receipt) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-medium">No Receipt Data Available.</p>
      </div>
    );
  }

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
          ref={printRef}
          className="receipt-container w-full max-w-sm bg-white p-6 shadow-md rounded-lg border border-gray-200 print:border-none print:shadow-none"
          tabIndex="-1"
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-xl text-indigo-700">🔐 Locker Issuance Receipt</h2>
            <p className="text-xs text-gray-500 mt-1">
              {receipt.date} at {receipt.time}
            </p>
          </div>

          {/* Basic Info */}
          <div className="text-sm space-y-1 border-t pt-3">
            <div><strong>Band No:</strong> {receipt.bandNo}</div>
            <div><strong>Customer:</strong> {receipt.customerName}</div>
            <div><strong>Mobile:</strong> {receipt.mobileNo || "-"}</div>
            <div><strong>Payment Mode:</strong> {receipt.paymentBy}</div>
            {receipt.paymentBy !== "Cash" && (
              <div><strong>Reference No:</strong> {receipt.referenceNo || "-"}</div>
            )}
          </div>

          {/* Locker Info */}
          <div className="mt-4 pt-3 border-t border-dashed border-gray-300 space-y-1 text-sm">
            <div><strong>Selected Lockers:</strong> {receipt.lockers.join(", ")}</div>
            <div><strong>Deposit Amount:</strong> ₹{receipt.depositAmount}</div>
            <div><strong>Rent Amount:</strong> ₹{receipt.rentAmount}</div>
            <div className="font-semibold border-t pt-2 mt-2"><strong>Total:</strong> ₹{receipt.totalAmount}</div>
          </div>

          {/* Balance Info */}
          <div className="mt-4 pt-3 border-t border-dashed border-gray-300 text-sm space-y-1">
            <div><strong>Band Balance:</strong> ₹{receipt.bandBalance}</div>
            <div><strong>Remaining Balance:</strong> ₹{receipt.bandRemainingBal}</div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 text-center">
            <p className="text-xs text-gray-600">Thank you for using our locker service!</p>
            <p className="text-[10px] text-gray-400 mt-2">Please keep this receipt for reference.</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 no-print">
            <button
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm transition-colors"
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

export default LockerReceipt;
