'use client';
import React, { useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faEye,
  faPrint,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const ActionButton = ({ icon, color, onClick }) => {
  const colorClasses = {
    blue: "hover:bg-blue-50/80 text-blue-500 hover:text-blue-600",
    green: "hover:bg-emerald-50/80 text-emerald-500 hover:text-emerald-600",
    purple: "hover:bg-purple-50/80 text-purple-500 hover:text-purple-600",
    red: "hover:bg-red-50/80 text-red-500 hover:text-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 ${colorClasses[color]} hover:shadow-sm`}
      type="button"
    >
      <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    </button>
  );
};

const TicketTable = () => {
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const ticketsJSON = localStorage.getItem("tickets");
    if (ticketsJSON) {
      try {
        const tickets = JSON.parse(ticketsJSON);
        setRowData(tickets);
      } catch (error) {
        console.error("Failed to parse tickets from localStorage", error);
      }
    }
  }, []);

  const totalPages = Math.ceil(rowData.length / pageSize);
  const indexOfLastEntry = currentPage * pageSize;
  const indexOfFirstEntry = indexOfLastEntry - pageSize;
  const currentEntries = rowData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const [colDefs] = useState([
    {
      field: "date",
      headerName: "Date",
      cellClass: "text-left text-sm px-4 py-3 font-medium",
      width: 120,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "time",
      headerName: "Time",
      cellClass: "text-left text-sm px-4 py-3 font-medium",
      width: 120,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "ticketNo",
      headerName: "Ticket No",
      cellClass: "text-left text-sm px-4 py-3 font-semibold text-gray-900",
      width: 140,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "adult",
      headerName: "Adult",
      cellClass: "text-left text-sm px-4 py-3 font-semibold text-gray-900",
      width: 100,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "children",
      headerName: "Children",
      cellClass: "text-left text-sm px-4 py-3 font-semibold text-gray-900",
      width: 110,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      headerName: "Tickets",
      valueGetter: (params) => params.data.adult + params.data.children,
      cellClass: "text-left text-sm px-4 py-3 font-semibold text-gray-900",
      width: 100,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "paymentBy",
      headerName: "Payment By",
      cellRendererFramework: (params) => {
        const isCard = params.value === "Card";
        return (
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              isCard
                ? "bg-blue-100/60 text-blue-800 border border-blue-200/50"
                : "bg-emerald-100/60 text-emerald-800 border border-emerald-200/50"
            }`}
          >
            {params.value}
          </span>
        );
      },
      cellClass: "text-left flex items-center justify-center h-full",
      width: 140,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      field: "amount",
      headerName: "Amount",
      cellRendererFramework: (params) => (
        <span className="text-gray-900 font-semibold flex items-center justify-center">
          <FontAwesomeIcon icon={faRupeeSign} className="mr-1 text-gray-500" />
          {params.value}
        </span>
      ),
      cellClass: "text-left",
      width: 120,
      cellStyle: { borderRight: "1px solid rgba(243, 244, 246, 0.5)" },
    },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <div className="flex items-center justify-center space-x-1 h-full">
          <ActionButton
            icon={faEye}
            color="blue"
            onClick={() => alert(`View ticket ${params.data.ticketNo}`)}
          />
          <ActionButton
            icon={faPrint}
            color="green"
            onClick={() => alert(`Print ticket ${params.data.ticketNo}`)}
          />
          <ActionButton
            icon={faEdit}
            color="purple"
            onClick={() => alert(`Edit ticket ${params.data.ticketNo}`)}
          />
          <ActionButton
            icon={faTrash}
            color="red"
            onClick={() => alert(`Delete ticket ${params.data.ticketNo}`)}
          />
        </div>
      ),
      cellClass: "text-center",
      width: 180,
    },
  ]);

  const defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    cellClass: "text-sm text-gray-700 px-4 py-3 font-medium",
    headerClass:
      "bg-gradient-to-r from-gray-50 to-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider px-4 py-4 border-none",
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl border border-gray-200/50 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Ticket Management
          <span className="block text-sm font-normal text-gray-500 mt-1">
            View and manage all ticket transactions
          </span>
        </h2>
        
      </div>

      <div
        className="ag-theme-alpine rounded-xl overflow-hidden border border-gray-200/50 shadow-sm"
        style={{ 
          height: 500, 
          width: "100%",
          '--ag-border-color': 'rgba(229, 231, 235, 0.5)',
          '--ag-row-border-color': 'rgba(243, 244, 246, 0.5)',
          '--ag-header-background-color': 'linear-gradient(to right, #f9fafb, #f3f4f6)',
          '--ag-odd-row-background-color': 'rgba(249, 250, 251, 0.5)',
        }}
      >
        <AgGridReact
          rowData={currentEntries}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={false}
          rowHeight={60}
          headerHeight={60}
          suppressCellFocus={true}
        />
      </div>

      {/* Enhanced Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500 font-medium">
          Showing <span className="text-gray-700 font-semibold">{indexOfFirstEntry + 1}</span>–<span className="text-gray-700 font-semibold">{Math.min(indexOfLastEntry, rowData.length)}</span> of <span className="text-gray-700 font-semibold">{rowData.length}</span> entries
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow-md border border-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;