import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext"; // ✅ import this too

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AdminAuthProvider> {/* ✅ wrap App inside AdminAuthProvider too */}
        <App />
      </AdminAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
