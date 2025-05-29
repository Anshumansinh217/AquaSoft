const BookingSummary = ({ ticketCounts, ticketTypes }) => {
  const summaryItems = Object.entries(ticketCounts)
    .map(([ticketName, counts]) => {
      const ticketType = ticketTypes.find((t) => t.name === ticketName);
      if (!ticketType) return null;

      const adultTotal = ticketType.price.adult * counts.adults;
      const childTotal = ticketType.price.child * counts.children;
      const basePrice = adultTotal + childTotal;
      const gst = basePrice * 0.18;
      const totalAmount = basePrice + gst;

      return {
        ticketName,
        adults: counts.adults,
        children: counts.children,
        adultPrice: ticketType.price.adult,  // Fixed from adultPrice: ticketType.price.adult
        childPrice: ticketType.price.child,
        basePrice,
        gst,
        totalAmount,
      };
    })
    .filter(Boolean);

  if (summaryItems.length === 0) {
    return (
      <p className="text-gray-500 italic font-medium p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm text-sm sm:text-base">
        Select at least one ticket to see the summary.
      </p>
    );
  }

  const grandTotal = summaryItems.reduce((acc, item) => acc + item.totalAmount, 0);

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg space-y-4 group text-sm sm:text-base w-full max-w-xl mx-auto">
      <h3 className="text-base sm:text-lg font-bold text-purple-900 mb-2">Booking Summary</h3>

      {summaryItems.map((item, index) => (
        <div key={index} className="space-y-3 text-purple-800 border-b border-purple-200 pb-3 last:border-0 last:pb-0">
          <div className="flex justify-between font-medium">
            <span>Ticket:</span>
            <span className="font-semibold">{item.ticketName}</span>
          </div>
          
          {item.adults > 0 && (
            <div className="flex justify-between">
              <span>Adults ({item.adults} × ₹{item.adultPrice}):</span>
              <span>₹{(item.adults * item.adultPrice).toFixed(2)}</span>
            </div>
          )}
          
          {item.children > 0 && (
            <div className="flex justify-between">
              <span>Children ({item.children} × ₹{item.childPrice}):</span>
              <span>₹{(item.children * item.childPrice).toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Base Price:</span>
            <span>₹{item.basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>₹{item.gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-blue-600">
            <span>Total:</span>
            <span>₹{item.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between text-base sm:text-lg font-bold text-purple-900 border-t border-purple-300 pt-2">
        <span>Grand Total:</span>
        <span className="text-blue-700">₹{grandTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BookingSummary;