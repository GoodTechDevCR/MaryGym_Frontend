import { useState } from 'react';

const useValidateLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://25.7.30.30:4000/login/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data); // Logging response data for verification

            // Handle successful login
            setLoggedIn(true);
            return true;
        } catch (error) {
            setError(error.message);
            setLoggedIn(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loggedIn, login };
};

export default useValidateLogin;
