import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilePdf, faFileExcel, faPrint, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

function BandCounterReport() {
  const [date, setDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("ALL");
  const [counterNo, setCounterNo] = useState("");
  const [searchText, setSearchText] = useState("");

  const tableRef = useRef();
  const navigate = useNavigate();

  const reportData = [
    {
      bandNo: "B001",
      bandAcNo: "AC001",
      customer: "Raj Patel",
      mobileNo: "9876543210",
      paymentMode: "CASH",
      rechargeAmt: 500,
    },
    {
      bandNo: "B002",
      bandAcNo: "AC002",
      customer: "Neha Mehta",
      mobileNo: "9822334455",
      paymentMode: "CARD",
      rechargeAmt: 700,
    },
    {
      bandNo: "B003",
      bandAcNo: "AC003",
      customer: "Amit Shah",
      mobileNo: "9898989898",
      paymentMode: "ONLINE",
      rechargeAmt: 600,
    },
  ];

  const filteredData = reportData.filter((item) => {
    const matchPayment = paymentMode === "ALL" || item.paymentMode === paymentMode;
    const matchSearch =
      !searchText ||
      item.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      item.mobileNo.includes(searchText);
    return matchPayment && matchSearch;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Counter-wise Band Recharge Report", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Sr", "Band No", "Band Ac No", "Customer", "Mobile No", "Payment Mode", "Recharge Amt"]],
      body: filteredData.map((item, idx) => [
        idx + 1,
        item.bandNo,
        item.bandAcNo,
        item.customer,
        item.mobileNo,
        item.paymentMode,
        `₹${item.rechargeAmt}`,
      ]),
    });
    doc.save("BandCounterReport.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData.map((item, idx) => ({
        Sr: idx + 1,
        "Band No": item.bandNo,
        "Band Ac No": item.bandAcNo,
        Customer: item.customer,
        "Mobile No": item.mobileNo,
        "Payment Mode": item.paymentMode,
        "Recharge Amt": item.rechargeAmt,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "BandCounterReport.xlsx");
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #e0f7fa; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-md border border-green-100">
      {/* Header */}
      <div className="mb-6 relative gap-3 flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="absolute left-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow hover:shadow-md border border-gray-300 text-gray-700 hover:text-green-700 transition-all duration-300"
        >
          ← Back to Home
        </button>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-md">
          <FontAwesomeIcon icon={faClipboardList} className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-teal-600">
          Counter-wise Band Recharge Report
        </h1>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 mb-6 bg-white border border-gray-200 rounded-md shadow-sm flex flex-wrap gap-4 text-sm items-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded shadow-sm"
        />
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="border p-2 rounded shadow-sm"
        >
          <option value="ALL">All Payments</option>
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="ONLINE">Online</option>
        </select>
        <input
          type="text"
          placeholder="Counter No"
          value={counterNo}
          onChange={(e) => setCounterNo(e.target.value)}
          className="border p-2 rounded shadow-sm"
        />
        <input
          type="text"
          placeholder="Search user"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded shadow-sm min-w-[200px]"
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded shadow hover:scale-105"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Search
        </button>
        <button onClick={exportPDF} className="px-4 py-2 bg-red-600 text-white rounded shadow hover:scale-105">
          <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
          PDF
        </button>
        <button onClick={exportExcel} className="px-4 py-2 bg-green-600 text-white rounded shadow hover:scale-105">
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
          Excel
        </button>
        <button onClick={handlePrint} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:scale-105">
          <FontAwesomeIcon icon={faPrint} className="mr-2" />
          Print
        </button>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full text-sm border border-gray-300 rounded overflow-hidden">
          <thead className="bg-cyan-100">
            <tr>
              {["Sr", "Band No", "Band Ac No", "Customer", "Mobile No", "Payment Mode", "Recharge Amt"].map((head) => (
                <th key={head} className="border p-2 text-left font-medium text-gray-700">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{item.bandNo}</td>
                <td className="border p-2">{item.bandAcNo}</td>
                <td className="border p-2">{item.customer}</td>
                <td className="border p-2">{item.mobileNo}</td>
                <td className="border p-2">{item.paymentMode}</td>
                <td className="border p-2 font-semibold text-green-700">₹{item.rechargeAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BandCounterReport;
