import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addBandIssuance } from '../../services/bandIssuanceService';

const BandIssuanceForm = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    bandAcNo: Yup.string().trim(),
    customerName: Yup.string().trim().required('Customer Name is required'),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile No. is required'),
    bandDeposit: Yup.number()
      .min(0, 'Must be at least 0')
      .required('Band Deposit is required'),
    rechargeAmount: Yup.number()
      .min(0, 'Must be at least 0')
      .required('Recharge Amount is required'),
    receivedAmount: Yup.number()
      .min(0, 'Must be at least 0')
      .required('Received Amount is required'),
    paymentMethod: Yup.string().oneOf(['Cash', 'Online', 'Card']).required('Select payment method'),
    referenceNo: Yup.string().trim(),
    remarks: Yup.string().trim()
  });

  const initialValues = {
    bandAcNo: '',
    customerName: '',
    mobileNo: '',
    bandDeposit: 100,
    rechargeAmount: 0,
    receivedAmount: 0,
    paymentMethod: 'Cash',
    referenceNo: '',
    remarks: ''
  };

  // Helper to calculate totals
  const calculateTotals = (values) => {
    const bandDeposit = Number(values.bandDeposit) || 0;
    const rechargeAmount = Number(values.rechargeAmount) || 0;
    const receivedAmount = Number(values.receivedAmount) || 0;

    const totalAmount = bandDeposit + rechargeAmount;
    const balanceAmount = totalAmount - receivedAmount;

    return { totalAmount, balanceAmount };
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Compact Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-bold">Band Issuance</h2>
        </div>

        <div className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              const { totalAmount, balanceAmount } = calculateTotals(values);
              const submissionData = {
                ...values,
                totalAmount,
                balanceAmount,
                issueDate: new Date().toISOString()
              };
              
              addBandIssuance(submissionData);
              setSubmitting(false);
              navigate('/band-issuance');
            }}
          >
            {({ values, handleChange, setFieldValue, isSubmitting }) => {
              const { totalAmount, balanceAmount } = calculateTotals(values);

              return (
                <Form className="space-y-3">
                  {/* Compact Customer Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Band AC No</label>
                      <Field
                        name="bandAcNo"
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                      <Field
                        name="customerName"
                        type="text"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                      />
                      <ErrorMessage name="customerName" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Mobile No. <span className="text-red-500">*</span></label>
                      <Field
                        name="mobileNo"
                        type="text"
                        maxLength="10"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                        onChange={e => /^\d*$/.test(e.target.value) && handleChange(e)}
                      />
                      <ErrorMessage name="mobileNo" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  {/* Compact Amounts Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Band Deposit</label>
                      <Field
                        name="bandDeposit"
                        type="number"
                        disabled
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Recharge Amount</label>
                      <Field
                        name="rechargeAmount"
                        type="number"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                      />
                      <ErrorMessage name="rechargeAmount" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Total Amount</label>
                      <input
                        value={totalAmount.toFixed(2)}
                        readOnly
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Compact Payment Method */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
                    <div className="flex space-x-2">
                      {['Cash', 'Online', 'Card'].map((method) => (
                        <label key={method} className="flex-1">
                          <Field
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            className="hidden peer"
                          />
                          <div className={`p-2 text-center text-xs rounded border cursor-pointer transition-colors
                            ${values.paymentMethod === method
                              ? 'border-indigo-500 bg-indigo-50 font-medium'
                              : 'border-gray-300 hover:bg-gray-50'}`}
                          >
                            {method}
                          </div>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Compact Payment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Received Amount</label>
                      <Field
                        name="receivedAmount"
                        type="number"
                        className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                      />
                      <ErrorMessage name="receivedAmount" component="div" className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Balance Amount</label>
                      <input
                        value={balanceAmount.toFixed(2)}
                        readOnly
                        className={`w-full px-3 py-2 text-sm rounded border ${balanceAmount > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}
                      />
                    </div>

                    {['Online', 'Card'].includes(values.paymentMethod) && (
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Reference No</label>
                        <Field
                          name="referenceNo"
                          type="text"
                          className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Compact Remarks */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Remarks</label>
                    <Field
                      as="textarea"
                      name="remarks"
                      rows="2"
                      className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Compact Form Actions */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/band-issuance')}
                      className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BandIssuanceForm;