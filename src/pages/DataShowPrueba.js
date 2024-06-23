import React, { useState, useEffect } from 'react';
import useFetchUsuario from '../hooks/useFetchUsuario';
import BotonPrincipalNavegacion from "../components/ui/BotonPrincipalNavegacion";

const DataShowPrueba = () => {
    const { data, loading, error } = useFetchUsuario();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>CatEje Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <BotonPrincipalNavegacion texto="Regresar" to="/" />
        </div>
    );
};

export default DataShowPrueba;
