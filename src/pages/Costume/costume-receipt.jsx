import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CostumeReceipt = () => {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("costumeFormData"));
    setReceipt(data);
  }, []);

  if (!receipt) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-purple-700">Costume Receipt</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          {receipt.costumeDetails.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.name} x {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 font-medium text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{receipt.basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>₹{receipt.gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>₹{receipt.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/CostumeForm")}
        className="mt-6 py-3 px-8 bg-purple-600 text-white rounded-lg"
      >
        Back to Issue
      </button>
    </div>
  );
};

export default CostumeReceipt;
