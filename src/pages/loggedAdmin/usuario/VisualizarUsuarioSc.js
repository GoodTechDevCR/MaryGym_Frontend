import React from 'react';
import TablaUsuario from "../../../components/showData/TablaUsuario";
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import Head from "../../../components/Header/Head";
import Foot from "../../../components/Footer/Foot";

const VisualizarUsuarioSc = () => {
    return (
        <div>
            <Head/>
            <h1>VisualizarUsuarioSc</h1>
            <TablaUsuario/>
            <Foot />
        </div>
    );
};

export default VisualizarUsuarioSc;
