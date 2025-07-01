import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function RechargeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bandAcNo: '',
    bandBalAmt: '',
    name: '',
    mobileNo: '',
    rechargeAmt: '',
    totalAmt: '0.00',
    paymentMethod: 'CASH',
    referenceNo: '',
    remarks: ''
  });
  const [errors, setErrors] = useState({});

  // ✅ Updated Schema — Only `remarks` is optional
  const validationSchema = Yup.object().shape({
    bandAcNo: Yup.string().required('Band Ac No is required'),
    bandBalAmt: Yup.number().typeError('Must be a number').positive('Must be positive').required('Band Balance Amount is required'),
    name: Yup.string().required('Name is required'),
    mobileNo: Yup.string()
      .required('Mobile No is required')
      .matches(/^[0-9]{10}$/, 'Must be exactly 10 digits'),
    rechargeAmt: Yup.number().typeError('Must be a number').positive('Must be positive').required('Recharge Amount is required'),
    totalAmt: Yup.string().required(),
    paymentMethod: Yup.string().required('Payment Method is required'),
    referenceNo: Yup.string(), // Optional
    remarks: Yup.string() // Optional
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };

      if (name === 'bandBalAmt' || name === 'rechargeAmt') {
        const bandBal = parseFloat(name === 'bandBalAmt' ? value : prev.bandBalAmt) || 0;
        const recharge = parseFloat(name === 'rechargeAmt' ? value : prev.rechargeAmt) || 0;
        updated.totalAmt = (bandBal + recharge).toFixed(2);
      }

      return updated;
    });
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    const stored = JSON.parse(localStorage.getItem('recharges')) || [];
    const newRecharge = { ...formData, id: Date.now() };
    stored.push(newRecharge);
    localStorage.setItem('recharges', JSON.stringify(stored));
    navigate('/RechargeList');
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-bold">Recharge Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Band Ac No', name: 'bandAcNo' },
              { label: 'Band Balance Amount', name: 'bandBalAmt', type: 'number' },
              { label: 'Name', name: 'name' },
              { label: 'Mobile No', name: 'mobileNo', type: 'tel', maxLength: 10 },
              { label: 'Recharge Amount', name: 'rechargeAmt', type: 'number' },
              { label: 'Total Amount', name: 'totalAmt', disabled: true },
              {
                label: 'Reference Number',
                name: 'referenceNo',
                disabled: formData.paymentMethod === 'CASH'
              },
              { label: 'Remarks', name: 'remarks' }
            ].map(({ label, name, type = 'text', disabled, maxLength }) => (
              <div key={name}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  disabled={disabled}
                  maxLength={maxLength}
                  className={`w-full px-3 py-2 text-sm rounded border ${errors[name] ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
                />
                {errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
              <div className="flex items-center space-x-4 mt-1">
                {['CASH', 'CARD', 'ONLINE'].map(method => (
                  <label key={method} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleChange}
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-red-500 text-xs">{errors.paymentMethod}</p>}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              type="button"
              onClick={() => navigate('/RechargeList')}
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
}

export default RechargeForm;
