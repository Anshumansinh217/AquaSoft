import { FaCrown, FaTicketAlt } from "react-icons/fa";

const TicketTypeCard = ({ type, selectedTypes, setSelectedTypes }) => {
  const isSelected = selectedTypes.includes(type.id);
  const isPremium = type.name.toLowerCase().includes("premium");

  const toggleType = () => {
    if (isSelected) {
      setSelectedTypes(selectedTypes.filter((id) => id !== type.id));
    } else {
      setSelectedTypes([...selectedTypes, type.id]);
    }
  };

  const cardGradients = {
    Platinum: "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100",
    Diwali: "bg-gradient-to-br from-orange-100 via-yellow-100 to-orange-100",
    Express: "bg-gradient-to-br from-green-100 via-lime-100 to-green-100",
    "Park Visit": "bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-100",
    "Tuesday & Thursday": "bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-100",
    "Golden with Lunch": "bg-gradient-to-br from-red-100 via-rose-100 to-red-100",
    "Water Park Entry": "bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-100",
  };

  const bgColor = isSelected
    ? "bg-gradient-to-br from-blue-50 to-purple-50"
    : cardGradients[type.name] || "bg-white/90";

  return (
    <div
      onClick={toggleType}
      className={`relative cursor-pointer p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] 
        ${bgColor} 
        ${isSelected ? "border-2 border-blue-400/80 shadow-lg" : "border border-gray-200/80 shadow-md hover:shadow-lg"}
        ${isPremium ? "ring-2 ring-yellow-400/40" : ""}
        w-full
      `}
    >
      {isPremium && (
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-1 rounded-full shadow-lg">
          <FaCrown className="text-[10px] sm:text-xs" />
        </div>
      )}

      {/* Icon + Price Row */}
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg 
            ${isSelected ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}
        >
          <FaTicketAlt className="text-lg sm:text-xl" />
        </div>
        <div className="text-right text-sm sm:text-base">
          <p className={isSelected ? "text-blue-700" : "text-gray-600"}>
            Adult: ₹{type.price.adult}
          </p>
          <p className={isSelected ? "text-blue-700" : "text-gray-600"}>
            Child: ₹{type.price.child}
          </p>
        </div>
      </div>

      {/* Title */}
      <h3
        className={`text-lg sm:text-xl font-bold leading-snug ${
          isSelected
            ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            : "text-gray-800"
        }`}
      >
        {type.name}
      </h3>

      {/* Pulse Indicator */}
      {isSelected && (
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-pulse"></div>
      )}

      {/* Overlay on hover */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 
          ${isSelected ? "bg-gradient-to-br from-blue-200/20 to-purple-200/20" : "hover:bg-gray-100/10"}`}
      ></div>
    </div>
  );
};

export default TicketTypeCard;
