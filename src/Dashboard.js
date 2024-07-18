import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/users"><h2>Users</h2></Link>
            <Link to="/events"><h2>Events</h2></Link>
            <Link to="/admins"><h2>Admins</h2></Link>
            <Link to="/list-resource-category"><h2>Resource Category</h2></Link>
            <Link to="/list-posts"><h2>Posts</h2></Link>
        </div>
    );
}

export default Dashboard;
