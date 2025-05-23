import { FaMinus, FaPlus } from "react-icons/fa";

const TicketCounter = ({ label, count, setCount }) => {
  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setCount(Math.max(0, value));
  };

  const decrement = () => {
    setCount(Math.max(0, count - 1));
    // Animation trigger
    document.activeElement.blur();
  };

  const increment = () => {
    setCount(count + 1);
    // Animation trigger
    document.activeElement.blur();
  };

  return (
    <div className="relative group">
      {/* Floating label */}
      <label className="block mb-2 text-sm font-medium text-gray-700 transition-all duration-300 group-focus-within:text-blue-600">
        {label}
      </label>
      
      <div className="flex items-center gap-1.5">
        {/* Decrement button */}
        <button
          onClick={decrement}
          className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
            count === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 hover:from-blue-200 hover:to-blue-100 shadow-sm hover:shadow-md active:scale-95 border border-blue-200"
          }`}
          disabled={count === 0}
        >
          <FaMinus className="text-xs" />
        </button>

        {/* Input field */}
        <div className="relative">
          <input
            type="number"
            value={count}
            onChange={handleChange}
            className={`w-20 h-10 border-2 text-center font-medium rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-300 ${
              count > 0 ? "text-blue-800 border-blue-300" : "text-gray-700 border-gray-300"
            }`}
          />
          {count > 0 && (
            <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300"></div>
          )}
        </div>

        {/* Increment button */}
        <button
          onClick={increment}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 hover:from-purple-200 hover:to-purple-100 shadow-sm hover:shadow-md active:scale-95 transition-all duration-300 border border-purple-200"
        >
          <FaPlus className="text-xs" />
        </button>
      </div>

      {/* Animated focus indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 w-0 group-focus-within:w-full transition-all duration-500"></div>
    </div>
  );
};

export default TicketCounter;