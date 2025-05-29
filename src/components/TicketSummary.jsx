const TicketSummary = ({ ticketType, totalAmount, finalAmount }) => {
  const isDiscounted = finalAmount < totalAmount;

  return (
    <div className="relative space-y-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100 shadow-lg">
      <h3 className="text-xl font-bold text-purple-900 border-b border-purple-200 pb-2">
        Payment Summary
      </h3>

      {/* Ticket Type */}
      <div className="space-y-1">
        <label htmlFor="ticketType" className="block text-sm font-medium text-purple-800">
          Ticket Type
        </label>
        <div className="relative">
          <input
            id="ticketType"
            type="text"
            value={Array.isArray(ticketType) ? ticketType.join(", ") : ticketType}
            disabled
            className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* Total Amount */}
      <div className="space-y-1">
        <label htmlFor="totalAmount" className="block text-sm font-medium text-purple-800">
          Total Amount
        </label>
        <div className="relative">
          <input
            id="totalAmount"
            type="text"
            value={`₹${totalAmount.toFixed(2)}`}
            disabled
            className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* Final Amount (if discounted) */}
      {isDiscounted && (
        <div className="space-y-1">
          <label htmlFor="finalAmount" className="block text-sm font-medium text-purple-800">
            After Discount
          </label>
          <div className="relative">
            <input
              id="finalAmount"
              type="text"
              value={`₹${finalAmount.toFixed(2)}`}
              disabled
              className="w-full px-4 py-3 bg-white/80 border border-blue-200 rounded-xl text-blue-600 font-bold focus:outline-none focus:ring-2 focus:ring-blue-300/50 focus:border-blue-300 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
    </div>
  );
};

export default TicketSummary;
