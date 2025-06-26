import React, { useState, useEffect } from "react";

const EditTicketModal = ({ isOpen, onClose, onSave, ticket }) => {
  const [form, setForm] = useState({
    name: "",
    adult: "",
    child: "",
    weekendAdult: "",
    weekendChild: "",
  });

  useEffect(() => {
    if (ticket) {
      setForm({
        name: ticket.name || "",
        adult: ticket.price.adult || "",
        child: ticket.price.child || "",
        weekendAdult: ticket.price.weekendAdult || "",
        weekendChild: ticket.price.weekendChild || "",
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      ...ticket,
      name: form.name.trim(),
      price: {
        adult: Number(form.adult),
        child: Number(form.child),
        weekendAdult: Number(form.weekendAdult),
        weekendChild: Number(form.weekendChild),
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-popup space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Edit Ticket Type</h3>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
          <input name="adult" value={form.adult} onChange={handleChange} placeholder="Adult Rate" type="number" className="input" />
          <input name="child" value={form.child} onChange={handleChange} placeholder="Child Rate" type="number" className="input" />
          <input name="weekendAdult" value={form.weekendAdult} onChange={handleChange} placeholder="Weekend Adult" type="number" className="input" />
          <input name="weekendChild" value={form.weekendChild} onChange={handleChange} placeholder="Weekend Child" type="number" className="input" />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditTicketModal;
