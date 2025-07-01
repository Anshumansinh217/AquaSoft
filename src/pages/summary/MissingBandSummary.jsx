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

function MissingBandSummary() {
  const [date, setDate] = useState("");
  const [bandNo, setBandNo] = useState("");
  const tableRef = useRef();
  const navigate = useNavigate();

  const summaryData = [
    {
      sr: 1,
      bandAcNo: "BAND001",
      bandNo: "12345",
      customer: "Rahul Sharma",
      mobile: "9876543210",
      balance: 150,
      date: "2025-06-28",
    },
    {
      sr: 2,
      bandAcNo: "BAND002",
      bandNo: "12346",
      customer: "Priya Mehta",
      mobile: "7890123456",
      balance: 100,
      date: "2025-06-28",
    },
    {
      sr: 3,
      bandAcNo: "BAND003",
      bandNo: "12347",
      customer: "Karan Patel",
      mobile: "9871234560",
      balance: 120,
      date: "2025-06-29",
    },
  ];

  const filteredData = summaryData.filter((item) => {
    const itemDate = new Date(item.date).toISOString().split("T")[0];
    const inputDate = date ? new Date(date).toISOString().split("T")[0] : "";

    if (inputDate && itemDate !== inputDate) return false;
    if (bandNo && !item.bandNo.includes(bandNo)) return false;

    return true;
  });

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Missing Band Summary", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [
        ["Sr.", "Band Ac No", "Band No", "Customer", "Mobile No", "Balance Amt"],
      ],
      body: filteredData.map((item) => [
        item.sr,
        item.bandAcNo,
        item.bandNo,
        item.customer,
        item.mobile,
        `₹${item.balance}`,
      ]),
    });
    doc.save("MissingBandSummary.pdf");
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
    saveAs(file, "MissingBandSummary.xlsx");
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
      <div className="mb-6 relative flex items-center gap-3 justify-center">
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
          Missing Band Summary
        </h1>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-green-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          placeholder="Band No"
          value={bandNo}
          onChange={(e) => setBandNo(e.target.value)}
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

     <div className="overflow-x-auto" ref={tableRef}>
  <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
    <thead className="bg-green-100">
      <tr>
        {["Sr.", "Band Ac No", "Band No", "Customer", "Mobile No", "Balance Amt"].map((head) => (
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
          <td className="border p-2">{item.sr}</td>
          <td className="border p-2">{item.bandAcNo}</td>
          <td className="border p-2">{item.bandNo}</td>
          <td className="border p-2">{item.customer}</td>
          <td className="border p-2">{item.mobile}</td>
          <td className="border p-2 font-bold">₹{item.balance}</td>
        </tr>
      ))}
    </tbody>
    {/* Total Row */}
    <tfoot>
      <tr className="bg-green-200 font-semibold">
        <td colSpan={5} className="border p-2 text-right">Total</td>
        <td className="border p-2 font-bold">
          ₹
          {filteredData.reduce((sum, item) => sum + Number(item.balance || 0), 0)}
        </td>
      </tr>
    </tfoot>
  </table>
</div>

    </div>
  );
}

export default MissingBandSummary;
