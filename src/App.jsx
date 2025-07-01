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
import RestaurantTable from "./pages/restaurant/RestaurantTable";

import PrintToken from "./pages/restaurant/PrintToken";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";

import Article from "./pages/article/Article";
import ArticleSalesPage from "./pages/article/ArticleSalesPage";
import CostumeForm from "./pages/Costume/CostumeForm";
import CostumeReceipt from "./pages/Costume/costume-receipt";
import CostumeBookingTable from "./pages/Costume/CostumeBookingTable";

import BandIssuanceListPage from "./pages/BandIssuance/BandIssuanceListPage";
import BandIssuanceFormPage from "./pages/BandIssuance/BandIssuanceFormPage";
import RechargeList from "./pages/BandIssuance/RechargeList";
import RechargeForm from "./pages/BandIssuance/RechargeForm";
import BandReplaceForm from "./pages/BandIssuance/BandReplaceForm";
import BandReplaceList from "./pages/BandIssuance/BandReplaceList";

import LockerListPage from "./pages/locker/LockerListPage";
import LockerIssuancePage from "./pages/locker/LockerIssuancePage";
import LockerReturn from "./components/locker/LockerReturn";


import LockerReceipt from './pages/locker/LockerReceipt';


// Summary
import BandLockerSummary from "./pages/summary/BandLockerSummary";
import BandRechargeSummary from "./pages/summary/BandRechargeSummary";
import BandExpenseSummary from "./pages/summary/BandExpenseSummary";
import MissingBandSummary from "./pages/summary/MissingBandSummary";
import LockerRentSummary from "./pages/summary/LockerRentSummary";

// reports
import BandCounterReport from "./pages/reports/BandCounterReport";


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faPrint,
  faTrash,
  faEye,
  faRupeeSign
} from "@fortawesome/free-solid-svg-icons";




import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/admin/AdminLogin";

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

          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/admin/*" element={<AdminRoutes />} />

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
            path="/RestaurantTable"
            element={
              <PrivateRoute>
                <RestaurantTable />
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
            path="/Article"
            element={
              <PrivateRoute>
                <Article />
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
            path="/CostumeBookingTable"
            element={
              <PrivateRoute>
                <CostumeBookingTable />
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
  path="/RechargeList"
  element={
    <PrivateRoute>
      <RechargeList />
    </PrivateRoute>
  }
/>

<Route
  path="/RechargeForm"
  element={
    <PrivateRoute>
      <RechargeForm />
    </PrivateRoute>
  }
/>


<Route
  path="/BandReplaceList"
  element={
    <PrivateRoute>
      <BandReplaceList />
    </PrivateRoute>
  }
/>

<Route
  path="/BandReplaceForm"
  element={
    <PrivateRoute>
      <BandReplaceForm />
    </PrivateRoute>
  }
/>

{/* summary */}
<Route
  path="/BandLockerSummary"
  element={
    <PrivateRoute>
      <BandLockerSummary />
    </PrivateRoute>
  }
/>

<Route
  path="/BandRechargeSummary"
  element={
    <PrivateRoute>
      <BandRechargeSummary />
    </PrivateRoute>
  }
/>
<Route
  path="/BandExpenseSummary"
  element={
    <PrivateRoute>
      <BandExpenseSummary />
    </PrivateRoute>
  }
/>

<Route
  path="/MissingBandSummary"
  element={
    <PrivateRoute>
      <MissingBandSummary />
    </PrivateRoute>
  }
/>

{/* reports */}

<Route
  path="/LockerRentSummary"
  element={
    <PrivateRoute>
      <LockerRentSummary />
    </PrivateRoute>
  }
/>


<Route
  path="/BandCounterReport"
  element={
    <PrivateRoute>
      <BandCounterReport />
    </PrivateRoute>
  }
/>


          <Route
            path="/locker-issuance"
            element={
              <PrivateRoute>
                <LockerListPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/locker-issuance/new"
            element={
              <PrivateRoute>
                <LockerIssuancePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/LockerReturn"
            element={
              <PrivateRoute>
                <LockerReturn />
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

          <Route
            path="/LockerReceipt"
            element={
              <PrivateRoute>
                <LockerReceipt />
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
