import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TicketIssueHome from "./pages/TicketIssue/TicketIssueHome";
import TicketForm from "./pages/TicketIssue/TicketForm";
import TicketPayment from "./pages/TicketIssue/TicketPayment";
import TicketPrint from "./pages/TicketIssue/TicketPrint";
import Restaurant from "./pages/restaurant/RestaurantPage";
import PrintToken from "./pages/restaurant/PrintToken";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import ArticleSalesPage from "./pages/article/ArticleSalesPage";
import CostumeForm from "./pages/Costume/CostumeForm"
import CostumeReceipt from "./pages/Costume/costume-receipt";

import BandIssuanceListPage from "./pages/BandIssuance/BandIssuanceListPage";
import BandIssuanceFormPage from "./pages/BandIssuance/BandIssuanceFormPage";


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faPrint,
  faTrash,
  faEye,
  faRupeeSign
} from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faPrint, faTrash, faEye, faRupeeSign);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}

      <div className="p-4 min-h-screen pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/ticket-issue"
            element={
              <PrivateRoute>
                <TicketIssueHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/ticket-form"
            element={
              <PrivateRoute>
                <TicketForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/ticket-payment"
            element={
              <PrivateRoute>
                <TicketPayment />
              </PrivateRoute>
            }
          />
          <Route
            path="/ticket-print"
            element={
              <PrivateRoute>
                <TicketPrint />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant"
            element={
              <PrivateRoute>
                <Restaurant />
              </PrivateRoute>
            }
          />

           <Route
            path="/ArticleSalesPage"
            element={
              <PrivateRoute>
                <ArticleSalesPage />
              </PrivateRoute>
            }
          />

           <Route
            path="/CostumeForm"
            element={
              <PrivateRoute>
                <CostumeForm />
              </PrivateRoute>
            }
          />

          <Route
            path="/Costume-receipt"
            element={
              <PrivateRoute>
                <CostumeReceipt />
              </PrivateRoute>
            }
          />

          <Route
  path="/band-issuance"
  element={
    <PrivateRoute>
      <BandIssuanceListPage />
    </PrivateRoute>
  }
/>

<Route
  path="/band-issuance/new"
  element={
    <PrivateRoute>
      <BandIssuanceFormPage />
    </PrivateRoute>
  }
/>


  

          <Route
            path="/print-token"
            element={
              <PrivateRoute>
                <PrintToken />
              </PrivateRoute>
            }
          />
        </Routes>
        
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
