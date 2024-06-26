import { useState } from 'react';

const useUpdateAnything = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateAnything = async (body) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            console.log("RESPONSE: ",response);

            let responseData;
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json();
            } else {
                responseData = await response.text();
            }

            if (!response.ok) {
                throw new Error(responseData); // Lanza un error si la respuesta no es exitosa
            }

            setData(responseData); // Actualiza el estado con los datos recibidos
            return true; // Devuelve true para indicar que la actualización fue exitosa
        } catch (err) {
            setError(err); // Captura y maneja el error
            return false; // Devuelve false para indicar que hubo un error en la actualización
        } finally {
            setLoading(false); // Finaliza el estado de carga, independientemente del resultado
        }
    };

    return { data, error, loading, updateAnything };
};

export default useUpdateAnything;
