import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./utils/AuthContext.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      
        <AuthProvider>

          <App />
          <Toaster />

        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
