import { useState } from 'react';

const useCreateAnything = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createAnything = async (body, onSuccess, onError) => {
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
            if (onSuccess) onSuccess(responseData);
        } catch (err) {
            setError(err);
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, createAnything };
};

export default useCreateAnything;
