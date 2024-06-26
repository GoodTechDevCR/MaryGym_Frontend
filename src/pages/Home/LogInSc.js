import React from 'react';
import BotonPrincipalNavegacion from '../../components/ui/BotonPrincipalNavegacion';
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";

const LogInSc = () => {
    return (
        <div>
            <Head/>
            <h1>Login Page</h1>
            <BotonPrincipalNavegacion texto="Regresar" to="/" />
            <Foot />
        </div>
    );
};

export default LogInSc;
