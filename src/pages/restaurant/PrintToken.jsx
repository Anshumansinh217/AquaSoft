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

  // Grouping GST Data
  const gstSummary = {};
  let totalQty = 0;
  let grandTotal = 0;

  items.forEach(item => {
    const gstRate = item.gst ?? 0;
    const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
    const gstKey = `${gstRate}%`;

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
        <div ref={receiptRef} className="receipt-container w-full max-w-md bg-white p-6 shadow-md border border-gray-300" tabIndex="-1">
          {/* Company Info */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-xl">SplashDash</h2>
            <p className="text-sm text-gray-600">Address, City, State</p>
            <p className="text-sm text-gray-600">GSTIN: XXXXXXXXXXXXXX</p>
            <p className="text-sm text-green-600 font-semibold mt-1">
              You have saved ₹ {savedAmount.toFixed(2)}
            </p>
          </div>

          <hr className="border-dashed mb-2" />

          {/* Invoice Details */}
          <div className="text-sm mb-2">
            <div className="flex justify-between">
              <span>Tax Invoice</span>
              <span>Bill No: {token}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <hr className="border-dashed mb-2" />

          {/* Items List */}
          <table className="w-full text-xs border-collapse mb-2">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="text-left">HSN Code</th>
                <th className="text-left">Description</th>
                <th>Net Price</th>
                <th>Qty</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const itemTotal = item.price * item.quantity * (1 - item.discount / 100);
                return (
                  <tr key={item.id}>
                    <td>{item.hsn}</td>
                    <td>{item.name} (GST: {item.gst ?? 0}%)</td>

                    <td className="text-right">{item.price.toFixed(2)}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">{itemTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <hr className="border-dashed my-2" />

          {/* GST Summary */}
          <h3 className="text-sm font-semibold mb-1">GST Details</h3>
          <table className="w-full text-xs border-collapse mb-4">
            <thead className="border-b border-gray-300">
              <tr>
                <th>GST %</th>
                <th>Taxable Amt</th>
                <th>GST Amt</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gstSummary).map(([gstKey, gstData], idx) => (
                <tr key={idx}>
                  <td>{gstKey}</td>
                  <td className="text-right">{gstData.taxable.toFixed(2)}</td>
                  <td className="text-right">{gstData.gstAmount.toFixed(2)}</td>
                  <td className="text-right">{gstData.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="border-dashed my-2" />

          <div className="flex justify-between text-sm font-semibold">
            <span>Items: {items.length} | Qty: {totalQty}</span>
            <span>Total: ₹ {grandTotal.toFixed(2)}</span>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500">
            Thank you for shopping with us!
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 no-print">
            <button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
              Print Receipt
            </button>
            <button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintToken;
