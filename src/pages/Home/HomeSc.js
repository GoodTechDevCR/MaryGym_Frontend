import React from 'react';
import Foot from "../../components/Footer/Foot";
import MenuHome from '../../components/menu/MenuHome';
import HeadAdmin from "../../components/Header/HeadAdmin";

/* Cuando el login funcione, cambiar HeadAdmin por HeadUser 
(No contiene las opciones de admin, solo la barrita negra con el logo)
*/

const HomeSc = () => {
    return (
        <div>
            <HeadAdmin/> 
            <MenuHome/>
            <Foot />
        </div>
    );
};

export default HomeSc;

