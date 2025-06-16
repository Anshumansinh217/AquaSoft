import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faShirt } from '@fortawesome/free-solid-svg-icons';

const CostumeBookingTable = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("costumeFormData");
    if (data) {
      setBookings([JSON.parse(data)]);  // for now single record as you are storing latest one
    }
  }, []);

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
            <FontAwesomeIcon icon={faShirt} className="text-white text-xl" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Costume Bookings
          </h1>
        </div>

        <button
          onClick={() => navigate('/CostumeForm')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} className="transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-medium">Add New</span>
        </button>
      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border w-10">#</th>
                <th className="p-3 border w-64">Costume Name</th>
                <th className="p-3 border w-24 text-center">Quantity</th>
                <th className="p-3 border w-24 text-center">Rate</th>
                <th className="p-3 border w-32 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-6 text-gray-400">No bookings found</td></tr>
              ) : (
                bookings.map((booking, index) =>
                  booking.costumeDetails.map((item, idx) => (
                    <tr key={`${index}-${idx}`} className="hover:bg-gray-50 transition">
                      <td className="p-3 border text-center">{idx + 1}</td>
                      <td className="p-3 border font-semibold">{item.name}</td>
                      <td className="p-3 border text-center">{item.quantity}</td>
                      <td className="p-3 border text-center">₹{item.price}</td>
                      <td className="p-3 border text-right">₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>

        {bookings.length > 0 && (
          <div className="mt-4 text-right text-lg font-semibold">
            Grand Total: ₹{bookings[0].totalAmount.toFixed(2)}
          </div>
        )}
      </div>

    </div>
  );
};

export default CostumeBookingTable;
