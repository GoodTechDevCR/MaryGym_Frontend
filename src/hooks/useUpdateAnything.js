import { useState } from 'react';

const useUpdateAnything = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateAnything = async (body) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT', // Utiliza el método PUT para las actualizaciones
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            let responseData;
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (!response.ok) {
                throw new Error(responseData);
            }

            setData(responseData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, updateAnything };
};

export default useUpdateAnything;