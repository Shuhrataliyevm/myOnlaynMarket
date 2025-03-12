// export default App;
import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import Home from "./assets/components/pages/Home/Home";
import Add from "./assets/components/pages/Add/Add";
import Buy from "./assets/components/pages/Buy/Buy";
import Router from "./router"; // ⬅️ "./router/Router" emas! "./router" yoki "./router/index" bo‘lishi kerak!
import Products from "./assets/components/Products/Products";
import LoginPages from "./pages/LoginPages";
import Liked from "./assets/components/pages/Liked/Liked";
import ProfilPages from "./pages/ProfilPages";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/products" element={<Products />} />
        <Route path="/router/*" element={<Router />} />  {/* ⬅️ Yo‘lni ham tekshiring! */}
        <Route path="/buy" element={<Buy />} />
        <Route path="/favorite" element={<Liked />} />
        <Route path="/login" element={<LoginPages />} />   
        <Route path="/profile" element={<ProfilPages />} />   
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
