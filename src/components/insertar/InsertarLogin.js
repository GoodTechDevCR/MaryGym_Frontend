import React, { useState, useEffect } from 'react';
import useValidateLogin from '../../hooks/loginHooks/useValidateLogin';
import { useNavigate } from 'react-router-dom';

function InsertarLogin() {
    const navigate = useNavigate();
    const { loading, error, loggedIn, login } = useValidateLogin();
    const [formData, setFormData] = useState({
        usuario: '',
        contrasena: ''
    });
    const [usuarioLog, setUsuarioLog] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (formData.usuario) {
            fetch(`http://25.7.30.30:4000/usuario/getUserCorreo/${formData.usuario}`)
                .then(response => response.json())
                .then(data => {
                    console.log("usuarios fetched:", data);
                    setUsuarioLog(data);
                })
                .catch(error => console.error('Error fetching metodos de pago:', error));
        }
    }, [formData.usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { success, message } = await login(formData.usuario, formData.contrasena);

            if (success) {
                alert('Ingreso Exitoso');
                const idUsuarioLog = usuarioLog[0].IdUsuario;

                //cambiar al id del usuario de maria
                if(idUsuarioLog===64){
                    navigate('/admin');
                }
                else{
                    navigate('/usuario');
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
