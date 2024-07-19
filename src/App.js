import './App.css';
import {Route, Routes} from "react-router";
import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import Events from "./components/Events";
import Admins from "./components/Admins";
import Surveys from "./components/Surveys";

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
      </Routes>
    </div>
  );
}

export default App;
