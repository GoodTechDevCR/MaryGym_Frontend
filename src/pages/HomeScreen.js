import React from 'react';
import BotonPrincipalNavegacion from '../components/ui/BotonPrincipalNavegacion';

const HomeScreen = () => {
    return (
        <div>
            <h1>Home Screen</h1>
            <BotonPrincipalNavegacion texto="Ir a Login" to="/login" />
            <BotonPrincipalNavegacion texto="Ir a mostrar data" to ="/data" />
        </div>
    );
};

export default HomeScreen;
