import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';


// Importaciones de pantallas
import HomeSc from "../pages/Home/HomeSc";
import ContactoSc from "../pages/Home/ContactoSc";
import LogInSc from "../pages/Home/LogInSc";
import PrecioSc from "../pages/Home/PrecioSc";

import InformacionUserSc from "../pages/loggedUser/InformacionUserSc";
import VisualizarRutinaUserSc from '../pages/loggedUser/VisualizarRutinaUserSc';
import PasswordChangeSc from "../pages/passwordChange/PasswordChangeSc";

import LandAdminSc from "../pages/loggedAdmin/LandAdminSc";
import CrearRutinaSc from "../pages/loggedAdmin/rutina/CrearRutinaSc";
import EjercicioDisponible from "../pages/loggedAdmin/rutina/EjercicioDisponible";

import ModificarUsuarioSc from "../pages/loggedAdmin/usuario/ModificarUsuarioSc";
import RegistrarUsuarioSc from "../pages/loggedAdmin/usuario/RegistrarUsuarioSc";
import VisualizarUsuarioSc from "../pages/loggedAdmin/usuario/VisualizarUsuarioSc";
import VisualizarContactoEmergencia from '../pages/loggedAdmin/usuario/VisualizarContactoEmergencia';

import ModificarPagoSc from "../pages/loggedAdmin/pago/ModificarPagoSc";
import RegistrarPagoSc from "../pages/loggedAdmin/pago/RegistrarPagoSc";
import VisualizarPagoSc from "../pages/loggedAdmin/pago/VisualizarPagoSc";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeSc />} />
                <Route path="/contacto" element={<ContactoSc />} />
                <Route path="/login" element={<LogInSc />} />
                <Route path="/precio" element={<PrecioSc />} />

                <Route path="/usuario/:id" element={<ProtectedRoute element={InformacionUserSc} />} />
                <Route path="/usuario/rutina" element={<ProtectedRoute element={VisualizarRutinaUserSc} />} />
                <Route path="/usuario/passwordChange/:correo" element={<PasswordChangeSc />} />

                <Route path="/admin" element={<ProtectedRoute element={LandAdminSc} />} />
                <Route path="/admin/crearRutina" element={<ProtectedRoute element={CrearRutinaSc} />} />
                <Route path="/admin/ejeDisp" element={<ProtectedRoute element={EjercicioDisponible} />} />
                <Route path="/admin/usuario/registrar" element={<ProtectedRoute element={RegistrarUsuarioSc} />} />
                <Route path="/admin/usuario/modificar/:id" element={<ProtectedRoute element={ModificarUsuarioSc} />} />
                <Route path="/admin/usuario/visualizar" element={<ProtectedRoute element={VisualizarUsuarioSc} />} />
                <Route path="/admin/usuario/contactoEmergencia/:id" element={<ProtectedRoute element={VisualizarContactoEmergencia} />} />
                <Route path="/admin/pago/registrar" element={<ProtectedRoute element={RegistrarPagoSc} />} />
                <Route path="/admin/pago/modificar/:id" element={<ProtectedRoute element={ModificarPagoSc} />} />
                <Route path="/admin/pago/visualizar" element={<ProtectedRoute element={VisualizarPagoSc} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
