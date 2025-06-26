import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const LockerIssuanceForm = () => {
  const navigate = useNavigate();
  const [availableLockers, setAvailableLockers] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const allLockers = JSON.parse(localStorage.getItem('lockerMasterData')) || [];

    const issuedData = JSON.parse(localStorage.getItem('lockerIssuanceData')) || [];
    const issuedLockers = issuedData
      .filter(entry => entry.status !== 'Returned')
      .flatMap(entry => entry.lockers || []);

    const freeLockers = allLockers.filter(locker => !issuedLockers.includes(locker.lockerNo));
    setAvailableLockers(freeLockers); // Store full locker objects
  }, []);

  const initialValues = {
    bandNo: '',
    customerName: '',
    mobileNo: '',
    paymentBy: 'Cash',
    referenceNo: '',
    lockers: [''],
  };

  const validationSchema = Yup.object().shape({
    mobileNo: Yup.string().required('Required'),
    customerName: Yup.string().required('Required'),
    paymentBy: Yup.string().required('Required'),
    lockers: Yup.array().of(Yup.string().required('Select locker')),
  });

  const handleMobileChange = (e, setFieldValue) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setFieldValue("mobileNo", value);
  };

  const handleSubmit = (values) => {
    const lockerCount = values.lockers.filter(locker => locker !== '').length;
    const depositAmount = 200;
    const rentAmount = 150 * lockerCount;
    const totalAmount = depositAmount + rentAmount;
    const bandBalance = 5000;
    const remainingBal = bandBalance - totalAmount;

    const newEntry = {
      ...values,
      depositAmount,
      rentAmount,
      bandBalance,
      totalAmount,
      bandRemainingBal: remainingBal,
      status: 'Issued',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const existingData = JSON.parse(localStorage.getItem('lockerIssuanceData')) || [];
    existingData.push(newEntry);
    localStorage.setItem('lockerIssuanceData', JSON.stringify(existingData));

    navigate('/LockerReceipt', { state: { receiptData: newEntry } });
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <h2 className="text-xl font-bold">Locker Issuance</h2>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => {
            const lockerCount = values.lockers.filter(l => l !== '').length;
            const depositAmount = 200;
            const rentAmount = 150 * lockerCount;
            const totalAmount = depositAmount + rentAmount;
            const bandBalance = 5000;
            const remainingBal = bandBalance - totalAmount;

            const getAvailableOptions = (selectedLockers) => {
              return availableLockers.filter(l => !selectedLockers.includes(l.lockerNo));
            };

            return (
              <Form className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Band No</label>
                    <Field name="bandNo" className="w-full px-3 py-2 text-sm rounded border border-gray-300" />
                    <ErrorMessage name="bandNo" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Band Balance</label>
                    <input value={bandBalance} disabled className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
                    <Field name="customerName" className="w-full px-3 py-2 text-sm rounded border border-gray-300" />
                    <ErrorMessage name="customerName" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mobile No</label>
                    <Field name="mobileNo">
                      {({ field }) => (
                        <input
                          {...field}
                          className="w-full px-3 py-2 text-sm rounded border border-gray-300"
                          onChange={(e) => handleMobileChange(e, setFieldValue)}
                          value={field.value}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="mobileNo" component="div" className="text-red-500 text-xs" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Deposit Amount</label>
                    <input value={depositAmount} disabled className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rent Amount</label>
                    <input value={rentAmount} disabled className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Total Amount</label>
                    <input value={totalAmount} disabled className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Band Remaining Balance</label>
                    <input value={remainingBal} disabled className="w-full px-3 py-2 text-sm rounded border border-gray-300 bg-gray-100" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
                    <Field as="select" name="paymentBy" className="w-full px-3 py-2 text-sm rounded border border-gray-300"
                      onChange={(e) => {
                        setFieldValue("paymentBy", e.target.value);
                        if (e.target.value === "Cash") {
                          setFieldValue("referenceNo", '');
                        }
                      }}
                    >
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </Field>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Reference No</label>
                    <Field name="referenceNo" disabled={values.paymentBy === 'Cash'} className="w-full px-3 py-2 text-sm rounded border border-gray-300" />
                  </div>
                </div>

                {/* Locker Selection */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Select Locker(s)</label>
                  <FieldArray name="lockers">
                    {({ push, remove }) => (
                      <>
                        {values.lockers.map((locker, index) => {
                          const remainingOptions = getAvailableOptions(
                            values.lockers.filter((l, i) => i !== index)
                          );

                          return (
                            <div key={index} className="flex items-center gap-2 mb-2">
                              <Field
                                as="select"
                                name={`lockers[${index}]`}
                                className="w-1/2 px-3 py-2 text-sm rounded border border-gray-300"
                                onChange={(e) => {
                                  const selectedLockerNo = e.target.value;
                                  setFieldValue(`lockers[${index}]`, selectedLockerNo);

                                  // Auto-set bandNo if first locker is selected
                                  if (index === 0) {
                                    const selectedLocker = availableLockers.find(
                                      l => l.lockerNo === selectedLockerNo
                                    );
                                    if (selectedLocker) {
                                      setFieldValue('bandNo', selectedLocker.bandNo || '');
                                    }
                                  }
                                }}
                              >
                                <option value="">Select Locker</option>
                                {remainingOptions.map((lockerObj) => (
                                  <option key={lockerObj.lockerNo} value={lockerObj.lockerNo}>
                                    {lockerObj.lockerNo}
                                  </option>
                                ))}
                              </Field>
                              {values.lockers.length > 1 && (
                                <button type="button" onClick={() => remove(index)} className="px-3 py-2 bg-red-100 text-red-600 rounded">X</button>
                              )}
                            </div>
                          );
                        })}
                        {availableLockers.length > values.lockers.length && (
                          <button type="button" onClick={() => push('')} className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded">
                            Add Locker
                          </button>
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button type="button" onClick={() => navigate('/locker-issuance')} className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                    Save
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Success!</h3>
              <p className="text-sm text-gray-500 text-center">Locker issuance record has been saved successfully.</p>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  navigate('/locker-issuance');
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockerIssuanceForm;
