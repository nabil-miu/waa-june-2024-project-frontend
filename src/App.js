import "./App.css";
import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Users from "./components/Users";
import Events from "./components/Events";
import Admins from "./components/Admins";
import ListResourceCategories from './components/category/ListResourceCategories';
import CreateResourceCategory from './components/category/CreateResourceCategory';
import UpdateResourceCategory from './components/category/UpdateResourceCategory';
import ListPosts from './components/posts/ListPosts';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';



function App() {
    useEffect(() => {
        document.title = "WAA545 - Project - React";
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/events" element={<Events />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/list-resource-category" element={<ListResourceCategories/>}/>
                <Route path="/create-resource-category" element={<CreateResourceCategory/>} />
                <Route path="/update-resource-category/:id" element={<UpdateResourceCategory/>} />
                <Route path="/list-posts" element={<ListPosts/>} />
                <Route path="/create-post" element={<CreatePost/>} />
                <Route path="/update-post/:id" element={<UpdatePost/>} />
            </Routes>
        </div>
    );
}

export default App;
