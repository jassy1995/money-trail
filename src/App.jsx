
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import AllApp from "./pages/AllApp";
import AllUser from "./pages/AllUser";
import PasswordReset from "./pages/passwordReset";
import AllActiveUser from "./pages/AllActiveUser";
import MerchantSignUp from "./pages/MerchantSignUp";
import Pending from "./pages/Pending";
import Approved from "./pages/Approved";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" limit={1} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/approved" element={<Approved />} />
          <Route path="/auth" element={<Login />} />
          <Route path="apps" element={<AllApp />} />
          <Route path="users" element={<AllUser />} />
          <Route path="users-active" element={<AllActiveUser />} />
          <Route path="merchant-signup" element={<MerchantSignUp />} />
          <Route path="password" element={<PasswordReset />} />
          <Route path="password/:token" element={<PasswordReset />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
