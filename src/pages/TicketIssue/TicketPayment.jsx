import { useState, useEffect } from "react";
import TicketSummary from '../../components/TicketSummary';
import DiscountSection from '../../components/DiscountSection';
import PaymentSection from '../../components/PaymentSection';
import ActionButtons from '../../components/ActionButtons';
import { useNavigate } from "react-router-dom";

const TicketPayment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ticketFormData"));
    setFormData(data);
  }, []);

  const [discountByPercent, setDiscountByPercent] = useState(0);
  const [discountByAmount, setDiscountByAmount] = useState(0);

  const totalAmount = formData?.totalAmount || 0;
  const ticketType = formData?.ticketType || "Unknown";
  const adultCount = formData?.adults || 0;
  const childCount = formData?.children || 0;

  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [referenceNo, setReferenceNo] = useState("");
  const [remark, setRemark] = useState("");

  useEffect(() => {
    const calculatedDiscount = (totalAmount * discountByPercent) / 100;
    setDiscountByAmount(calculatedDiscount);
  }, [discountByPercent, totalAmount]);

  useEffect(() => {
    const calculatedPercent = (discountByAmount / totalAmount) * 100;
    setDiscountByPercent(Number.isNaN(calculatedPercent) ? 0 : calculatedPercent);
    setFinalAmount(totalAmount - discountByAmount);
  }, [discountByAmount, totalAmount]);

  const handleSave = () => {
    const existingTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const nextTicketNo = String(existingTickets.length + 1).padStart(4, "0");

    const newTicket = {
      ticketNo: nextTicketNo,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      adult: adultCount,
      children: childCount,
      amount: finalAmount,
      paymentBy: paymentMethod,
      referenceNo,
      remark,
      ticketType,
    };

    localStorage.setItem("latestTicket", JSON.stringify(newTicket));
    localStorage.setItem("tickets", JSON.stringify([...existingTickets, newTicket]));

    navigate("/ticket-print");
  };

  if (!formData) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="animate-pulse text-xl font-medium text-purple-800">Loading ticket details...</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex flex-col justify-between">
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-purple-900">Complete Your Payment</h1>
        <p className="text-purple-700/80">Review your order and enter payment details</p>
      </div>

      {/* Content Section */}
     <div className="flex justify-between gap-4 mt-6">
  {/* Payment Summary */}
  <div className="w-1/3">
    <TicketSummary 
      ticketType={ticketType} 
      totalAmount={totalAmount} 
      finalAmount={finalAmount} 
    />
  </div>

  {/* Apply Discount */}
  <div className="w-1/3">
    <DiscountSection
      discountByAmount={discountByAmount}
      discountByPercent={discountByPercent}
      onAmountChange={(e) => setDiscountByAmount(parseFloat(e.target.value) || 0)}
      onPercentChange={(e) => setDiscountByPercent(parseFloat(e.target.value) || 0)}
    />
  </div>

  {/* Payment Details */}
  <div className="w-1/3">
    <PaymentSection
      paymentMethod={paymentMethod}
      referenceNo={referenceNo}
      remark={remark}
      onMethodChange={(e) => setPaymentMethod(e.target.value)}
      onRefChange={(e) => setReferenceNo(e.target.value)}
      onRemarkChange={(e) => setRemark(e.target.value)}
    />
  </div>
</div>


      {/* Action Buttons */}
      <div className="mt-6">
        <ActionButtons onSave={handleSave} />
      </div>
    </div>
  );
};

export default TicketPayment;
