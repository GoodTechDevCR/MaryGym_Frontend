// DataShowPrueba.js
import React from 'react';
import useFetchUsuario from '../hooks/useFetchUsuario';
import BotonPrincipalNavegacion from "../components/ui/BotonPrincipalNavegacion";
import TableUsuario from "../components/showData/TableUsuario";

const DataShowPrueba = () => {
    const { data, loading, error } = useFetchUsuario();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Show Data</h1>
            <TableUsuario usuarios={data} />
            <BotonPrincipalNavegacion texto="Regresar" to="/" />
        </div>
    );
};

export default DataShowPrueba;

