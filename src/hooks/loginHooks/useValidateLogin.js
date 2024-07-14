import { useState } from 'react';

const useValidateLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async (usuario, contrasena) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://marygymbackend-production.up.railway.app/login/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, contrasena }),
            });


            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Handle successful login
            setLoggedIn(true);
            return { success: true, message: data.message };
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            setError(error.message);
            setLoggedIn(false);
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loggedIn, login };
};

export default useValidateLogin;
