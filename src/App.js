import './App.css';
import {Route, Routes} from "react-router";
import React, {useEffect} from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import ListResourceCategories from './components/category/ListResourceCategories';
import CreateResourceCategory from './components/category/CreateResourceCategory';
import UpdateResourceCategory from './components/category/UpdateResourceCategory';

function App() {
    useEffect(() => {
        document.title = "WAA545 - Project - React";
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/list-resource-category"  exact element={<ListResourceCategories/>} />
                <Route path="/create-resource-category" element={<CreateResourceCategory/>} />
                <Route path="/update-resource-category/:id" element={<UpdateResourceCategory/>} />
            </Routes>
        </div>
    );
}

export default App;
