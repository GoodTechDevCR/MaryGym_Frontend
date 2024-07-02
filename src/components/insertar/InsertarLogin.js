import React, { useState } from 'react';
import useValidateLogin from '../../hooks/loginHooks/useValidateLogin';

function InsertarLogin() {
    const { loading, error, loggedIn, login } = useValidateLogin();
    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { success, message } = await login(formData.usuario, formData.contrasena);

            if (success) {
                alert('Ingreso Exitoso');
            } else {
                alert(`Error al ingresar al sistema: ${message}`);
            }
        } catch (error) {
            console.error('Error al ingresar al sistema:', error);
            alert('Error al ingresar al sistema');
        }
    };

    return (
        <div className='centered-title'>
            <h2>Iniciar Sesion</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input type="text" name="usuario" value={formData.usuario} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input type="password" name="contrasena" value={formData.contrasena} onChange={handleInputChange} />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default InsertarLogin;
