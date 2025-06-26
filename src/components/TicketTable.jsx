import React, { useState, useEffect } from "react";
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

import DeleteConfirmationModal from "../components/Popup/DeleteConfirmationModal";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);

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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleDeleteClick = (index) => {
    setSelectedTicketIndex(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTicketIndex !== null) {
      const updatedTickets = [...rowData];
      updatedTickets.splice(selectedTicketIndex, 1);
      setRowData(updatedTickets);
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      setDeleteModalOpen(false);
      setSelectedTicketIndex(null);
    }
  };

  return (
    <div>
      <div className="p-2">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border w-24">Date</th>
                <th className="p-3 border w-24">Time</th>
                <th className="p-3 border w-28">Ticket No</th>
                <th className="p-3 border w-20">Adult</th>
                <th className="p-3 border w-24">Children</th>
                <th className="p-3 border w-20">Total</th>
                <th className="p-3 border w-28">Payment By</th>
                <th className="p-3 border w-24">Amount</th>
                <th className="p-3 border text-center w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                currentEntries.map((item, index) => {
                  const adultCount = Number(item.adult) || 0;
                  const childrenCount = Number(item.children) || 0;
                  const totalCount = adultCount + childrenCount;

                  return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="p-3 border text-center">{formatDate(item.date)}</td>
                      <td className="p-3 border text-center">{item.time || "-"}</td>
                      <td className="p-3 border font-semibold text-center">{item.ticketNo || "-"}</td>
                      <td className="p-3 border text-center">{adultCount}</td>
                      <td className="p-3 border text-center">{childrenCount}</td>
                      <td className="p-3 border font-semibold text-center">{totalCount}</td>
                      <td className="p-3 border text-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            item.paymentBy === "Card"
                              ? "bg-blue-100/60 text-blue-800 border border-blue-200/50"
                              : "bg-emerald-100/60 text-emerald-800 border border-emerald-200/50"
                          }`}
                        >
                          {item.paymentBy || "-"}
                        </span>
                      </td>
                      <td className="p-3 border font-semibold text-center">
                        <span className="text-gray-900 font-semibold flex items-center justify-center">
                          <FontAwesomeIcon icon={faRupeeSign} className="mr-1 text-gray-500" />
                          {Number(item.amount).toFixed(2) || "0.00"}
                        </span>
                      </td>
                      <td className="p-3 border text-center">
                        <div className="flex items-center justify-center space-x-1 h-full">
                          <ActionButton
                            icon={faEye}
                            color="blue"
                            onClick={() => alert(`View ticket ${item.ticketNo}`)}
                          />
                          <ActionButton
                            icon={faPrint}
                            color="green"
                            onClick={() => alert(`Print ticket ${item.ticketNo}`)}
                          />
                          <ActionButton
                            icon={faEdit}
                            color="purple"
                            onClick={() => alert(`Edit ticket ${item.ticketNo}`)}
                          />
                          <ActionButton
                            icon={faTrash}
                            color="red"
                            onClick={() => handleDeleteClick(index)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-500 font-medium">
            Showing{" "}
            <span className="text-gray-700 font-semibold">{indexOfFirstEntry + 1}</span>–{" "}
            <span className="text-gray-700 font-semibold">{Math.min(indexOfLastEntry, rowData.length)}</span> of{" "}
            <span className="text-gray-700 font-semibold">{rowData.length}</span> entries
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TicketTable;
