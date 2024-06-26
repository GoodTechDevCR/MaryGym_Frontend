import { useState } from 'react';

const useCreateAnything = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
            setSuccess(true); // Marcar la operación como exitosa
            return true;
        } catch (err) {
            setError(err);
            setSuccess(false); // Marcar la operación como fallida
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, success, createAnything };
};

export default useCreateAnything;
