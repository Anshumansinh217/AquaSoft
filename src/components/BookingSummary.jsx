const BookingSummary = ({ selectedTicket, adults, children }) => {
  if (!selectedTicket) return (
    <p className="text-gray-500 italic font-medium p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
      Select a ticket type to see details
    </p>
  );

  const totalCount = adults + children;
  const basePrice = selectedTicket.price * totalCount;
  const gst = basePrice * 0.18;
  const totalAmount = basePrice + gst;

  return (
    <div className="relative p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg space-y-3 group">
      <h3 className="text-lg font-bold text-purple-900 mb-2">Booking Summary</h3>
      
      <div className="space-y-2 text-purple-800">
        <div className="flex justify-between">
          <span className="font-medium">Ticket:</span>
          <span className="font-semibold">{selectedTicket.name}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Adults:</span>
          <span className="font-semibold">{adults}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Children:</span>
          <span className="font-semibold">{children}</span>
        </div>
        
        <div className="border-t border-purple-200 pt-2 mt-1"></div>
        
        <div className="flex justify-between">
          <span className="font-medium">Base Price:</span>
          <span className="font-semibold">₹{basePrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">GST (18%):</span>
          <span className="font-semibold">₹{gst.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-purple-200 pt-2 mt-1"></div>
        
        <div className="flex justify-between text-lg">
          <span className="font-bold text-purple-900">Total:</span>
          <span className="font-bold text-blue-600">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
      
      {/* Hover/focus effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
    </div>
  );
};

export default BookingSummary;