import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaTicketAlt } from "react-icons/fa";
import TicketTable from "../../components/TicketTable";

const TicketIssueHome = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      setTickets(storedTickets);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 relative overflow-hidden">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Luxury Card Container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-500 hover:shadow-3xl">
        {/* Premium Header with Crown Icon */}
        <div className="px-8 py-6 border-b border-gray-200/30 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 relative">
          {/* <div className="absolute -top-3 -right-3 text-yellow-500">
            <FaCrown className="text-2xl opacity-80" />
          </div> */}
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-blue-400/50 text-gray-700 hover:text-blue-600 group transform hover:-translate-x-1"
          >
            <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Dashboard</span>
          </button>

          <div className="flex items-center gap-3 order-first sm:order-none">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg transform hover:rotate-12 transition-transform duration-500">
              <FaTicketAlt className="text-white text-xl" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              VIP Ticket Portal
            </h1>
          </div>

          <button
            onClick={() => navigate("/ticket-form")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-500 hover:to-purple-500 hover:scale-[1.02] active:scale-95 group"
          >
            <FaPlus className="transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-medium">New Ticket</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 animate-spin-slow"></div>
                <div className="h-4 w-48 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
              </div>
            </div>
          ) : (
            <TicketTable tickets={tickets} />
          )}
        </div>
      </div>

      
    </div>
  );
};

export default TicketIssueHome;