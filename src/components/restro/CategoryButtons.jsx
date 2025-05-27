import React from "react";

const categories = [
  { id: "starter", label: "Starters" },
  { id: "main", label: "Main Course" },
  { id: "dessert", label: "Desserts" },
  { id: "beverage", label: "Beverages" },
];

const CategoryButtons = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`relative overflow-hidden px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            selected === cat.id
              ? "text-white shadow-lg"
              : "text-purple-900 bg-purple-100 hover:bg-purple-200 border border-purple-200"
          }`}
        >
          {/* Base state */}
          <span className="relative z-10">
            {cat.label}
          </span>
          
          {/* Selected state gradient layer */}
          {selected === cat.id && (
            <>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 z-0"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;