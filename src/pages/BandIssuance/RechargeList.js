import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPlus } from '@fortawesome/free-solid-svg-icons';

function RechargeList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Filters state
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [paymentBy, setPaymentBy] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recharges')) || [];
    setData(stored);
    setFilteredData(stored);
  }, []);

  // Simple filter handler
  const handleSearch = () => {
    let filtered = [...data];

    // Filter by date range if date info exists in data (assuming it has a date field)
    // If no date field, skip this part or you can add a date field to recharge form if needed.

    if (paymentBy !== 'ALL') {
      filtered = filtered.filter(d => d.paymentMethod.toUpperCase() === paymentBy.toUpperCase());
    }

    if (searchText.trim() !== '') {
      const txt = searchText.trim().toLowerCase();
      filtered = filtered.filter(
        d =>
          d.bandAcNo.toLowerCase().includes(txt) ||
          d.name.toLowerCase().includes(txt) ||
          d.mobileNo.includes(txt)
      );
    }

    setFilteredData(filtered);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
          <FontAwesomeIcon icon={faCreditCard} className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Band Balance Recharge List
        </h1>

        <button
          onClick={() => navigate('/RechargeForm')}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium">Add Recharge</span>
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-sky-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="date"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
          placeholder="From Date"
        />
        <input
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="To Date"
        />
        <select
          value={paymentBy}
          onChange={e => setPaymentBy(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-pink-600 focus:outline-none"
        >
          <option value="ALL">All Payments</option>
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="ONLINE">Online</option>
        </select>
        <input
          type="text"
          placeholder="Search Band Ac No, Name or Mobile"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-pink-900 focus:outline-none flex-grow min-w-[200px]"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow hover:scale-105 transition-transform"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              {['Sr', 'Band Ac No', 'Name', 'Mobile No', 'Payment By', 'Total Amt', 'Reference No', 'Remarks'].map((head) => (
                <th key={head} className="border p-2 whitespace-nowrap text-left font-semibold text-gray-700">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500 italic">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.bandAcNo}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.mobileNo}</td>
                  <td className="border p-2">{item.paymentMethod}</td>
                  <td className="border p-2">{item.totalAmt}</td>
                  <td className="border p-2">{item.referenceNo || '-'}</td>
                  <td className="border p-2">{item.remarks || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RechargeList;
