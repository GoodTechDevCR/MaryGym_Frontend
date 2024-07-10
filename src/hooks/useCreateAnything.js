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
            console.log("RESPONSE: ", response);

            let responseData;
            const contentType = response.headers.get('Content-Type');
            console.log(body);
            console.log(contentType?.includes('text/html'));

            if (contentType && (contentType.includes('application/json') || contentType.includes('text/html'))) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
                console.log(responseData);
            }

            if (!response.ok) {
                throw new Error(responseData?.message || 'Error desconocido');
            }

            setData(responseData);
            setSuccess(true);
            return { success: true, data: responseData };
        } catch (err) {
            setError(err);
            setSuccess(false);
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, success, createAnything };
};

export default useCreateAnything;
