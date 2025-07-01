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

function BandExpenseSummary() {
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
      depositAmt: 1500,
      lockerRent: 300,
      rechargeAmt: 2000,
      costumeRent: 500,
      restaurantAmt: 1200,
      articleSales: 700,
      bandReturnAmt: 300,
      balanceAmt: 500,
    },
    {
      date: "2025-06-29",
      depositAmt: 1200,
      lockerRent: 250,
      rechargeAmt: 1800,
      costumeRent: 400,
      restaurantAmt: 1000,
      articleSales: 600,
      bandReturnAmt: 200,
      balanceAmt: 550,
    },
    // Add more data as needed
  ];

  const filteredData = summaryData.filter((item) => {
    const itemDate = new Date(item.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && itemDate < from) return false;
    if (to && itemDate > to) return false;
    if (searchText && !item.date.includes(searchText)) return false;

    return true;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Band-Wise Expense Summary", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Date",
          "Deposit Amt",
          "Locker Rent",
          "Recharge Amt",
          "Costume Rent",
          "Restaurant Amt",
          "Article Sales",
          "Band Return Amt",
          "Balance Amt",
        ],
      ],
      body: filteredData.map((item) => [
        item.date,
        `₹${item.depositAmt}`,
        `₹${item.lockerRent}`,
        `₹${item.rechargeAmt}`,
        `₹${item.costumeRent}`,
        `₹${item.restaurantAmt}`,
        `₹${item.articleSales}`,
        `₹${item.bandReturnAmt}`,
        `₹${item.balanceAmt}`,
      ]),
    });
    doc.save("BandExpenseSummary.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Summary");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "BandExpenseSummary.xlsx");
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=650");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Expense Summary</title>
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

      <div className="mb-6 relative flex items-center justify-center">
  {/* Back Button - Left side */}
  <button
    onClick={() => navigate("/")}
    className="absolute left-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
  >
    ← Back to Home
  </button>

  {/* Centered Title & Icon */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
      <FontAwesomeIcon icon={faList} className="text-white text-xl" />
    </div>
    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      Band-Wise Expense Summary
    </h1>
  </div>
</div>


      {/* Filters same as before */}
      <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
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
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow hover:scale-105"
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

      {/* Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              {[
                "Date",
                "Deposit Amt",
                "Locker Rent",
                "Recharge Amt",
                "Costume Rent",
                "Restaurant Amt",
                "Article Sales",
                "Band Return Amt",
                "Balance Amt",
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
                <td className="border p-2">₹{item.depositAmt}</td>
                <td className="border p-2">₹{item.lockerRent}</td>
                <td className="border p-2">₹{item.rechargeAmt}</td>
                <td className="border p-2">₹{item.costumeRent}</td>
                <td className="border p-2">₹{item.restaurantAmt}</td>
                <td className="border p-2">₹{item.articleSales}</td>
                <td className="border p-2">₹{item.bandReturnAmt}</td>
                <td className="border p-2 font-bold">₹{item.balanceAmt}</td>
              </tr>
            ))}
          </tbody>
          <tr className="bg-indigo-200 font-semibold">
            <td className="border p-2 text-right">Total</td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.depositAmt, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.lockerRent, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.rechargeAmt, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.costumeRent, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.restaurantAmt, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.articleSales, 0)}
            </td>
            <td className="border p-2">
              ₹{filteredData.reduce((sum, item) => sum + item.bandReturnAmt, 0)}
            </td>
            <td className="border p-2 font-bold">
              ₹{filteredData.reduce((sum, item) => sum + item.balanceAmt, 0)}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default BandExpenseSummary;
