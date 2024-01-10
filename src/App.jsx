import React from "react";
import "./App.css";

import Popular from "./components/Popular";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AnimeItem from "./components/AnimeItem.jsx";
import Homepage from "./components/HomePage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/anime/:id" element={<AnimeItem/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
