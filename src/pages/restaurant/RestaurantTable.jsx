import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { getRestaurantBookings } from "../../services/bookingService"; // or wherever your service is

const RestaurantTable = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getRestaurantBookings());
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
            <FontAwesomeIcon icon={faShoppingBag} className="text-white text-xl" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Restaurant Order Booking
          </h1>
        </div>

        <button
          onClick={() => navigate('/restaurant')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>New Sale</span>
        </button>

      </div>

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden text-sm text-gray-700">
            <thead className="bg-gradient-to-r from-sky-100 to-blue-100 text-gray-700">
              <tr>
                <th className="p-3 border w-10">#</th>
                <th className="p-3 border">Token</th>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((booking, index) => (
                <tr key={booking.token} className="hover:bg-gray-50 transition">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{booking.token}</td>
                  <td className="p-3 border">{booking.customer.name}</td>
                  <td className="p-3 border">{booking.items.length}</td>
                  <td className="p-3 border font-semibold text-green-600">₹ {booking.total.toFixed(2)}</td>
                  <td className="p-3 border">{new Date(booking.date).toLocaleString()}</td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center py-6 text-gray-400">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTable;
