import React, { useState } from 'react';
import useValidateLogin from '../../hooks/loginHooks/useValidateLogin';

function InsertarLogin() {
    const { loading, error, loggedIn, login } = useValidateLogin();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        try {
            const success = await login(username, password);

            if (success) {
                alert('¡Inicio de sesión exitoso!');
                // Aquí podrías redirigir al usuario a otra página o realizar otras acciones post-login
            } else {
                alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="centered-title">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default InsertarLogin;