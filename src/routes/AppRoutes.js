import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import DataShowPrueba from '../pages/DataShowPrueba';
import LogInPage from "../pages/LogInPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/data" element={<DataShowPrueba />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
