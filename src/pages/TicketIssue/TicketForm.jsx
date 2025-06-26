import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketTypeCard from "../../components/TicketTypeCard";
import BookingSummary from "../../components/BookingSummary";
import { FaArrowLeft } from "react-icons/fa";

const TicketForm = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({});
  const [ticketTypes, setTicketTypes] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("ticketTypes");
    if (saved) {
      const parsed = JSON.parse(saved);
      setTicketTypes(parsed);
    }
  }, []);

  const handleQuantityChange = (ticketId, type, value) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        [type]: Math.max(0, value),
      },
    }));
  };

  const selectedTickets = ticketTypes.filter((t) =>
    selectedTypes.includes(t.id)
  );

  const ticketCounts = selectedTickets.reduce((acc, ticket) => {
    const quantities = ticketQuantities[ticket.id] || {
      adults: 0,
      children: 0,
    };
    acc[ticket.name] = quantities;
    return acc;
  }, {});

  const handleNext = () => {
    const selectedDetails = selectedTickets.map((ticket) => ({
      ...ticket,
      quantities: ticketQuantities[ticket.id] || { adults: 0, children: 0 },
    }));

    const basePrice = selectedDetails.reduce((acc, t) => {
      const { adults, children } = t.quantities;
      return acc + t.price.adult * adults + t.price.child * children;
    }, 0);

    const gst = basePrice * 0.18;
    const totalAmount = basePrice + gst;

    const formData = {
      selectedTickets: selectedDetails,
      basePrice,
      gst,
      totalAmount,
    };
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
    navigate("/ticket-payment");
  };

  const totalCount = Object.values(ticketCounts).reduce(
    (sum, { adults, children }) => sum + adults + children,
    0
  );

  return (
    <div className="mx-auto p-6 md:p-8 space-y-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <button
            onClick={() => navigate("/ticket-issue")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-[480px] max-w-full space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2">
                Ticket Types
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                {ticketTypes.map((type, index) => (
                  <div
                    key={type.id}
                    className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <TicketTypeCard
                      type={type}
                      selectedTypes={selectedTypes}
                      setSelectedTypes={setSelectedTypes}
                      colorIndex={index}
                    />

                    {selectedTypes.includes(type.id) && (
                      <div className="mt-4 space-y-3">
                        {["adults", "children"].map((group) => (
                          <div
                            key={group}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium">
                              {group === "adults" ? "Adults:" : "Children:"}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    type.id,
                                    group,
                                    (ticketQuantities[type.id]?.[group] || 0) - 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                              >
                                -
                              </button>
                              <span>
                                {ticketQuantities[type.id]?.[group] || 0}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    type.id,
                                    group,
                                    (ticketQuantities[type.id]?.[group] || 0) + 1
                                  )
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="w-full md:w-[450px] flex-shrink-0 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
              <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2 mb-4">
                Booking Summary
              </h2>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="font-medium">Name: Guest User</div>
                <div className="text-sm text-gray-600">
                  ID: 12345 &nbsp; | &nbsp; Balance: ₹0.00
                </div>
              </div>

              <BookingSummary
                ticketCounts={ticketCounts}
                ticketTypes={ticketTypes}
              />
            </div>

            <button
              disabled={selectedTypes.length === 0 || totalCount === 0}
              onClick={handleNext}
              className={`w-full py-3 rounded-xl font-medium text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95
                ${
                  selectedTypes.length === 0 || totalCount === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                }`}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
