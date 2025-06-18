import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [firmname, setFirmname] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    // , firmname
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('../img/login2.jpg')` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-200 animate-pulse opacity-50 z-0"></div>

      {/* Company Logos */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-4">
        <img 
          src="../img/aquasoft__1_-removebg-preview-removebg-preview.png" 
          alt="Client Logo" 
          className="h-12 object-contain"
        />
        
      </div>

      {/* Login Card */}
     <form
  onSubmit={handleSubmit}
  className="relative z-10 bg-white bg-opacity-10 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-purple-300 w-full max-w-md space-y-6 transform hover:scale-105 transition-all duration-300 mb-16"
>
  {/* Logo positioned at top-right of form */}
<div className="flex items-center justify-center space-x-4 mb-6">
  <img 
    src="../img/demo_wp.jpeg" 
    alt="PearlInfo Logo" 
    className="h-12 object-contain"
  />
  <h1 className="text-3xl font-extrabold text-sky-700 drop-shadow-lg">
    Welcome Back!
  </h1>
</div>



  {/* <input
    type="text"
    placeholder="Firm Name"
    value={firmname}
    onChange={(e) => setFirmname(e.target.value)}
    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-800 bg-opacity-60 text-white outline-none focus:ring-2 focus:ring-purple-400 transition-all"
  /> */}
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-800 bg-opacity-60 text-white outline-none focus:ring-2 focus:ring-purple-400 transition-all"
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-800 bg-opacity-60 text-white outline-none focus:ring-2 focus:ring-purple-400 transition-all"
  />
  <div className="h-5">
  {error && <p className="text-sm text-red-500 text-center">{error}</p>}
</div>


  <button
    type="submit"
    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
  >
    Login
  </button>
</form>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 bg-black bg-opacity-50 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 text-center text-gray-300 text-sm">
          <p>
            Designed and developed by{" "}
            <a 
              href="https://pearlinfo.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-300 hover:text-white transition-colors"
            >
              PearlInfo Pvt. Ltd.
            </a>
          </p>
          <p className="text-xs mt-1 text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;