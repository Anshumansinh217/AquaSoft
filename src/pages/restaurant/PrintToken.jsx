import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

  // GST Grouping
  const gstSummary = {};
  const groupedItems = {};
  let totalQty = 0;
  let grandTotal = 0;

  items.forEach((item) => {
    // Convert fields to numbers to avoid errors
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    const discount = Number(item.discount) || 0;
    const gstRate = Number(item.gst) || 0;

    const itemTotal = price * quantity * (1 - discount / 100);
    const gstKey = `${gstRate}%`;

    if (!gstSummary[gstKey]) {
      gstSummary[gstKey] = { taxable: 0, gstAmount: 0, total: 0 };
    }

    // Assuming price includes GST, calculate taxable and GST amount
    const taxableAmount = gstRate > 0 ? itemTotal / (1 + gstRate / 100) : itemTotal;
    const gstAmount = gstRate > 0 ? itemTotal - taxableAmount : 0;
    const totalAmount = taxableAmount + gstAmount;

    gstSummary[gstKey].taxable += taxableAmount;
    gstSummary[gstKey].gstAmount += gstAmount;
    gstSummary[gstKey].total += totalAmount;

    if (!groupedItems[gstKey]) {
      groupedItems[gstKey] = [];
    }
    groupedItems[gstKey].push(item);

    totalQty += quantity;
    grandTotal += itemTotal;
  });

  return (
    <>
      <style>{`
        @page {
          margin: 0;
          size: auto;
          padding-left: 15px;
          padding-top: 15px;
        }
        @media print {
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            background: white;
          }
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
            width: 2.83in;
            padding: 0;
            margin: 0;
            font-size: 10px;
            box-sizing: border-box;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div
          ref={receiptRef}
          className="receipt-container bg-white text-xs"
          tabIndex="-1"
        >
          {/* Header */}
          <div className="text-center mb-2">
            <h2 className="font-bold text-lg text-gray-800 leading-tight">SplashDash</h2>
            <p className="text-[10px] text-gray-600">Address, City, State</p>
            <p className="text-[10px] text-gray-600">GSTIN: XXXXXXXXXXXXXX</p>
            <p className="text-[10px] text-green-600 font-semibold mt-1">
              You saved ₹ {Number(savedAmount).toFixed(2)}
            </p>
          </div>

          <hr className="border-dashed border-gray-400 my-1" />

          {/* Invoice Info */}
          <div className="text-[10px] mb-2">
            <div className="flex justify-between font-medium">
              <span>Tax Invoice</span>
              <span>Bill No: {token}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString("en-GB")}</span>
            </div>
          </div>

          <hr className="border-dashed border-gray-400 my-1" />

          {/* Items */}
          <table className="w-full text-[10px] border-collapse mb-2">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr className="text-left text-gray-700 font-semibold">
                <th className="py-[2px]">HSN</th>
                <th className="py-[2px]">Item</th>
                <th className="py-[2px] text-right">Rate</th>
                <th className="py-[2px] text-center">Qty</th>
                <th className="py-[2px] text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedItems).map(([gstKey, group]) => (
                <React.Fragment key={gstKey}>
                  <tr>
                    <td colSpan={5} className="py-1 font-semibold text-blue-700">
                      GST: {gstKey}
                    </td>
                  </tr>
                  {group.map((item, idx) => {
                    const price = Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 0;
                    const discount = Number(item.discount) || 0;
                    const itemTotal = price * quantity * (1 - discount / 100);

                    return (
                      <tr key={item.id || idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-[2px]">{item.hsn || "-"}</td>
                        <td className="py-[2px]">{item.name || "Unknown"}</td>
                        <td className="py-[2px] text-right">{price.toFixed(2)}</td>
                        <td className="py-[2px] text-center">{quantity}</td>
                        <td className="py-[2px] text-right">{itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* GST Summary */}
          <h3 className="text-[10px] font-semibold text-gray-700 mb-1">GST Summary</h3>
          <table className="w-full text-[10px] border-collapse mb-2">
            <thead className="border-b border-gray-300 bg-gray-50">
              <tr className="text-left text-gray-700 font-semibold">
                <th className="py-[2px]">GST %</th>
                <th className="py-[2px] text-right">Taxable</th>
                <th className="py-[2px] text-right">GST Amt</th>
                <th className="py-[2px] text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(gstSummary).map(([gstKey, gstData], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-[2px]">{gstKey}</td>
                  <td className="py-[2px] text-right">{gstData.taxable.toFixed(2)}</td>
                  <td className="py-[2px] text-right">{gstData.gstAmount.toFixed(2)}</td>
                  <td className="py-[2px] text-right">{gstData.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <hr className="border-dashed border-gray-400 my-1" />
          <div className="flex justify-between text-[10px] font-semibold text-gray-800">
            <span>Items: {items.length} | Qty: {totalQty}</span>
            <span>Total: ₹ {grandTotal.toFixed(2)}</span>
          </div>

          {/* Footer */}
          <div className="mt-2 text-center text-[10px] text-gray-500 italic">
            Thank you for shopping with us!
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-4 no-print">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-[11px]"
            >
              Print Receipt
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-[11px]"
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
