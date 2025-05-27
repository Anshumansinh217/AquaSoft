const PaymentSection = ({ paymentMethod, referenceNo, remark, onMethodChange, onRefChange, onRemarkChange }) => (
  <div className="space-y-5 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg relative overflow-hidden">
    <h3 className="text-xl font-bold text-purple-900 mb-2">Payment Details</h3>
    
    <div className="space-y-4">
      {/* Payment Method - Radio Buttons */}
      <div className="group">
        <label className="block text-sm font-medium text-purple-800 mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-3">
          {/* Cash Option */}
          <label className="relative">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={onMethodChange}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === "cash" ? 'border-purple-500 bg-purple-50 shadow-purple-100 shadow-sm' : 'border-purple-200 hover:border-purple-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 ${paymentMethod === "cash" ? 'border-purple-600 bg-purple-600' : 'border-purple-300'}`}>
                {paymentMethod === "cash" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-purple-900">Cash</span>
            </div>
          </label>

          {/* Card Option */}
          <label className="relative">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={onMethodChange}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === "card" ? 'border-purple-500 bg-purple-50 shadow-purple-100 shadow-sm' : 'border-purple-200 hover:border-purple-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 ${paymentMethod === "card" ? 'border-purple-600 bg-purple-600' : 'border-purple-300'}`}>
                {paymentMethod === "card" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-purple-900">Card</span>
            </div>
          </label>

          {/* Online Option */}
          <label className="relative">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={onMethodChange}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${paymentMethod === "online" ? 'border-purple-500 bg-purple-50 shadow-purple-100 shadow-sm' : 'border-purple-200 hover:border-purple-300'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-2 ${paymentMethod === "online" ? 'border-purple-600 bg-purple-600' : 'border-purple-300'}`}>
                {paymentMethod === "online" && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className="text-sm font-medium text-purple-900">Online</span>
            </div>
          </label>
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
    {/* <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div> */}
  </div>
);

export default PaymentSection;