import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import CatEjePage from '../pages/CatEjePage';
import LogInPage from "../pages/LogInPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/catEje" element={<CatEjePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
