import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import BotonPrincipalNavegacion from "../components/ui/BotonPrincipalNavegacion";

const DataShowPrueba = () => {
    const [endpoint, setEndpoint] = useState('usuario'); // Valor inicial del endpoint

    const handleChange = (e) => {
        setEndpoint(e.target.value);
    };

    const { data, loading, error } = useFetchData(endpoint);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>CatEje Data</h1>
            <input type="text" value={endpoint} onChange={handleChange} />
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <BotonPrincipalNavegacion texto="Regresar" to="/" />
        </div>
    );
};

export default DataShowPrueba;
