import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // at the top

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

function BandLockerSummary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [quarter, setQuarter] = useState("");
  const [counterNo, setCounterNo] = useState("");
  const [paymentBy, setPaymentBy] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  const tableRef = useRef();

  const summaryData = [
    {
      date: "2025-06-28",
      bandWithLocker: 15,
      bandWithoutLocker: 8,
      bandDeposit: 1500,
      lockerDeposit: 1200,
      lockerRent: 300,
      bandRecharge: 2000,
      grandTotal: 7000,
    },
    {
      date: "2025-06-29",
      bandWithLocker: 12,
      bandWithoutLocker: 5,
      bandDeposit: 1200,
      lockerDeposit: 1000,
      lockerRent: 250,
      bandRecharge: 1800,
      grandTotal: 6250,
    },
    {
      date: "2025-06-27",
      bandWithLocker: 10,
      bandWithoutLocker: 3,
      bandDeposit: 1100,
      lockerDeposit: 900,
      lockerRent: 200,
      bandRecharge: 1600,
      grandTotal: 5800,
    },
    {
      date: "2025-06-26",
      bandWithLocker: 9,
      bandWithoutLocker: 6,
      bandDeposit: 950,
      lockerDeposit: 800,
      lockerRent: 180,
      bandRecharge: 1500,
      grandTotal: 5430,
    },
    {
      date: "2025-06-25",
      bandWithLocker: 14,
      bandWithoutLocker: 4,
      bandDeposit: 1400,
      lockerDeposit: 1000,
      lockerRent: 220,
      bandRecharge: 1900,
      grandTotal: 6520,
    },
  ];

  // Filter logic
  const filteredData = summaryData.filter((item) => {
    const itemDate = new Date(item.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && itemDate < from) return false;
    if (to && itemDate > to) return false;

    if (searchText && !item.date.includes(searchText)) return false;

    return true;
  });

  // PDF Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Band-Locker Summary", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Date",
          "Band With Locker",
          "Band Without Locker",
          "Band Deposit",
          "Locker Deposit",
          "Locker Rent",
          "Band Recharge",
          "Grand Total",
        ],
      ],
      body: filteredData.map((item) => [
        item.date,
        item.bandWithLocker,
        item.bandWithoutLocker,
        `₹${item.bandDeposit}`,
        `₹${item.lockerDeposit}`,
        `₹${item.lockerRent}`,
        `₹${item.bandRecharge}`,
        `₹${item.grandTotal}`,
      ]),
    });
    doc.save("BandLockerSummary.pdf");
  };

  // Excel Export
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Summary");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "BandLockerSummary.xlsx");
  };

  // Print only table
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

    const navigate = useNavigate(); // inside the component


  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
            <div className="mb-6 relative gap-3 flex items-center justify-center">
  {/* Back Button - Left side */}
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
          Band-Locker Summary
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
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded-md shadow-sm flex-grow min-w-[200px]"
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
                "Band With Locker",
                "Band Without Locker",
                "Band Deposit",
                "Locker Deposit",
                "Locker Rent",
                "Band Recharge",
                "Grand Total",
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
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.bandWithLocker}</td>
                <td className="border p-2">{item.bandWithoutLocker}</td>
                <td className="border p-2">₹{item.bandDeposit}</td>
                <td className="border p-2">₹{item.lockerDeposit}</td>
                <td className="border p-2">₹{item.lockerRent}</td>
                <td className="border p-2">₹{item.bandRecharge}</td>
                <td className="border p-2 font-bold">₹{item.grandTotal}</td>
              </tr>
            ))}
          </tbody>
          <tr className="bg-green-200 font-semibold">
            <td className="border p-2 text-right">Total</td>
            <td className="border p-2">
              {filteredData.reduce((sum, item) => sum + item.bandWithLocker, 0)}
            </td>
            <td className="border p-2">
              {filteredData.reduce(
                (sum, item) => sum + item.bandWithoutLocker,
                0
              )}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.bandDeposit, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.lockerDeposit, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.lockerRent, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.bandRecharge, 0)}
            </td>
            <td className="border p-2 font-bold">
              ₹{filteredData.reduce((sum, item) => sum + item.grandTotal, 0)}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default BandLockerSummary;
