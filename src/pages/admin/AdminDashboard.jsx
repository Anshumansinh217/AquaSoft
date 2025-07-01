import { Link, useNavigate } from "react-router-dom";
import { FaTicketAlt, FaUtensils, FaBoxOpen, FaLock } from "react-icons/fa"; // ⬅️ Added FaLock
import { useAdminAuth } from "../../context/AdminAuthContext";

const cardStyles = "group block rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all p-6";
const iconWrapperBase = "w-12 h-12 flex items-center justify-center rounded-full shadow-sm transition-all";
const headingBase = "text-lg font-semibold text-gray-800 transition-colors";
const subText = "text-sm text-gray-500";

const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md rounded-xl p-4 mb-4 border border-indigo-300">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <span className="text-white text-xl">🛠️</span>
          </div>
          <h1 className="text-white text-xl font-semibold tracking-wide drop-shadow-sm">
            Admin Panel
          </h1>
        </div>
      </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Entry Ticket Master */}
        <Link to="/admin/tickets" className={cardStyles}>
          <div className="flex items-center gap-4">
            <div className={`${iconWrapperBase} bg-blue-100 text-blue-600 group-hover:bg-blue-200`}>
              <FaTicketAlt className="text-xl" />
            </div>
            <div>
              <h2 className={`${headingBase} group-hover:text-blue-600`}>Entry Ticket Master</h2>
              <p className={subText}>Manage ticket types & pricing</p>
            </div>
          </div>
        </Link>

        {/* Restaurant Master */}
        <Link to="/admin/restaurant" className={cardStyles}>
          <div className="flex items-center gap-4">
            <div className={`${iconWrapperBase} bg-green-100 text-green-600 group-hover:bg-green-200`}>
              <FaUtensils className="text-xl" />
            </div>
            <div>
              <h2 className={`${headingBase} group-hover:text-green-600`}>Restaurant Master</h2>
              <p className={subText}>Manage restaurant menu items</p>
            </div>
          </div>
        </Link>

        {/* Article Master */}
        <Link to="/admin/article-master" className={cardStyles}>
          <div className="flex items-center gap-4">
            <div className={`${iconWrapperBase} bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200`}>
              <FaBoxOpen className="text-xl" />
            </div>
            <div>
              <h2 className={`${headingBase} group-hover:text-yellow-600`}>Article Master</h2>
              <p className={subText}>Manage article sales items</p>
            </div>
          </div>
        </Link>

        {/* Locker Master */}
        <Link to="/admin/locker-master" className={cardStyles}>
          <div className="flex items-center gap-4">
            <div className={`${iconWrapperBase} bg-purple-100 text-purple-600 group-hover:bg-purple-200`}>
              <FaLock className="text-xl" />
            </div>
            <div>
              <h2 className={`${headingBase} group-hover:text-purple-600`}>Locker Master</h2>
              <p className={subText}>Manage lockers & availability</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
