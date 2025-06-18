import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationModal from '../../components/Popup/DeleteConfirmationModal';

const LockerTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [paymentBy, setPaymentBy] = useState('ALL');
  const [searchText, setSearchText] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedData = JSON.parse(localStorage.getItem('lockerIssuanceData')) || [];
    setData(storedData);
    setFilteredData(storedData);
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null) return '0.00';
    const amount = typeof value === 'number' ? value : parseFloat(value) || 0;
    return amount.toFixed(2);
  };

  const handleSearch = () => {
    let tempData = [...data];

    if (fromDate) {
      tempData = tempData.filter(item => item.date >= fromDate);
    }
    if (toDate) {
      tempData = tempData.filter(item => item.date <= toDate);
    }
    if (paymentBy !== 'ALL') {
      tempData = tempData.filter(item => item.paymentBy === paymentBy);
    }
    if (searchText.trim() !== '') {
      const search = searchText.toLowerCase();
      tempData = tempData.filter(item =>
        item.customerName.toLowerCase().includes(search) ||
        item.mobileNo.toLowerCase().includes(search) ||
        item.bandNo.toLowerCase().includes(search)
      );
    }

    setFilteredData(tempData);
  };

  const handleDeleteClick = (index) => {
    setItemToDelete(index);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedData = data.filter((_, idx) => idx !== itemToDelete);
    localStorage.setItem('lockerIssuanceData', JSON.stringify(updatedData));
    loadData();
    setDeleteModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
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
            <FontAwesomeIcon icon={faLock} className="text-white text-xl" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Locker Issuance
          </h1>
        </div>

        <button
          onClick={() => navigate('/locker-issuance/new')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium">New Locker</span>
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-sky-50 flex flex-wrap gap-4">
        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="border p-2 rounded-md shadow-sm" />
        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="border p-2 rounded-md shadow-sm" />
        <select value={paymentBy} onChange={e => setPaymentBy(e.target.value)} className="border p-2 rounded-md shadow-sm">
          <option value="ALL">ALL</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
        <input type="text" placeholder="Search Here..." value={searchText} onChange={e => setSearchText(e.target.value)} className="border p-2 rounded-md shadow-sm" />
        <button onClick={handleSearch} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow hover:scale-105 transition">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border w-10">#</th>
                <th className="p-3 border w-24">Date</th>
                <th className="p-3 border w-24">Time</th>
                <th className="p-3 border w-52">Customer</th>
                <th className="p-3 border w-28">Mobile No</th>
                <th className="p-3 border w-20">Band No</th>
                <th className="p-3 border w-64">Locker No</th>
                <th className="p-3 border w-28">Payment By</th>
                <th className="p-3 border w-28">Rent Amt.</th>
                <th className="p-3 border w-28">Depo. Amt.</th>
                <th className="p-3 border w-28">Total Amt.</th>
                <th className="p-3 border w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr><td colSpan="12" className="text-center py-6 text-gray-400">No records found</td></tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border">{item.date}</td>
                    <td className="p-3 border">{item.time}</td>
                    <td className="p-3 border font-semibold">{item.customerName}</td>
                    <td className="p-3 border">{item.mobileNo}</td>
                    <td className="p-3 border">{item.bandNo}</td>
                    <td className="p-3 border">{item.lockers?.join(', ')}</td>
                    <td className="p-3 border">{item.paymentBy}</td>
                    <td className="p-3 border text-right">₹ {formatCurrency(item.rentAmount)}</td>
                    <td className="p-3 border text-right">₹ {formatCurrency(item.depositAmount)}</td>
                    <td className="p-3 border text-right font-semibold text-green-600">₹ {formatCurrency(item.totalAmount)}</td>
                    <td className="p-3 border text-center">
                      <button onClick={() => handleDeleteClick(index)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:scale-105 transition">
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

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default LockerTable;
