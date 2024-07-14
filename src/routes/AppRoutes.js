import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//importaciones de homescreen
import HomeSc from "../pages/Home/HomeSc";
import ContactoSc from "../pages/Home/ContactoSc";
import LogInSc from "../pages/Home/LogInSc";
import PrecioSc from "../pages/Home/PrecioSc";

//importaciones de usuario
import InformacionUserSc from "../pages/loggedUser/InformacionUserSc";
import VisualizarRutinaUserSc from '../pages/loggedUser/VisualizarRutinaUserSc';
import PasswordChangeSc from '../pages/passwordChange/PasswordChangeSc';


//importaciones de administrador
import LandAdminSc from "../pages/loggedAdmin/LandAdminSc";

//importacion de crear rutina
import CrearRutinaSc from "../pages/loggedAdmin/rutina/CrearRutinaSc";
import EjercicioDisponible from "../pages/loggedAdmin/rutina/EjercicioDisponible";

//importacion de usuarios
import ModificarUsuarioSc from "../pages/loggedAdmin/usuario/ModificarUsuarioSc";
import RegistrarUsuarioSc from "../pages/loggedAdmin/usuario/RegistrarUsuarioSc";
import VisualizarUsuarioSc from "../pages/loggedAdmin/usuario/VisualizarUsuarioSc";
import VisualizarContactoEmergencia from '../pages/loggedAdmin/usuario/VisualizarContactoEmergencia';

//importacion de pagos
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

                <Route path="/usuario/:id" element={<InformacionUserSc />} />
                <Route path="/usuario/rutina/" element={<VisualizarRutinaUserSc />} />
                <Route path="/usuario/passwordChange/:correo" element={<PasswordChangeSc />} />

                <Route path="/admin/" element={<LandAdminSc />} />

                <Route path="/admin/crearRutina" element={<CrearRutinaSc />} />
                <Route path="/admin/ejeDisp" element={<EjercicioDisponible />} />

                <Route path="/admin/usuario/registrar" element={<RegistrarUsuarioSc />} />
                <Route path="/admin/usuario/modificar/:id" element={<ModificarUsuarioSc />} />
                <Route path="/admin/usuario/visualizar" element={<VisualizarUsuarioSc />} />
                <Route path="/admin/usuario/contactoEmergencia/:id" element={<VisualizarContactoEmergencia />} />

                <Route path="/admin/pago/registrar" element={<RegistrarPagoSc/>} />
                <Route path="/admin/pago/modificar/:id" element={<ModificarPagoSc />} />
                <Route path="/admin/pago/visualizar" element={<VisualizarPagoSc />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
