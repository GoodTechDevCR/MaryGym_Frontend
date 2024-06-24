import { useState } from 'react';

const useCreateAnything = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createAnything = async (body) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, createAnything };
};

export default useCreateAnything;
