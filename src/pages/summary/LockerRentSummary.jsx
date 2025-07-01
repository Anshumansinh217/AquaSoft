import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faList,
  faSearch,
  faFilePdf,
  faFileExcel,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function LockerRentSummary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [quarter, setQuarter] = useState("");
  const [counterNo, setCounterNo] = useState("");
  const [paymentBy, setPaymentBy] = useState("ALL");
  const [user, setUser] = useState("");
  const tableRef = useRef();
  const navigate = useNavigate();

  const summaryData = [
    {
      date: "2025-06-25",
      lockerRentAmt: 500,
      netAmt: 450,
      cgstAmt: 25,
      sgstAmt: 25,
      grossAmt: 500,
    },
    {
      date: "2025-06-26",
      lockerRentAmt: 600,
      netAmt: 540,
      cgstAmt: 30,
      sgstAmt: 30,
      grossAmt: 600,
    },
    {
      date: "2025-06-27",
      lockerRentAmt: 400,
      netAmt: 360,
      cgstAmt: 20,
      sgstAmt: 20,
      grossAmt: 400,
    },
  ];

  const filteredData = summaryData.filter((item) => {
    const itemDate = new Date(item.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && itemDate < from) return false;
    if (to && itemDate > to) return false;
    return true;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Locker-Rent Summary", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Date",
          "Locker Rent Amt",
          "Net Amt",
          "CGST Amt",
          "SGST Amt",
          "Gross Amt",
        ],
      ],
      body: filteredData.map((item) => [
        item.date,
        `₹${item.lockerRentAmt}`,
        `₹${item.netAmt}`,
        `₹${item.cgstAmt}`,
        `₹${item.sgstAmt}`,
        `₹${item.grossAmt}`,
      ]),
    });
    doc.save("LockerRentSummary.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "LockerRentSummary.xlsx");
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Summary</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; }
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
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6 relative gap-3 flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="absolute left-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
        >
          ← Back to Home
        </button>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-teal-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
          <FontAwesomeIcon icon={faList} className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
          Locker-Rent Summary
        </h1>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-green-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-300"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-400"
        />
        <select
          value={quarter}
          onChange={(e) => setQuarter(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        >
          <option value="">Select Quarter</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <input
          type="text"
          placeholder="Counter No"
          value={counterNo}
          onChange={(e) => setCounterNo(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        />
        <select
          value={paymentBy}
          onChange={(e) => setPaymentBy(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        >
          <option value="ALL">All Payments</option>
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="ONLINE">Online</option>
        </select>
        <input
          type="text"
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        />
        <button
          onClick={() => {}}
          className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-md shadow hover:scale-105"
        >
          <FontAwesomeIcon icon={faSearch} className="mr-2" />
          Search
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:scale-105"
        >
          <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
          PDF
        </button>
        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:scale-105"
        >
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" />
          Excel
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:scale-105"
        >
          <FontAwesomeIcon icon={faPrint} className="mr-2" />
          Print
        </button>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              {[
                "Date",
                "Locker Rent Amt",
                "Net Amt",
                "CGST Amt",
                "SGST Amt",
                "Gross Amt",
              ].map((head) => (
                <th
                  key={head}
                  className="border p-2 whitespace-nowrap text-left font-semibold text-gray-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">₹{item.lockerRentAmt}</td>
                <td className="border p-2">₹{item.netAmt}</td>
                <td className="border p-2">₹{item.cgstAmt}</td>
                <td className="border p-2">₹{item.sgstAmt}</td>
                <td className="border p-2 font-bold">₹{item.grossAmt}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-green-200 font-semibold">
              <td className="border p-2 text-right">Total</td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, i) => sum + i.lockerRentAmt, 0)}
              </td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, i) => sum + i.netAmt, 0)}
              </td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, i) => sum + i.cgstAmt, 0)}
              </td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, i) => sum + i.sgstAmt, 0)}
              </td>
              <td className="border p-2 font-bold">
                ₹{filteredData.reduce((sum, i) => sum + i.grossAmt, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default LockerRentSummary;
