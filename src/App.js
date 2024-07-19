import "./App.css";
import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import Events from "./components/Events";
import Admins from "./components/Admins";
import StudentDirectories from "./components/StudentDirectories";
import Surveys from "./components/Surveys";
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
        <Route path="/events" element={<Events />} />
        <Route path="/admins" element={<Admins />} />
          <Route path="/surveys" element={<Surveys/>}/>
          <Route path="/studentdirectory" element={<StudentDirectories/>} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </div>
  );
}

export default App;
