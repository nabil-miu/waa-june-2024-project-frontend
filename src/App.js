import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/events">Events</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
