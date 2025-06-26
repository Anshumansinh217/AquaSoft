// TicketTypeCard.jsx
import { FaCrown, FaTicketAlt, FaCalendarAlt } from "react-icons/fa";

const TicketTypeCard = ({
  type,
  selectedTypes,
  setSelectedTypes,
  customColor,
}) => {
  const isSelected = selectedTypes.includes(type.id);
  const isPremium = type.name.toLowerCase().includes("premium");

  const toggleType = () => {
    setSelectedTypes(
      isSelected
        ? selectedTypes.filter((id) => id !== type.id)
        : [...selectedTypes, type.id]
    );
  };

  const bgColor = customColor || type.color || "#ffffff";

  return (
    <div
      onClick={toggleType}
      className={`relative cursor-pointer p-4 transition-all duration-200
        ring-2 ${isSelected ? "ring-blue-500/80 shadow-md" : "ring-transparent shadow-sm"}
        ${isPremium ? "ring-yellow-400/50" : ""}
        flex flex-col justify-between text-sm
        rounded-[20px] border border-gray-200 
        before:absolute before:content-[''] before:w-5 before:h-5 before:bg-white before:rounded-full before:-left-2 before:top-6
        after:absolute after:content-[''] after:w-5 after:h-5 after:bg-white after:rounded-full after:-right-2 after:bottom-6
      `}
      style={{ backgroundColor: bgColor }}
    >
      {isPremium && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white p-1 rounded-full shadow">
          <FaCrown className="text-[10px]" />
        </div>
      )}

      <h3 className={`font-bold text-base mb-2 ${isSelected ? "text-blue-800" : "text-gray-800"}`}>
        {type.name}
      </h3>

      <div className="grid grid-cols-2 gap-y-1 gap-x-3 mb-2">
        <p className="text-gray-700">Adult ₹{type.price.adult}</p>
        <p className="text-gray-700">Child ₹{type.price.child}</p>

        {(type.price.weekendAdult > 0 || type.price.weekendChild > 0) && (
          <>
            <p className="col-span-2 text-blue-600 flex items-center gap-1 text-xs mt-1">
              <FaCalendarAlt className="text-blue-500" />
              Weekend Rates:
            </p>
            {type.price.weekendAdult > 0 && (
              <p className="text-xs text-blue-900">Adult ₹{type.price.weekendAdult}</p>
            )}
            {type.price.weekendChild > 0 && (
              <p className="text-xs text-blue-900">Child ₹{type.price.weekendChild}</p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <div
          className={`w-7 h-7 rounded-md flex items-center justify-center 
            ${isSelected ? "bg-blue-600 text-white" : "bg-white/80 text-gray-600"}`}
        >
          <FaTicketAlt className="text-xs" />
        </div>
        {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />}
      </div>
    </div>
  );
};

export default TicketTypeCard;
