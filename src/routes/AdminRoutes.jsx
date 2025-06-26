import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TicketTypeMaster from "../pages/admin/TicketTypeMaster";
import RestaurantMaster from "../pages/admin/RestaurantMaster";
import ArticleMaster from "../pages/admin/ArticleMaster";
import LockerMaster from "../pages/admin/LockerMaster";
import AdminPrivateRoute from "../components/AdminPrivateRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
      <Route path="tickets" element={<AdminPrivateRoute><TicketTypeMaster /></AdminPrivateRoute>} />
      <Route path="restaurant" element={<AdminPrivateRoute><RestaurantMaster /></AdminPrivateRoute>} />
      <Route path="article-master" element={<AdminPrivateRoute><ArticleMaster /></AdminPrivateRoute>} />
      <Route path="locker-master" element={<AdminPrivateRoute><LockerMaster /></AdminPrivateRoute>} />
    </Routes>
  );
};

export default AdminRoutes;
