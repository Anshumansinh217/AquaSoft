import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

const costumeTypes = [
  { id: 1, name: "Standard Costume", price: 200, image: "../img/costume/Standard Costume.jpeg" },
  { id: 2, name: "Premium Costume", price: 350, image: "../img/costume/Premium Costume.jpeg" },
  { id: 3, name: "VIP Costume", price: 500, image: "../img/costume/VIP Costume.jpeg" },
  { id: 4, name: "Festival Special", price: 400, image: "../img/costume/Festival Special.JPG" },
];

  const CostumeForm = () => {
  const navigate = useNavigate();
  const [costumeQuantities, setCostumeQuantities] = useState({});

  const handleCardClick = (id) => {
    setCostumeQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleQuantityChange = (id, value) => {
    const numValue = parseInt(value) || 0;
    if (numValue <= 0) {
      handleRemove(id);
    } else {
      setCostumeQuantities((prev) => ({ ...prev, [id]: numValue }));
    }
  };

  const handleRemove = (id) => {
    setCostumeQuantities((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const selectedCostumes = costumeTypes.filter((c) => costumeQuantities[c.id]);

  const { basePrice, totalCount, costumeDetails } = selectedCostumes.reduce(
    (acc, costume) => {
      const quantity = costumeQuantities[costume.id] || 0;
      const total = costume.price * quantity;
      acc.costumeDetails.push({ ...costume, quantity, total });
      acc.basePrice += total;
      acc.totalCount += quantity;
      return acc;
    },
    { basePrice: 0, totalCount: 0, costumeDetails: [] }
  );

  const gst = basePrice * 0.18;
  const totalAmount = basePrice + gst;

  const handleNext = () => {
    const formData = { costumeDetails, basePrice, gst, totalAmount };
    localStorage.setItem("costumeFormData", JSON.stringify(formData));
    navigate("/costume-receipt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-cyan-100 p-6 md:p-10">
      <div className="mb-6">
        <button
          onClick={() => navigate("/CostumeBookingTable")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
        >
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start gap-10">
        {/* Costume Cards */}
        <div className="flex-1 grid gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
          {costumeTypes.map((type) => {
            const quantity = costumeQuantities[type.id] || 0;
            const isSelected = quantity > 0;

            return (
              <div
                key={type.id}
                onClick={() => handleCardClick(type.id)}
                className={`p-3 rounded-2xl cursor-pointer transition-transform transform hover:-translate-y-1 shadow-md hover:shadow-xl bg-white/70 backdrop-blur-md border flex flex-col items-center ${
                  isSelected ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-200"
                }`}
              >
                <img src={type.image} alt={type.name} className="rounded-xl mb-3 w-full h-36 object-cover" />
                <div className="text-center w-full">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">{type.name}</h3>
                  <p className="text-blue-600 font-bold mb-2">₹{type.price}</p>
                </div>

                {isSelected && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(type.id, quantity - 1);
                      }}
                      className="w-8 h-8 text-lg bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(type.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-14 text-center border rounded-md py-1"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(type.id, quantity + 1);
                      }}
                      className="w-8 h-8 text-lg bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

       <div className="w-full lg:max-w-xl bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-3xl shadow-xl">
  <h2 className="text-xl font-bold text-purple-700 mb-5 border-b pb-2">Booking Summary</h2>

  <div className="mb-5 p-4 bg-white border rounded-lg shadow-inner">
    <p className="text-gray-800 font-medium">Name: Guest User</p>
    <p className="text-sm text-gray-600 mt-1">ID: 12345 &nbsp; | &nbsp; Balance: ₹0.00</p>
  </div>

  <div className="w-full text-sm mb-4">
    <div className="flex font-semibold border-b pb-1 text-sm">
      <div className="w-[40%]">Ticket</div>
      <div className="w-[15%] text-center">Nos.</div>
      <div className="w-[20%] text-center">Rate</div>
      <div className="w-[25%] text-right pr-6">Total</div>
    </div>

    {costumeDetails.map((item) => (
      <div key={item.id} className="flex py-1 border-b items-center text-sm">
        <div className="w-[40%]">{item.name}</div>
        <div className="w-[15%] text-center">{item.quantity}</div>
        <div className="w-[20%] text-center">₹{item.price}</div>
        <div className="w-[25%] text-right flex justify-end items-center ">
          ₹{item.total.toFixed(2)}
          <button
            className="ml-2 text-red-500 hover:text-red-700"
            onClick={() => handleRemove(item.id)}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    ))}

    <div className="flex py-1 border-b font-semibold">
      <div className="w-[40%]">Total</div>
      <div className="w-[15%] text-center">{totalCount}</div>
      <div className="w-[20%] text-center"></div>
      <div className="w-[25%] text-right pr-4">₹{basePrice.toFixed(2)}</div>
    </div>
  </div>

  <div className="text-sm mb-2 flex justify-between">
    <span>GST (18%)</span>
    <span className="pr-4">₹{gst.toFixed(2)}</span>
  </div>

  <div className="text-lg font-bold flex justify-between border-t pt-3">
    <span>Total:</span>
    <span>₹{totalAmount.toFixed(2)}</span>
  </div>

  <button
    disabled={costumeDetails.length === 0}
    onClick={handleNext}
    className={`w-full py-3 mt-5 rounded-xl font-medium text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95
      ${
        costumeDetails.length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      }`}
  >
    Proceed to Checkout →
  </button>
</div>


      </div>
    </div>
  );
};

export default CostumeForm;
