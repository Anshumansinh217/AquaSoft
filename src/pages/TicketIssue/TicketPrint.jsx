import { useNavigate } from "react-router-dom";

const TicketPrint = () => {
  const navigate = useNavigate();

  // Get detailed ticket data saved during payment
  const formData = JSON.parse(localStorage.getItem("ticketFormData")) || null;
  const latestTicket = JSON.parse(localStorage.getItem("latestTicket")) || null;

  // fallback values
  const totalAmount = formData?.totalAmount || latestTicket?.amount || 0;
  const finalAmount = latestTicket?.amount || totalAmount;
  const paymentBy = latestTicket?.paymentBy || "Cash";

  // Tickets with quantities and names
  const tickets = formData?.selectedTickets || [];

  const handlePrint = () => {
    window.print();
    navigate("/ticket-form");
  };

  const handleDownloadPDF = () => {
    alert("Download PDF clicked");
    navigate("/ticket-form");
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt, .receipt * {
            visibility: visible;
          }
          .receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 2.8in;
            padding: 15px;
            font-size: 11px;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 print:bg-white">
        <div className="receipt bg-white p-4 shadow-md border border-gray-300 print:shadow-none print:border-none">
          <h2 className="text-center font-bold text-base mb-1">🌊 Water Park</h2>
          <p className="text-center text-xs mb-2">Receipt / Ticket</p>

          <div className="text-xs font-mono space-y-1 border-t border-dashed pt-2">
            {tickets.length === 0 ? (
              <div className="text-center py-2 text-gray-500">No tickets found</div>
            ) : (
              tickets.map((ticket, idx) => (
                <div key={idx} className="mb-2">
                  <div className="font-semibold">{ticket.name}</div>
                  <div className="flex justify-between">
                    <span>Adults:</span>
                    <span>{ticket.quantities?.adults || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Children:</span>
                    <span>{ticket.quantities?.children || 0}</span>
                  </div>
                </div>
              ))
            )}

            <div className="border-t border-dashed my-1"></div>

            <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Amount Paid:</span>
              <span>₹{finalAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span>{paymentBy}</span>
            </div>
          </div>

          <p className="text-center text-xs mt-3 border-t border-dashed pt-1">
            Thank you for your visit!
          </p>

          <div className="flex justify-center gap-3 mt-4 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-3 py-1 rounded text-xs"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketPrint;
