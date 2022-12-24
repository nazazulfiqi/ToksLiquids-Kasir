import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sukses" element={<Sukses />} />
    </Routes>
  );
}

export default App;
