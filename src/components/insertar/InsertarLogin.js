// InsertarLogin.jsx
import React, { useState, useEffect, useContext } from 'react';
import useValidateLogin from '../../hooks/loginHooks/useValidateLogin';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import './InsertarLogin.css';

function InsertarLogin() {
    const navigate = useNavigate();
    const { loading, error, login } = useValidateLogin();
    const { setUserContext } = useContext(UserContext);
    const [formData, setFormData] = useState({ usuario: '', contrasena: '' });
    const [usuarioLog, setUsuarioLog] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formData.usuario) {
            fetch(`https://marygymbackend-production.up.railway.app/usuario/getUserCorreo/${formData.usuario}`)
                .then(response => response.json())
                .then(data => {
                    console.log("usuarios fetched:", data);
                    setUsuarioLog(data);
                })
                .catch(error => console.error('Error fetching usuarios:', error));
        }
    }, [formData.usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { success, message } = await login(formData.usuario, formData.contrasena);

            if (success) {
                alert('Ingreso Exitoso');
                if (usuarioLog.length > 0) {
                    const idUsuarioLog = usuarioLog[0].IdUsuario;
                    setUserContext({ id: idUsuarioLog, username: formData.usuario });

                    // Redirect based on user type
                    if (idUsuarioLog === 124) {
                        navigate('/admin');
                    } else {
                        navigate(`/usuario/${idUsuarioLog}`);
                    }
                } else {
                    alert('No se encontró el usuario.');
                }
            } else {
                alert(`Error al ingresar al sistema: ${message}`);
            }
        } catch (error) {
            console.error('Error al ingresar al sistema:', error);
            alert('Error al ingresar al sistema');
        }
    };

    return (
        <div className='login-container'>
            <h2 className='login-title'>Iniciar Sesión</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label className='login-label'>
                    Usuario:
                    <input
                        className='login-input'
                        type="text"
                        name="usuario"
                        value={formData.usuario}
                        onChange={handleInputChange}
                        placeholder='Ingresa tu usuario'
                    />
                </label>
                <label className='login-label'>
                    Contraseña:
                    <input
                        className='login-input'
                        type="password"
                        name="contrasena"
                        value={formData.contrasena}
                        onChange={handleInputChange}
                        placeholder='Ingresa tu contraseña'
                    />
                </label>
                <button
                    className='login-button'
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
                {error && <p className='login-error'>{error}</p>}
            </form>
        </div>
    );
}

export default InsertarLogin;
