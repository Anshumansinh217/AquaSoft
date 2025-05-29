import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketTypeCard from "../../components/TicketTypeCard";
import { FaArrowLeft } from "react-icons/fa";

const ticketTypes = [
  { id: 1, name: "Platinum", price: { adult: 500, child: 400 } },
  { id: 2, name: "Diwali", price: { adult: 400, child: 300 } },
  { id: 3, name: "Express", price: { adult: 350, child: 250 } },
  { id: 4, name: "Park Visit", price: { adult: 300, child: 200 } },
  { id: 5, name: "Tuesday & Thursday", price: { adult: 250, child: 150 } },
  { id: 6, name: "Golden with Lunch", price: { adult: 600, child: 450 } },
];

const TicketForm = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({});

  const handleQuantityChange = (ticketId, type, value) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: {
        ...prev[ticketId],
        [type]: Math.max(0, value) // Ensure not negative
      }
    }));
  };

  const selectedTickets = ticketTypes.filter(t => selectedTypes.includes(t.id));

  // Calculate totals
const { basePrice, totalCount, ticketDetails } = selectedTickets.reduce(
  (acc, ticket) => {
    // Add these lines at the start of the reducer function
    const quantities = ticketQuantities[ticket.id] || { adults: 0, children: 0 };
    const adults = quantities.adults || 0;
    const children = quantities.children || 0;

    const ticketTotal = (ticket.price.adult * adults) + (ticket.price.child * children);
    
    acc.ticketDetails.push({
      ...ticket,
      quantities,
      ticketTotal
    });
    
    acc.basePrice += ticketTotal;
    acc.totalCount += adults + children;
    return acc;
  },
  { basePrice: 0, totalCount: 0, ticketDetails: [] }
);
  const gst = basePrice * 0.18;
  const totalAmount = basePrice + gst;

  const handleNext = () => {
    const formData = {
      selectedTickets: ticketDetails,
      basePrice,
      gst,
      totalAmount,
    };
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
    navigate("/ticket-payment");
  };

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
                {ticketTypes.map((type) => (
                  <div key={type.id} className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <TicketTypeCard
                      type={type}
                      selectedTypes={selectedTypes}
                      setSelectedTypes={setSelectedTypes}
                    />
                    
                    {selectedTypes.includes(type.id) && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Adults:</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuantityChange(type.id, 'adults', (ticketQuantities[type.id]?.adults || 0) - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span>{ticketQuantities[type.id]?.adults || 0}</span>
                            <button 
                              onClick={() => handleQuantityChange(type.id, 'adults', (ticketQuantities[type.id]?.adults || 0) + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Children:</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuantityChange(type.id, 'children', (ticketQuantities[type.id]?.children || 0) - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span>{ticketQuantities[type.id]?.children || 0}</span>
                            <button 
                              onClick={() => handleQuantityChange(type.id, 'children', (ticketQuantities[type.id]?.children || 0) + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[450px] flex-shrink-0 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
              <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2 mb-4">
                Booking Summary
              </h2>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="font-medium">Name: Guest User</div>
                <div className="text-sm text-gray-600">ID: 12345    Balance: ₹0.00</div>
              </div>
              
              <div className="mb-4">
                <div className="grid grid-cols-12 gap-2 font-medium text-gray-600 text-sm border-b pb-2 mb-2">
                  <div className="col-span-6">Ticket</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Rate</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
               {ticketDetails.map(ticket => {
        const adults = ticket.quantities.adults || 0;
        const children = ticket.quantities.children || 0;
        const totalQty = adults + children;
        
        return (
          <div key={ticket.id} className="grid grid-cols-12 gap-2 py-2 border-b">
            <div className="col-span-6 font-medium">{ticket.name}</div>
            <div className="col-span-2 text-center">
              <span>{totalQty}</span>
            </div>
            <div className="col-span-2 text-right">
              {adults > 0 && (
                <div className="text-sm">₹{ticket.price.adult} × {adults}</div>
              )}
              {children > 0 && (
                <div className="text-sm">₹{ticket.price.child} × {children}</div>
              )}
            </div>
            <div className="col-span-2 text-right font-medium">
              ₹{(ticket.price.adult * adults + ticket.price.child * children).toFixed(2)}
            </div>
          </div>
        );
      })}
                
                {selectedTickets.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No tickets selected
                  </div>
                )}
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{totalCount} tickets</span>
                  <span className="w-20 text-right">₹{basePrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-3 mt-2">
                  <span>Total:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              disabled={selectedTickets.length === 0 || totalCount === 0}
              onClick={handleNext}
              className={`w-full py-3 rounded-xl font-medium text-white shadow-lg 
                ${selectedTickets.length === 0 || totalCount === 0
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}
                transition-all duration-300 transform hover:scale-[1.02] active:scale-95`}
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