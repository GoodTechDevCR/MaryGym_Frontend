import { useState, useEffect } from 'react';

const useFetchUsuario = () => {
    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/usuario`);
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

export default useFetchUsuario;
