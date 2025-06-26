const BookingSummary = ({ ticketCounts, ticketTypes }) => {
  const summaryItems = Object.entries(ticketCounts)
    .map(([ticketName, counts]) => {
      const ticketType = ticketTypes.find((t) => t.name === ticketName);
      if (!ticketType) return null;

      // Ensure counts.adults and counts.children exist, default to 0 if not
      const adults = counts.adults || 0;
      const children = counts.children || 0;
      
      const adultTotal = ticketType.price.adult * adults;
      const childTotal = ticketType.price.child * children;
      const basePrice = adultTotal + childTotal;
      const gst = basePrice * 0.18;
      const totalAmount = basePrice + gst;

      return {
        id: ticketType.id,
        name: ticketType.name,
        adultPrice: ticketType.price.adult,
        childPrice: ticketType.price.child,
        adults,
        children,
        basePrice,
        gst,
        totalAmount,
      };
    })
    .filter(Boolean);

  const totalCount = summaryItems.reduce(
    (acc, item) => acc + item.adults + item.children,
    0
  );
  const basePrice = summaryItems.reduce((acc, item) => acc + item.basePrice, 0);
  const gst = basePrice * 0.18;
  const totalAmount = basePrice + gst;

  if (summaryItems.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        No tickets selected
      </div>
    );
  }

  return (
    <>
      {/* Table header */}
      <div className="mb-4">
        <div className="grid grid-cols-12 gap-2 font-medium text-gray-600 text-sm border-b pb-2 mb-2">
          <div className="col-span-5">Ticket</div>
          <div className="col-span-2 text-left">Nos.</div>
          <div className="col-span-2 text-right">Rate</div>
          <div className="col-span-3 text-right">Total</div>
        </div>

        {summaryItems.map((item) => (
          <div key={item.id}>
            {item.adults > 0 && (
              <div className="grid grid-cols-12 gap-2 py-2 border-b text-sm">
                <div className="col-span-5 font-medium">
                  {item.name} (Adult)
                </div>
                <div className="col-span-2 text-left">{item.adults}</div>
                <div className="col-span-2 text-right">₹{item.adultPrice}</div>
                <div className="col-span-3 text-right font-medium">
                  ₹{(item.adults * item.adultPrice).toFixed(2)}
                </div>
              </div>
            )}
            {item.children > 0 && (
              <div className="grid grid-cols-12 gap-2 py-2 border-b text-sm">
                <div className="col-span-5 font-medium text-gray-700">
                  {item.name} (Child)
                </div>
                <div className="col-span-2 text-left">{item.children}</div>
                <div className="col-span-2 text-right">₹{item.childPrice}</div>
                <div className="col-span-3 text-right font-medium">
                  ₹{(item.children * item.childPrice).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total summary */}
      <div className="space-y-3 pt-2 text-sm">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>Nos:{totalCount}</span>
          <span className="text-right w-24">₹{basePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
          <span>Total:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default BookingSummary;
