// src/components/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-8xl mx-auto px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo with water-inspired accent */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05)] flex items-center justify-center">
              <span className="text-white text-lg">🌊</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Aqua</span>Soft
            </h1>
          </div>

          {/* Navigation with micro-interactions */}
          <ul className="flex space-x-6">
            <NavItem 
              to="/ticket-issue" 
              icon="🎟️" 
              label="Tickets"
              color="from-blue-400 to-cyan-500"
            />
            <NavItem 
              to="/restaurant" 
              icon="🍽️" 
              label="Dining"
              color="from-amber-400 to-orange-400"
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Reusable NavItem component for cleaner code
const NavItem = ({ to, icon, label, color }) => (
  <li>
    <Link
      to={to}
      className={`
        relative px-3 py-2 flex items-center space-x-2 text-sm font-medium
        text-gray-600 hover:text-gray-900 transition-colors duration-200
        group
      `}
    >
      <span className="text-lg transition-transform duration-200 group-hover:scale-110">
        {icon}
      </span>
      <span>{label}</span>
      <span className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
        bg-gradient-to-r ${color} rounded-full
        transition-all duration-300 group-hover:w-4/5
      `}></span>
    </Link>
  </li>
);

export default Header;