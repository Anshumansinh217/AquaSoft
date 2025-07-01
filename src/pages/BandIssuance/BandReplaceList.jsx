import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet, faPlus } from '@fortawesome/free-solid-svg-icons';

const BandReplaceList = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bandReplacements')) || [];
    setRecords(stored);
    setFilteredData(stored);
  }, []);

  const handleSearch = () => {
    const search = searchText.trim().toLowerCase();
    const filtered = records.filter(
      d =>
        d.bandAcNo?.toLowerCase().includes(search) ||
        d.newBandAcNo?.toLowerCase().includes(search) ||
        d.customerName?.toLowerCase().includes(search) ||
        d.mobileNo?.includes(search)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
          <FontAwesomeIcon icon={faRetweet} className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Band Replace List
        </h1>

        <button
          onClick={() => navigate('/BandReplaceForm')}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium">Add Replace</span>
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-indigo-50 flex flex-wrap items-center gap-4 text-sm rounded-md mb-6 shadow-inner">
        <input
          type="text"
          placeholder="Search Band Ac No, Name or Mobile"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none flex-grow min-w-[200px]"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow hover:scale-105 transition-transform"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-indigo-100">
            <tr>
              {[
                'Sr',
                'Band Ac No',
                'New Band Ac No',
                'Customer Name',
                'Mobile No',
                'Band Type',
                'Locker No',
                'Reason'
              ].map((head) => (
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
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.bandAcNo}</td>
                  <td className="border p-2">{item.newBandAcNo}</td>
                  <td className="border p-2">{item.customerName}</td>
                  <td className="border p-2">{item.mobileNo}</td>
                  <td className="border p-2">{item.bandType}</td>
                  <td className="border p-2">{item.lockerNo}</td>
                  <td className="border p-2">{item.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BandReplaceList;
