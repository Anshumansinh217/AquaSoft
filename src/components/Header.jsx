import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faUtensils,
  faShoppingBag,
  faTshirt,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-sky-50 to-sky-100 backdrop-blur-lg shadow-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo with link to homepage */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-900 shadow-md flex items-center justify-center">
              <img
                src="../img/aquasoft__1_-removebg-preview-removebg-preview.png"
                alt="AquaSoft Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-700">
                Aqua
              </span>
              Soft
            </h1>
          </Link>

          {/* Navigation Items */}
          <ul className="flex space-x-6 items-center">
            <NavItem to="/ticket-issue" icon={faTicket} label="Tickets" color="from-blue-400 to-cyan-500" />
            <NavItem to="/restaurant" icon={faUtensils} label="Dining" color="from-yellow-400 to-orange-500" />
            <NavItem to="/ArticleSalesPage" icon={faShoppingBag} label="Article Sale" color="from-green-400 to-blue-400" />
            <NavItem to="/CostumeForm" icon={faTshirt} label="Costume" color="from-pink-400 to-purple-500" />
            <NavItem to="/band-issuance" icon={faMoneyCheckAlt} label="Band Issuance" color="from-indigo-400 to-purple-500" />
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Reusable NavItem component
const NavItem = ({ to, icon, label, color }) => (
  <li>
    <Link
      to={to}
      className={`
        relative px-4 py-2 flex items-center space-x-2 text-sm font-medium
        text-gray-700 hover:text-indigo-700 transition-all duration-200 group
      `}
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-blue-500 text-lg transition-transform duration-200 group-hover:scale-110"
      />
      <span>{label}</span>
      <span
        className={`
          absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
          bg-gradient-to-r ${color} rounded-full
          transition-all duration-300 group-hover:w-4/5
        `}
      ></span>
    </Link>
  </li>
);

export default Header;
