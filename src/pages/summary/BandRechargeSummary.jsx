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

function BandRechargeSummary() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const tableRef = useRef();

  const summaryData = [
    {
      date: "2025-06-28",
      bandRecharge: 10,
      issueTimeRechargeAmt: 2000,
      addRecharge: 5,
      addRechargeAmt: 1000,
      totalAmt: 3000,
    },
    {
      date: "2025-06-29",
      bandRecharge: 12,
      issueTimeRechargeAmt: 2200,
      addRecharge: 4,
      addRechargeAmt: 800,
      totalAmt: 3000,
    },
    {
      date: "2025-06-30",
      bandRecharge: 9,
      issueTimeRechargeAmt: 1800,
      addRecharge: 6,
      addRechargeAmt: 1200,
      totalAmt: 3000,
    },
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
    doc.text("Band-Recharge Summary", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "Date",
          "Band Recharge",
          "Issue Time Recharge Amt",
          "Add Recharge",
          "Add Recharge Amt",
          "Total Amt",
        ],
      ],
      body: filteredData.map((item) => [
        item.date,
        item.bandRecharge,
        `₹${item.issueTimeRechargeAmt}`,
        item.addRecharge,
        `₹${item.addRechargeAmt}`,
        `₹${item.totalAmt}`,
      ]),
    });
    doc.save("BandRechargeSummary.pdf");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "RechargeSummary");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "BandRechargeSummary.xlsx");
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
        <body>${printContent}</body>
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
            <div className="mb-6 relative flex  gap-3 items-center justify-center">
  {/* Back Button - Left side */}
  <button
    onClick={() => navigate("/")}
    className="absolute left-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
  >
    ← Back to Home
  </button>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
          <FontAwesomeIcon icon={faList} className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Band-Recharge Summary
        </h1>
      </div>

      <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm"
        />
        <input
          type="text"
          placeholder="Search by Date..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded-md shadow-sm min-w-[200px]"
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

      <div className="overflow-x-auto" ref={tableRef}>
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              {[
                "Date",
                "Band Recharge",
                "Issue Time Recharge Amt",
                "Add Recharge",
                "Add Recharge Amt",
                "Total Amt",
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
                <td className="border p-2">{item.bandRecharge}</td>
                <td className="border p-2">₹{item.issueTimeRechargeAmt}</td>
                <td className="border p-2">{item.addRecharge}</td>
                <td className="border p-2">₹{item.addRechargeAmt}</td>
                <td className="border p-2 font-bold">₹{item.totalAmt}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-indigo-200 font-semibold">
              <td className="border p-2 text-right">Total</td>
              <td className="border p-2">
                {filteredData.reduce((sum, item) => sum + item.bandRecharge, 0)}
              </td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, item) => sum + item.issueTimeRechargeAmt, 0)}
              </td>
              <td className="border p-2">
                {filteredData.reduce((sum, item) => sum + item.addRecharge, 0)}
              </td>
              <td className="border p-2">
                ₹{filteredData.reduce((sum, item) => sum + item.addRechargeAmt, 0)}
              </td>
              <td className="border p-2 font-bold">
                ₹{filteredData.reduce((sum, item) => sum + item.totalAmt, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default BandRechargeSummary;
