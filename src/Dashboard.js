import React from 'react';
import {Link} from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/users"><h2>Users</h2></Link>
        </div>
    );
}

export default Dashboard;