import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaPlus } from 'react-icons/fa';

const LockerMaster = () => {
  const [lockerNo, setLockerNo] = useState('');
  const [bandNo, setBandNo] = useState('');
  const [lockers, setLockers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('lockerMasterData')) || [];
    setLockers(stored);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem('lockerMasterData', JSON.stringify(data));
  };

  const handleAddLocker = () => {
    if (!lockerNo.trim()) return alert('Locker number is required');
    if (!bandNo.trim()) return alert('Band number is required');
    const isDuplicate = lockers.some(l => l.lockerNo === lockerNo);
    if (isDuplicate) return alert('Locker number already exists!');
    const newLocker = { lockerNo, bandNo, status: 'Available' };
    const updated = [...lockers, newLocker];
    setLockers(updated);
    saveToLocal(updated);
    setLockerNo('');
    setBandNo('');
  };

  const handleDeleteLocker = (lockerNo) => {
    const updated = lockers.filter(l => l.lockerNo !== lockerNo);
    setLockers(updated);
    saveToLocal(updated);
  };

  const toggleLockerStatus = (lockerNo) => {
    const updated = lockers.map(l =>
      l.lockerNo === lockerNo
        ? { ...l, status: l.status === 'Available' ? 'Deactivated' : 'Available' }
        : l
    );
    setLockers(updated);
    saveToLocal(updated);
  };

  return (
    <div className="relative px-6 py-10 sm:px-10 bg-white shadow-xl rounded-lg">
      <Link
        to="/admin"
        className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3 mb-8 top-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
          <FaLock className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Locker Master
        </h1>
      </div>

      <div className="mt-24" />

      {/* Input Fields */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <input
          type="text"
          placeholder="Enter Locker No"
          value={lockerNo}
          onChange={(e) => setLockerNo(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter Band No"
          value={bandNo}
          onChange={(e) => setBandNo(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm w-[200px] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleAddLocker}
          className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition"
        >
          <FaPlus className="w-4 h-4" />
          Add Locker
        </button>
      </div>

      {/* Locker Table */}
      {lockers.length === 0 ? (
        <p className="text-gray-500">No lockers added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm rounded-lg overflow-hidden shadow-md table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-left text-gray-700">
                <th className="p-3 border w-[50px]">#</th>
                <th className="p-3 border w-[150px]">Locker No</th>
                <th className="p-3 border w-[150px]">Band No</th>
                <th className="p-3 border w-[120px]">Status</th>
                <th className="p-3 border w-[240px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lockers.map((locker, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{locker.lockerNo}</td>
                  <td className="p-3 border">{locker.bandNo}</td>
                  <td
                    className={`p-3 border font-semibold text-center ${
                      locker.status === 'Available' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {locker.status}
                  </td>
                  <td className="p-3 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleLockerStatus(locker.lockerNo)}
                        className={`w-[100px] px-3 py-1 rounded text-white text-xs font-medium transition shadow ${
                          locker.status === 'Available'
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {locker.status === 'Available' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteLocker(locker.lockerNo)}
                        className="w-[100px] px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LockerMaster;
