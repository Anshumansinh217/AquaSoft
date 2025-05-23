import { useNavigate } from "react-router-dom";

const TicketPrint = () => {
  const navigate = useNavigate();

  const ticketData = JSON.parse(localStorage.getItem("latestTicket")) || {
    ticketNo: "0001",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    adult: 2,
    children: 1,
    amount: 1000,
    paymentBy: "Cash",
    ticketType: "Water Park Entry",
  };

  const handlePrint = () => {
    window.print();
    navigate("/ticket-issue"); // redirect after printing
  };

  const handleDownloadPDF = () => {
    alert("Download PDF clicked");
    navigate("/ticket-issue");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 print:bg-white">
      <div className="receipt w-full max-w-xs bg-white p-6 shadow-md border border-gray-300 print:border-none print:shadow-none">
        <h2 className="text-center font-bold text-lg mb-2">🌊 Water Park</h2>
        <p className="text-center text-sm mb-4">Receipt / Ticket</p>

        <div className="text-sm font-mono space-y-1 border-t border-dashed pt-2">
          <div className="flex justify-between">
            <span>Ticket No:</span>
            <span>{ticketData.ticketNo}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{ticketData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{ticketData.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Ticket Type:</span>
            <span>{ticketData.ticketType}</span>
          </div>
          <div className="flex justify-between">
            <span>Adults:</span>
            <span>{ticketData.adult}</span>
          </div>
          <div className="flex justify-between">
            <span>Children:</span>
            <span>{ticketData.children}</span>
          </div>
          <div className="border-t border-dashed my-2"></div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₹{ticketData.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Mode:</span>
            <span>{ticketData.paymentBy}</span>
          </div>
        </div>

        <p className="text-center text-xs mt-4 border-t border-dashed pt-2">Thank you for your visit!</p>

        <div className="flex justify-center gap-4 mt-6 print:hidden">
          <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Print
          </button>
          <button onClick={handleDownloadPDF} className="bg-green-600 text-white px-4 py-2 rounded text-sm">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPrint;
