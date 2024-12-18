// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import GlobalStyle from "./styles/global";
import Signin from "./pages/Signin";
import Signup from "./pages/Home/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Home/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route
            path="/*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
