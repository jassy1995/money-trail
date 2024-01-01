import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotfoundPage from "./pages/NotfoundPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Auth from "./guards/auth";


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" limit={1} />
        <Routes>
          <Route path="/" element={
            <Auth>
              <Home />
            </Auth>
          } />
          <Route path="/auth" element={<Login />} />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
