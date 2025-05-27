import { useNavigate, useLocation } from "react-router-dom";

const PrintToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, token } = location.state || {};

  const handlePrint = () => {
    window.print();
    navigate("/restaurant");
  };

  const handleDownloadPDF = () => {
    alert("Download PDF clicked");
    navigate("/restaurant");
  };

  if (!items) return <p>Invalid access. No data to print.</p>;

  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

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
            width: 100%;
          }
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 print:bg-white">
        <div className="receipt w-full max-w-xs bg-white p-6 shadow-md border border-gray-300 print:border-none print:shadow-none">
          <h2 className="text-center font-bold text-lg mb-2">🍽️ Restaurant Order</h2>
          <p className="text-center text-sm mb-4">Order Token: {token}</p>

          <div className="text-sm font-mono space-y-1 border-t border-dashed pt-2">
            {items.map((item) => {
              const totalItem =
                item.price * item.quantity * (1 - item.discount / 100);
              return (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{totalItem.toFixed(2)}</span>
                </div>
              );
            })}
            <div className="border-t border-dashed my-2"></div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-center text-xs mt-4 border-t border-dashed pt-2">
            Thank you for dining with us!
          </p>

          <div className="flex justify-center gap-4 mt-6 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            >
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintToken;