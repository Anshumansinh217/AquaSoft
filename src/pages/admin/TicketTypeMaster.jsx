// TicketTypeMaster.jsx
import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaPlus } from "react-icons/fa";
import TicketTypeCard from "../../components/TicketTypeCard";
import DeleteConfirmationModal from "../../components/Popup/DeleteConfirmationModal";
import EditTicketModal from "../../components/Popup/EditTicketModal";
import { Link } from "react-router-dom";


const TicketTypeMaster = () => {
  const [form, setForm] = useState({
    name: "",
    adult: "",
    child: "",
    weekendAdult: "",
    weekendChild: "",
    color: "",
  });

  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [editTicket, setEditTicket] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ticketTypes");
      if (saved) setTicketTypes(JSON.parse(saved));
    } catch (err) {
      console.error("Failed to load ticket types from localStorage", err);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (ticketId, type, value) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        [type]: Math.max(0, value),
      },
    }));
  };

  const handleEditSave = (updatedTicket) => {
    const updated = ticketTypes.map((t) =>
      t.id === updatedTicket.id ? updatedTicket : t
    );
    setTicketTypes(updated);
    localStorage.setItem("ticketTypes", JSON.stringify(updated));
    setEditTicket(null);
  };

  const handleSave = () => {
    if (!form.name || !form.adult || !form.child) return;

    const newType = {
      id: Date.now(),
      name: form.name.trim(),
      price: {
        adult: Number(form.adult),
        child: Number(form.child),
        weekendAdult: Number(form.weekendAdult),
        weekendChild: Number(form.weekendChild),
      },
      color: form.color || "#ffffff",
    };

    const updatedTypes = [...ticketTypes, newType];
    setTicketTypes(updatedTypes);
    localStorage.setItem("ticketTypes", JSON.stringify(updatedTypes));
    setForm({
      name: "",
      adult: "",
      child: "",
      weekendAdult: "",
      weekendChild: "",
      color: "",
    });
  };

  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    const updated = ticketTypes.filter((t) => t.id !== deleteId);
    setTicketTypes(updated);
    localStorage.setItem("ticketTypes", JSON.stringify(updated));
    setDeleteId(null);
  };

  return (
<div className="p-6 space-y-8 max-w-7xl mx-auto">

 <div className="relative flex items-center justify-between py-4">
  {/* Back Button - Left */}
  <Link
    to="/admin"
    className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition"
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

  {/* Center Title */}
  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
      <FaTicketAlt className="text-white text-lg" />
    </div>
    <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
      Ticket Portal
    </h1>
  </div>

  {/* Add Ticket Button - Right */}
  {/* <button
    onClick={handleSave}
    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
  >
    <FaPlus className="group-hover:rotate-90 transition-transform" />
    <span className="font-medium text-sm">Add Ticket Type</span>
  </button> */}
</div>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
<div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold text-gray-800">
    Create New Ticket Type
  </h2>

  <button
    onClick={handleSave}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm shadow hover:shadow-md transition"
  >
    <FaPlus className="text-sm" />
    <span>Add Ticket Type</span>
  </button>
</div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["name", "adult", "child", "weekendAdult", "weekendChild"].map(
            (field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field === "name" ? "Ticket Name" : "0.00"}
                  type={field === "name" ? "text" : "number"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )
          )}

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              name="color"
              value={form.color}
              onChange={handleChange}
              type="color"
              className="w-full h-[42px] border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Ticket Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Your Ticket Types
        </h2>
        {ticketTypes.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No ticket types created yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ticketTypes.map((type, index) => (
              <div key={type.id} className="relative group">
                <TicketTypeCard
                  type={type}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  ticketQuantities={ticketQuantities}
                  handleQuantityChange={handleQuantityChange}
                  colorIndex={index}
                  customColor={type.color}
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditTicket(type)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(type.id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm"
                    title="Delete"
                  >
                    ×
                  </button>
                  
                </div>
              </div>
              
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />
      <EditTicketModal
        isOpen={!!editTicket}
        ticket={editTicket}
        onClose={() => setEditTicket(null)}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default TicketTypeMaster;
