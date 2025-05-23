export const calculateDiscountByAmount = (total, percent) => (total * percent) / 100;
export const calculateDiscountByPercent = (total, amount) =>
  total === 0 ? 0 : (amount / total) * 100;

export const generateTicketNumber = (tickets) =>
  String(tickets.length + 1).padStart(4, "0");
