import React from 'react';
import TablaUsuario from "../../../components/showData/TablaUsuario";
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import Foot from "../../../components/Footer/Foot";

const VisualizarUsuarioSc = () => {
    return (
        <div >
            <HeadAdmin/>
            <div className='centered-title2'> 
                <h1 className='black'>Usuarios</h1>
            </div>
            <TablaUsuario/>
            <Foot />
            <br/> <br/> <br/> <br/> <br/>
        </div>
    );
};

export default VisualizarUsuarioSc;
