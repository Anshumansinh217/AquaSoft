// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TicketIssueHome from "./pages/TicketIssue/TicketIssueHome";
import TicketForm from "./pages/TicketIssue/TicketForm";
import TicketPayment from "./pages/TicketIssue/TicketPayment";
import TicketPrint from "./pages/TicketIssue/TicketPrint";
import Restaurant from "./pages/restaurant/RestaurantPage";
import PrintToken from "./pages/restaurant/PrintToken";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPrint, faTrash, faEye, faRupeeSign } from '@fortawesome/free-solid-svg-icons';




library.add(faEdit, faPrint, faTrash, faEye, faRupeeSign);

// (Restaurant page component will come later)

function App() {
  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/ticket-issue" element={<TicketIssueHome />} />
          <Route path="/ticket-form" element={<TicketForm />} />
          <Route path="/ticket-payment" element={<TicketPayment />} />
          <Route path="/ticket-print" element={<TicketPrint />} />

          {/* Restaurant route placeholder */}
          <Route path="/Restaurant" element={<Restaurant/>} />
          <Route path="/print-token" element={<PrintToken />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
