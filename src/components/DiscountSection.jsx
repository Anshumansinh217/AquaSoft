const DiscountSection = ({ discountByAmount, discountByPercent, onAmountChange, onPercentChange }) => {
  const preventMinus = (e) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  const handleAmountChange = (e) => {
    const value = Math.max(0, Number(e.target.value));
    onAmountChange({ target: { value } });
  };

  const handlePercentChange = (e) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    onPercentChange({ target: { value } });
  };

  return (
    <>
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="space-y-5 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-100 shadow-lg relative overflow-hidden">
        <h3 className="text-xl font-bold text-purple-900 mb-2">Apply Discount</h3>

        <div className="space-y-4">
          {/* Flat Amount Discount */}
          <div className="group">
            <label className="block text-sm font-medium text-purple-800 mb-1">Flat Discount (₹)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-500">
                <span className="font-medium">₹</span>
              </div>
              <input
                type="number"
                value={discountByAmount}
                onChange={handleAmountChange}
                onKeyDown={preventMinus}
                onWheel={(e) => e.target.blur()}
                min="0"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
            </div>
          </div>

          {/* Percentage Discount */}
          <div className="group">
            <label className="block text-sm font-medium text-purple-800 mb-1">Percentage Discount (%)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-500">
                <span className="font-medium">%</span>
              </div>
              <input
                type="number"
                value={discountByPercent}
                onChange={handlePercentChange}
                onKeyDown={preventMinus}
                onWheel={(e) => e.target.blur()}
                min="0"
                max="100"
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-purple-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300 transition-all duration-300 shadow-sm"
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-purple-300/30 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-2xl bg-gradient-to-br from-purple-400/10 to-blue-400/10"></div>
      </div>
    </>
  );
};

export default DiscountSection;
