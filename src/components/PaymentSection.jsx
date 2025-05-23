const PaymentSection = ({ paymentMethod, referenceNo, remark, onMethodChange, onRefChange, onRemarkChange }) => (
  <div className="space-y-5 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg relative overflow-hidden">
    <h3 className="text-xl font-bold text-purple-900 mb-2">Payment Details</h3>
    
    <div className="space-y-4">
      {/* Payment Method */}
      <div className="group">
        <label className="block text-sm font-medium text-purple-800 mb-1">Payment Method</label>
        <div className="relative">
          <select 
            value={paymentMethod} 
            onChange={onMethodChange}
            className="w-full pl-4 pr-10 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm appearance-none"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="online">Online</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-purple-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
        </div>
      </div>

      {/* Reference Number (Conditional) */}
      {(paymentMethod === "card" || paymentMethod === "online") && (
        <div className="group">
          <label className="block text-sm font-medium text-purple-800 mb-1">Reference No.</label>
          <div className="relative">
            <input
              type="text"
              value={referenceNo}
              onChange={onRefChange}
              className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm"
              placeholder="Enter reference number"
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
          </div>
        </div>
      )}

      {/* Remarks */}
      <div className="group">
        <label className="block text-sm font-medium text-purple-800 mb-1">Remarks</label>
        <div className="relative">
          <textarea
            value={remark}
            onChange={onRemarkChange}
            className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm min-h-[100px]"
            placeholder="Additional notes (optional)"
          />
          <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
        </div>
      </div>
    </div>

    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
    <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
  </div>
);

export default PaymentSection;