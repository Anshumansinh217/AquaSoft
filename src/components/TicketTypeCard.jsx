import { FaCrown, FaTicketAlt } from "react-icons/fa";

const TicketTypeCard = ({ type, selectedType, setSelectedType }) => {
  const isSelected = selectedType === type.id;
  const isPremium = type.name.toLowerCase().includes("premium");

  return (
    <div
      onClick={() => setSelectedType(type.id)}
      className={`relative cursor-pointer p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
        isSelected
          ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-400/80 shadow-lg"
          : "bg-white/90 border border-gray-200/80 shadow-md hover:shadow-lg"
      } ${isPremium ? "ring-2 ring-yellow-400/40" : ""}`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white p-1 rounded-full shadow-lg">
          <FaCrown className="text-xs" />
        </div>
      )}

      {/* Card Content */}
      <div className="flex flex-col gap-2">
        {/* Ticket Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-lg mb-3 ${
            isSelected
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <FaTicketAlt className="text-xl" />
        </div>

        {/* Title with Luxury Gradient */}
        <h3
          className={`text-xl font-bold ${
            isSelected
              ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              : "text-gray-800"
          }`}
        >
          {type.name}
        </h3>

        {/* Price */}
        <p
          className={`text-sm ${
            isSelected ? "text-blue-700" : "text-gray-600"
          }`}
        >
          ₹{type.price} <span className="text-xs">per person</span>
        </p>

        {/* Selected Indicator */}
        {isSelected && (
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Subtle Hover Effect */}
      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 ${
          isSelected
            ? "bg-gradient-to-br from-blue-200/20 to-purple-200/20"
            : "group-hover:bg-gray-100/10"
        }`}
      ></div>
    </div>
  );
};

export default TicketTypeCard;