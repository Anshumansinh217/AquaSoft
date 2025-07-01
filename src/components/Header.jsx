import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faUtensils,
  faShoppingBag,
  faPenToSquare,
  faUserShield,
  faRightFromBracket,
  faInbox,
  faTableList,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-sky-50 to-sky-100 backdrop-blur-lg shadow-md border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-6">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-900 shadow-md flex items-center justify-center">
              <img
                src="../img/aquasoft__1_-removebg-preview-removebg-preview.png"
                alt="AquaSoft Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-700">
                Aqua
              </span>
              Soft
            </h1>
          </Link>

          {/* Navigation */}
          <ul className="flex space-x-5 items-center text-sm font-medium text-gray-700">
            {/* Issuance Dropdown */}
            <li className="relative group">
              <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded transition">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-blue-500 text-lg"
                />
                <span>Issuance</span>
              </div>
              <ul className="absolute z-50 left-0 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/band-issuance"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Band Issuance
                  </Link>
                </li>

                {/* Nested Dropdown: Recharge & Replace */}
                <li className="relative group/item">
                  <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
                    <span>Recharge & Replace</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="ml-2 text-xs"
                    />
                  </div>
                  <ul className="absolute top-0 left-full ml-1 w-56 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200">
                    <li>
                      <Link
                        to="/RechargeList"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Band Balance Recharge
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/BandReplaceList"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Band Replace
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    to="/locker-issuance"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Locker Issuance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/CostumeBookingTable"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Costume Issuance
                  </Link>
                </li>
              </ul>
            </li>

            {/* Ticket */}
            <NavItem
              to="/ticket-issue"
              icon={faTicket}
              label="Ticket"
              color="from-yellow-400 to-orange-500"
            />

            {/* Summary */}

            <li className="relative group">
              <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded transition">
                <FontAwesomeIcon
                  icon={faTableList}
                  className="text-blue-500 text-lg"
                />
                <span>Summary</span>
              </div>
              <ul className="absolute z-50 left-0 mt-1 w-52 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/BandLockerSummary"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    BandLockerSummary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/BandRechargeSummary"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    BandRechargeSummary
                  </Link>
                </li>
                                <li>
                  <Link
                    to="/BandExpenseSummary"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    BandExpenseSummary
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
              <div className="flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded transition">
                <FontAwesomeIcon
                  icon={faInbox}
                  className="text-blue-500 text-lg"
                />
                <span>Return</span>
              </div>
              <ul className="absolute z-50 left-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <li>
                  <Link
                    to="/LockerReturn"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Locker Return
                  </Link>
                </li>
              </ul>
            </li>

            {/* Admin Panel */}
            <NavItem
              to="/admin"
              icon={faUserShield}
              label="Admin Panel"
              color="from-gray-400 to-gray-600"
            />

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
      className={`relative px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 rounded transition group`}
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
