import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BandReplaceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bandAcNo: '',
    balanceAmt: '',
    mobileNo: '',
    customerName: '',
    bandType: 'Type 1',
    lockerNo: '',
    newBandAcNo: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Validation (optional)
    if (!formData.bandAcNo || !formData.newBandAcNo) {
      setErrors({ bandAcNo: !formData.bandAcNo ? 'Required' : '', newBandAcNo: !formData.newBandAcNo ? 'Required' : '' });
      return;
    }

    // Save to localStorage for demo
    const existing = JSON.parse(localStorage.getItem('bandReplacements')) || [];
    localStorage.setItem('bandReplacements', JSON.stringify([...existing, formData]));
    navigate('/BandReplaceList');
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-bold">Band Replace Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Band AC No', name: 'bandAcNo' },
              { label: 'Balance Amount', name: 'balanceAmt', type: 'number' },
              { label: 'Mobile No', name: 'mobileNo', type: 'tel', maxLength: 10 },
              { label: 'Customer Name', name: 'customerName' },
              { label: 'Locker No', name: 'lockerNo' },
              { label: 'New Band AC No', name: 'newBandAcNo' },
              { label: 'Reason for Band Change', name: 'reason' }
            ].map(({ label, name, type = 'text', maxLength }) => (
              <div key={name}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  maxLength={maxLength}
                  className={`w-full px-3 py-2 text-sm rounded border ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Band Type</label>
              <div className="flex items-center space-x-4 mt-1">
                {['Type 1', 'Type 2'].map(type => (
                  <label key={type} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="bandType"
                      value={type}
                      checked={formData.bandType === type}
                      onChange={handleChange}
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="button"
              onClick={() => navigate('/BandReplaceList')}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BandReplaceForm;
