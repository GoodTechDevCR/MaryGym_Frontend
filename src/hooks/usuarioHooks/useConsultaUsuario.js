import { useState, useEffect } from 'react';

const UseConsultaUsuario = () => {
    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://marygymbackend-production.up.railway.app/usuario`);
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
    }, []);

    return data;
};

export default UseConsultaUsuario;