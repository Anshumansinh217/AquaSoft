export function calculateGST(item, quantity) {
  const gstPercent = item.gst ?? 18;
  const totalPrice = item.price * quantity;
  const taxableValue = totalPrice / (1 + gstPercent / 100);
  const gstAmount = totalPrice - taxableValue;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    gstPercent,
    totalPrice,
    taxableValue,
    cgst,
    sgst,
    gstAmount
  };
}
