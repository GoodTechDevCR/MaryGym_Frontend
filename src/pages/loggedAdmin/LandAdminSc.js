import React from 'react';
import Foot from "../../components/Footer/Foot";
import HeadAdmin from "../../components/Header/HeadAdmin";

const LandAdminSc = () => {
    return (
        <div >
            <HeadAdmin/>
            <div className='centered-title'>   
                <h1 className='black'>Hola Administrador</h1>
                <body> Utiliza el menú a la izquierda para manejar pagos, rutinas y usuarios.</body>
            </div>
            <Foot />
        </div>
    );
};

export default LandAdminSc;
