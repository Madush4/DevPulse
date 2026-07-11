import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import "./App.css";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/u/:username" element={<Profile />} />
      </Routes>
      
    </div>
  );
}

export default App;
