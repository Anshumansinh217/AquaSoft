import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faUtensils,
  faShoppingBag,

  faUserShield,
  faRightFromBracket,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-sky-50 to-sky-100 backdrop-blur-lg shadow-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
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

          {/* Nav Items */}
          <ul className="flex space-x-6 items-center">
            {/* Issuance Dropdown */}
            <li className="relative group">
              <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-700 cursor-pointer">
                <FontAwesomeIcon icon={faTicket} className="text-blue-500 text-lg" />
                <span>Issuance</span>
              </div>
              <ul className="absolute z-50 left-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/band-issuance"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Band Issuance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/locker-issuance"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Locker Issuance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CostumeBookingTable"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Costume Issuance
                  </Link>
                </li>
              </ul>
            </li>



            {/* Restaurant */}
            <NavItem
              to="/RestaurantTable"
              icon={faUtensils}
              label="Restaurant"
              color="from-yellow-400 to-orange-500"
            />

            {/* Article Sales */}
            <NavItem
              to="/Article"
              icon={faShoppingBag}
              label="Article Sales"
              color="from-green-400 to-blue-400"
            />
                        {/* Return Dropdown */}
            <li className="relative group">
              <div className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-700 cursor-pointer">
                <FontAwesomeIcon icon={faInbox} className="text-blue-500 text-lg" />
                <span>Return</span>
              </div>
              <ul className="absolute z-50 left-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/LockerReturn"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                  >
                    Locker Return
                  </Link>
                </li>
              </ul>
            </li>

            {/* Admin Panel */}
            <li>
              <Link
                to="/admin"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-700"
              >
                <FontAwesomeIcon icon={faUserShield} className="text-gray-500 text-lg" />
                <span>Admin Panel</span>
              </Link>
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={() => window.location.reload()}
                title="Logout"
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-red-500 text-lg"
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// 🔁 Reusable NavItem component
const NavItem = ({ to, icon, label, color }) => (
  <li>
    <Link
      to={to}
      className={`relative px-4 py-2 flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-indigo-700 transition-all duration-200 group`}
    >
      <FontAwesomeIcon
        icon={icon}
        className="text-blue-500 text-lg transition-transform duration-200 group-hover:scale-110"
      />
      <span>{label}</span>
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
          bg-gradient-to-r ${color} rounded-full
          transition-all duration-300 group-hover:w-4/5`}
      ></span>
    </Link>
  </li>
);

export default Header;
