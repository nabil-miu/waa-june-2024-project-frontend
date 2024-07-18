import "./App.css";
import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import Admins from "./components/Admins";
import Resources from "./components/Resources";

function App() {
  useEffect(() => {
    document.title = "WAA545 - Project - React";
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </div>
  );
}

export default App;
