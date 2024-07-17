import React from 'react';
import {Link} from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/users"><h2>Users</h2></Link>
            <Link to="/surveys"><h2>Surveys</h2></Link>
            <Link to="/surveydirectorys"><h2>SurveyDirectorys</h2></Link>
        </div>
    );
}

export default Dashboard;