import React, { useState, useEffect } from 'react';
import { getAllBandIssuances, deleteBandIssuance } from '../../services/bandIssuanceService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit, faArrowLeft, faIdCard } from '@fortawesome/free-solid-svg-icons';

import EditModal from '../Popup/EditModal';

// After
import DeleteConfirmationModal from '../Popup/DeleteConfirmationModal';





// Main List Component
const BandIssuanceList = () => {
  const navigate = useNavigate();
  const [bandIssuances, setBandIssuances] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

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

  const handleEditClick = (item) => {
    setItemToEdit(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedItem) => {
    const updatedData = bandIssuances.map((record) => 
      record.id === updatedItem.id ? updatedItem : record
    );
    localStorage.setItem('bandIssuances', JSON.stringify(updatedData));
    loadData();
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '0.00';
    const amount = typeof value === 'number' ? value : parseFloat(value) || 0;
    return amount.toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
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

    {/* Table */}
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border w-10">#</th>
              <th className="p-3 border w-24">Band AC No</th>
              <th className="p-3 border w-64">Customer Name</th>
              <th className="p-3 border w-28">Mobile No</th>
              <th className="p-3 border w-28">Total</th>
              <th className="p-3 border w-32">Payment</th>
              <th className="p-3 border w-28">Issue Date</th>
              <th className="p-3 border text-center w-40">Actions</th>
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
                  <td className="p-3 border font-semibold">{item.customerName || '-'}</td>
                  <td className="p-3 border">{item.mobileNo || '-'}</td>
                  <td className="p-3 border font-semibold text-green-600">₹ {formatCurrency(item.totalAmount)}</td>
                  <td className="p-3 border">{item.paymentMethod || '-'}</td>
                  <td className="p-3 border">{formatDate(item.issueDate)}</td>
                  <td className="p-3 border text-center flex justify-center gap-2">
                    <button onClick={() => handleEditClick(item)} className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteClick(item.id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition">
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

    {/* Edit Modal */}
    <EditModal
  isOpen={editModalOpen}
  onClose={() => setEditModalOpen(false)}
  item={itemToEdit}
  onSave={handleSaveEdit}
/>


    {/* Delete Modal */}
    <DeleteConfirmationModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />

    <style jsx>{`
      @keyframes popup { 0% { transform: scale(0.9) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
      .animate-popup { animation: popup 0.2s ease-out forwards; }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      .animate-pulse { animation: pulse 1.5s infinite; }
    `}</style>
  </div>
);

};




export default BandIssuanceList;
