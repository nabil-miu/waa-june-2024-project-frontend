import './App.css';
import {Route, Routes} from "react-router";
import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import ListResourceCategories from './components/ListResourceCategories';

function App() {
    useEffect(() => {
        document.title = "WAA545 - Project - React";
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/list-resource-category"  exact component={ListResourceCategories} />
            </Routes>
        </div>
    );
}

export default App;
