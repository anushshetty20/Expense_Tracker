import React,{useState} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import {Toaster} from 'react-hot-toast';

// Loading screen component
const LoadingScreen = ({ message }) => (
  <div style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa"
  }}>
    <div style={{
      border: "6px solid #f3f3f3",
      borderTop: "6px solid #3498db",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite"
    }} />
    <h2 style={{ marginTop: "20px", color: "#333" }}>{message}</h2>
    <p style={{ color: "#777" }}>This may take 30–60 seconds if the server is idle.</p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

const App = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ping your backend
    fetch("https://expense-tracker-backend-uv4x.onrender.com/ping")
      .then(() => setLoading(false))
      .catch(() => {
        // Wait a bit before hiding loading in case backend is waking up
        setTimeout(() => setLoading(false), 50000);
      });
  }, []);

  if (loading) {
    return <LoadingScreen message="Waking up the server..." />;
  }
  
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"13px"
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
