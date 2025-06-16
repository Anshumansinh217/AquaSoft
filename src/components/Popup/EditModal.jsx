// src/components/EditModal.jsx
import React, { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = useState(item || {});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-popup">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Band Issuance</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData?.customerName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={formData?.mobileNo || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={formData?.totalAmount || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex gap-4">
              {["Cash", "Card", "Online"].map((method) => (
                <label key={method} className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData?.paymentMethod === method}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {(formData.paymentMethod === "Online" || formData.paymentMethod === "Card") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference No.</label>
              <input
                type="text"
                name="referenceNo"
                value={formData?.referenceNo || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter reference number"
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:from-blue-600 hover:to-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
