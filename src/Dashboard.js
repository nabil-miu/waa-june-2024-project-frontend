import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/users">
        <h2>Users</h2>
      </Link>
      <Link to="/events">
        <h2>Events</h2>
      </Link>
      <Link to="/admins">
        <h2>Admins</h2>
      </Link>
      <Link to="/resources">
        <h2>"Resources"</h2>
      </Link>
    </div>
  );
}

export default Dashboard;
