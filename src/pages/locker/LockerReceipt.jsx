import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LockerReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.receiptData;
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return <div className="p-4 text-center text-red-500">No receipt data found!</div>;
  }

  return (
    <div className="p-4">
      <div
        ref={printRef}
        className="p-8 max-w-2xl mx-auto bg-white shadow-lg border rounded-md text-sm font-mono print:shadow-none print:border-none"
      >
        <h2 className="text-xl font-bold text-center mb-4 border-b pb-2">Locker Issuance Receipt</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><strong>Date:</strong> {data.date}</div>
          <div><strong>Time:</strong> {data.time}</div>
          <div><strong>Band No:</strong> {data.bandNo}</div>
          <div><strong>Customer Name:</strong> {data.customerName}</div>
          <div><strong>Mobile No:</strong> {data.mobileNo || '-'}</div>
          <div><strong>Payment By:</strong> {data.paymentBy}</div>
          {data.paymentBy !== 'Cash' && (
            <div><strong>Reference No:</strong> {data.referenceNo || '-'}</div>
          )}
        </div>

        <div className="mb-4 border-t pt-2">
          <p><strong>Selected Lockers:</strong> {data.lockers.join(', ')}</p>
          <p><strong>Deposit Amount:</strong> ₹{data.depositAmount}</p>
          <p><strong>Rent Amount:</strong> ₹{data.rentAmount}</p>
          <p><strong>Total Amount:</strong> ₹{data.totalAmount}</p>
          <p><strong>Band Balance:</strong> ₹{data.bandBalance}</p>
          <p><strong>Remaining Balance:</strong> ₹{data.bandRemainingBal}</p>
        </div>
      </div>

      {/* Buttons - Hidden while printing */}
      <div className="text-center pt-4 print:hidden flex justify-center gap-3">
        <button
          onClick={() => navigate('/locker-issuance')}
          className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded hover:bg-gray-400"
        >
          Back
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default LockerReceipt;
