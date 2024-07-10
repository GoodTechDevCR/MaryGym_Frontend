import { useState } from 'react';

const useConsultaAbonos = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const consultaAbonos = async (userId) => {
        setLoading(true); // Asegúrate de que loading sea verdadero cuando se inicie la consulta
        try {
            const response = await fetch(`https://marygymbackend-production.up.railway.app/abono/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, consultaAbonos };
};

export default useConsultaAbonos;
