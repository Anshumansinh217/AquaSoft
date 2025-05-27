import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketTypeCard from "../../components/TicketTypeCard";
import TicketCounter from "../../components/TicketCounter";
import BookingSummary from "../../components/BookingSummary";
import { FaArrowLeft } from "react-icons/fa";

const ticketTypes = [
  { id: 1, name: "Platinum", price: 500 },
  { id: 2, name: "Diwali", price: 400 },
  { id: 3, name: "Express", price: 350 },
  { id: 4, name: "Park Visit", price: 300 },
  { id: 5, name: "Tuesday & Thursday", price: 250 },
  { id: 6, name: "Golden with Lunch", price: 600 },
  // { id: 7, name: "Water Park Entry", price: 450 },
];

const TicketForm = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const selectedTicket = ticketTypes.find(t => t.id === selectedType);
  const totalCount = adults + children;
  const basePrice = selectedTicket ? selectedTicket.price * totalCount : 0;
  const gst = basePrice * 0.18;
  const totalAmount = basePrice + gst;

  const handleNext = () => {
    const formData = {
      ticketType: selectedTicket.name,
      pricePerPerson: selectedTicket.price,
      adults,
      children,
      basePrice,
      gst,
      totalAmount,
    };
    localStorage.setItem("ticketFormData", JSON.stringify(formData));
    navigate("/ticket-payment");
  };

  return (
    <div className=" mx-auto p-6 md:p-8 space-y-8 bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      <div className="space-y-8">
        {/* Header Section */}
       
        <div className="text-center space-y-2">
           <button
                    onClick={() => navigate("/ticket-issue")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
                  >
                    <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="font-medium">Back</span>
                  </button>


          {/* <h1 className="text-3xl font-bold text-purple-900">Select Your Tickets</h1>
          <p className="text-purple-700/80">Choose from our premium ticket options</p> */}
        </div>


   <div className="fullcontent w-full max-w-[1440px] mx-auto bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen 
  flex flex-col md:flex-row gap-6 overflow-x-auto">



  {/* Left: Ticket Selection + Quantity */}
  <div className="section1 flex-1 min-w-[480px] max-w-full overflow-y-auto pr-2 space-y-6">

    
    {/* Ticket Selection Section */}
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2">
        Ticket Types
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {ticketTypes.map((type) => (
          <TicketTypeCard
            key={type.id}
            type={type}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        ))}
      </div>
    </div>

    {/* Ticket Counters Section */}
    <div className="space-y-4">
      {/* <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2">
        Ticket Quantities
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <TicketCounter label="Adults" count={adults} setCount={setAdults} />
        </div>
        <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <TicketCounter label="Children" count={children} setCount={setChildren} />
        </div>
      </div>
    </div>

  </div>

  {/* Right: Booking Summary */}
  <div className="section2 w-[320px] flex-shrink-0 min-w-[280px] overflow-y-auto space-y-4">



    <h2 className="text-xl font-semibold text-purple-800 border-b border-purple-200 pb-2">
      Order Summary
    </h2>
    <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
      <BookingSummary
        selectedTicket={selectedTicket}
        adults={adults}
        children={children}
      />
    </div>
     {/* Next Button */}
        <div className="flex justify-center pt-4">
          <button
            disabled={!selectedTicket || totalCount === 0}
            onClick={handleNext}
            className={`relative overflow-hidden px-8 py-3 rounded-xl font-medium text-white shadow-lg 
              ${!selectedTicket || totalCount === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}
              transition-all duration-300 transform hover:scale-105 active:scale-95`}
          >
            <span className="relative z-10">Continue to Payment</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute top-0 right-0 w-8 h-8 -mr-4 -mt-4 bg-white/30 rounded-full animate-ping"></span>
          </button>
        </div>
  </div>  


  
  
</div>


       
      </div>
    </div>
  );
};

export default TicketForm;