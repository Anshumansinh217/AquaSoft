import React, { useState, useEffect } from 'react';
import { getAllBandIssuances, deleteBandIssuance } from '../../services/bandIssuanceService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faArrowLeft, faIdCard } from '@fortawesome/free-solid-svg-icons';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md animate-popup">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
            Delete Confirmation
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete this band issuance record? This action cannot be undone.
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:from-red-600 hover:to-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BandIssuanceList = () => {
  const navigate = useNavigate();
  const [bandIssuances, setBandIssuances] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getAllBandIssuances();
    setBandIssuances(data);
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBandIssuance(itemToDelete);
    loadData();
    setDeleteModalOpen(false);
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '0.00';
    const amount = typeof value === 'number' ? value : parseFloat(value) || 0;
    return amount.toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="px-8 py-6 border-b border-gray-200/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 relative">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Dashboard</span>
        </button>

        <div className="flex items-center gap-3 order-first sm:order-none">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
            <FontAwesomeIcon icon={faIdCard} className="text-white text-xl" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Band Issuance
          </h1>
        </div>

        <button
          onClick={() => navigate('/band-issuance/new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium">New Band</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Band AC No</th>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Mobile No</th>
                <th className="p-3 border">Total Amount</th>
                <th className="p-3 border">Payment Method</th>
                <th className="p-3 border">Issue Date</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bandIssuances.length === 0 ? (
                <tr><td colSpan="8" className="text-center py-6 text-gray-400">No records found</td></tr>
              ) : (
                bandIssuances.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{item.bandAcNo || '-'}</td>
                    <td className="p-3 border">{item.customerName || '-'}</td>
                    <td className="p-3 border">{item.mobileNo || '-'}</td>
                    <td className="p-3 border font-semibold text-green-600">₹ {formatCurrency(item.totalAmount)}</td>
                    <td className="p-3 border">{item.paymentMethod || '-'}</td>
                    <td className="p-3 border">
                      {item.issueDate 
                        ? new Date(item.issueDate).toLocaleString()
                        : '-'}
                    </td>
                    <td className="p-3 border text-center">
                      <button 
                        onClick={() => handleDeleteClick(item.id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      {/* Add these styles to your global CSS or style tag */}
      <style jsx>{`
        @keyframes popup {
          0% {
            transform: scale(0.9) translateY(20px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .animate-popup {
          animation: popup 0.2s ease-out forwards;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default BandIssuanceList;