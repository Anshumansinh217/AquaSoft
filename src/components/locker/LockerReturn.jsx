import React, { useEffect, useState } from 'react';

const LockerReturn = () => {
  const [issuedData, setIssuedData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('lockerIssuanceData')) || [];
    setIssuedData(stored);
  }, []);

  const handleReturn = (index) => {
    const updated = [...issuedData];

    if (updated[index].status === 'Returned') {
      alert('Locker already returned.');
      return;
    }

    updated[index].status = 'Returned';
    updated[index].returnedAt = new Date().toLocaleString();

    localStorage.setItem('lockerIssuanceData', JSON.stringify(updated));

    const returnHistory = JSON.parse(localStorage.getItem('lockerReturnData')) || [];
    returnHistory.push(updated[index]);
    localStorage.setItem('lockerReturnData', JSON.stringify(returnHistory));

    setIssuedData(updated);
    alert('Locker returned successfully.');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔓 Locker Return</h2>

      {issuedData.length === 0 ? (
        <p>No lockers issued currently.</p>
      ) : (
        <table className="w-full text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Band No</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Mobile No</th>
              <th className="p-2 border">Lockers</th>
              <th className="p-2 border">Issued On</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Returned At</th> 
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedData.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 border">{entry.bandNo}</td>
                <td className="p-2 border">{entry.customerName}</td>
                <td className="p-2 border">{entry.mobileNo}</td>
                <td className="p-2 border">{entry.lockers?.join(', ')}</td>
                <td className="p-2 border">{entry.date} {entry.time}</td>
                <td className="p-2 border font-medium">
                  {entry.status === 'Returned' ? '✅ Returned' : '🟡 Issued'}
                </td>
                <td className="p-2 border">
                  {entry.returnedAt || '-'}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleReturn(index)}
                    disabled={entry.status === 'Returned'}
                    className={`px-2 py-1 rounded text-xs ${
                      entry.status === 'Returned'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-900'
                    }`}
                  >
                    {entry.status === 'Returned' ? 'Returned' : 'Return'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LockerReturn;
