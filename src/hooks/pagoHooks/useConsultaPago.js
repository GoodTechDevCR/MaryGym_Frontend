import { useState, useEffect } from 'react';

const UseConsultaPago = (IdUsuario) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = IdUsuario ? `http://localhost:4000/pago/${IdUsuario}` : `http://localhost:4000/pago`;
                const response = await fetch(url);
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

        fetchData();
    }, [IdUsuario]);

    return { data, loading, error };
};

export default UseConsultaPago;
