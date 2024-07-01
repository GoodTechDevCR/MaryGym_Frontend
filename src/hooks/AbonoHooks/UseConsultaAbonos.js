import { useState } from 'react';

const useConsultaAbonos = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const consultaAbonos = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/abono/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return { data, loading, error, consultaAbonos };
};

export default useConsultaAbonos;