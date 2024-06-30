import React from 'react';
import Foot from "../../components/Footer/Foot";
import MenuHome from '../../components/menu/MenuHome';
import HeadAdmin from "../../components/Header/HeadAdmin";

/* Head admin se debe reemplazar por un header que contenga solo lo negro*/

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

