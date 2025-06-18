import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const PrintToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiptRef = useRef(null);
  const { items, token, source = "restaurant", savedAmount = 0 } = location.state || {};

  const handlePrint = () => {
    window.print();
    navigate(`/${source}`);
  };

  const handleDownloadPDF = () => {
    alert("PDF download functionality would be implemented here");
    navigate(`/${source}`);
  };

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

  // Grouping GST Data and Items
  const gstSummary = {};
  const groupedItems = {};
  let totalQty = 0;
  let grandTotal = 0;

  items.forEach(item => {
    const gstRate = item.gst ?? 0;
    const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
    const gstKey = `${gstRate}%`;

    // GST Summary Calculation
    if (!gstSummary[gstKey]) {
      gstSummary[gstKey] = {
        taxable: 0,
        gstAmount: 0,
        total: 0
      };
    }

    const taxableAmount = itemTotal / (1 + gstRate / 100);
    const gstAmount = taxableAmount * (gstRate / 100);
    const totalAmount = taxableAmount + gstAmount;

    gstSummary[gstKey].taxable += taxableAmount;
    gstSummary[gstKey].gstAmount += gstAmount;
    gstSummary[gstKey].total += totalAmount;

    // Grouping items by GST
    if (!groupedItems[gstKey]) {
      groupedItems[gstKey] = [];
    }
    groupedItems[gstKey].push(item);

    totalQty += item.quantity;
    grandTotal += itemTotal;
  });

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .receipt-container, .receipt-container * { visibility: visible; }
          .receipt-container { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div ref={receiptRef} className="receipt-container w-full max-w-md bg-white p-6 shadow-lg border border-gray-300 rounded-lg" tabIndex="-1">
          
          {/* Company Info */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-2xl text-gray-800">SplashDash</h2>
            <p className="text-sm text-gray-600">Address, City, State</p>
            <p className="text-sm text-gray-600">GSTIN: XXXXXXXXXXXXXX</p>
            <p className="text-sm text-green-600 font-semibold mt-2">
              You have saved ₹ {savedAmount.toFixed(2)}
            </p>
          </div>

          <hr className="border-dashed border-gray-300 mb-3" />

          {/* Invoice Details */}
          <div className="text-sm mb-3 space-y-1">
            <div className="flex justify-between font-medium">
              <span>Tax Invoice</span>
              <span>Bill No: {token}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <hr className="border-dashed border-gray-300 mb-3" />

          {/* Items Table */}
          <table className="w-full text-xs border-collapse mb-4">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr className="text-left text-gray-700 font-semibold">
                <th className="py-1">HSN Code</th>
                <th className="py-1">Description</th>
                <th className="py-1 text-right">Net Price</th>
                <th className="py-1 text-center">Qty</th>
                <th className="py-1 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([gstKey, group]) => (
                <>
                  <tr key={gstKey}>
                    <td colSpan={5} className="py-1 font-semibold text-blue-700">GST: {gstKey}</td>
                  </tr>
                  {group.map((item, idx) => {
                    const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
                    return (
                      <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-1">{item.hsn}</td>
                        <td className="py-1">{item.name}</td>
                        <td className="py-1 text-right">{item.price.toFixed(2)}</td>
                        <td className="py-1 text-center">{item.quantity}</td>
                        <td className="py-1 text-right">{itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>

          {/* GST Summary */}
          <h3 className="text-sm font-semibold text-gray-700 mb-2">GST Summary</h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr className="text-left text-gray-700 font-semibold">
                <th className="py-1">GST %</th>
                <th className="py-1 text-right">Taxable Amt</th>
                <th className="py-1 text-right">GST Amt</th>
                <th className="py-1 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gstSummary).map(([gstKey, gstData], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-1">{gstKey}</td>
                  <td className="py-1 text-right">{gstData.taxable.toFixed(2)}</td>
                  <td className="py-1 text-right">{gstData.gstAmount.toFixed(2)}</td>
                  <td className="py-1 text-right">{gstData.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <hr className="border-dashed border-gray-300 my-3" />
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            <span>Items: {items.length} | Qty: {totalQty}</span>
            <span>Total: ₹ {grandTotal.toFixed(2)}</span>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center text-xs text-gray-500 italic">
            Thank you for shopping with us!
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6 no-print">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm shadow"
            >
              Print Receipt
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm shadow"
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
