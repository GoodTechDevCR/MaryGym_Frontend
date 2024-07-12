// PasswordChangeSc.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useConsultaUsuarioByCorreo from "../../hooks/usuarioHooks/useConsultaUsuarioByCorreo";
import useUpdateAnything from "../../hooks/useUpdateAnything";
import './PasswordChangeSc.css'; // Importa el archivo de estilos
import { useNavigate } from 'react-router-dom';

function PasswordChangeSc() {
    const { updateAnything } = useUpdateAnything('https://marygymbackend-production.up.railway.app/usuario/update');
    const { correo } = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const dataUsuario = useConsultaUsuarioByCorreo(correo);
    const [formData] = useState({
        idRegistro: null,
        nombreColumna: "Password",
        nuevoValor: null
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!dataUsuario || dataUsuario.length === 0) {
            console.error('No se encontraron datos de usuario');
            return;
        }

        if (password1 !== password2) {
            alert('Las contraseñas no coinciden');
            return;
        } else if (password1.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const usuarioIdentificacion = dataUsuario[0].IdUsuario;
        const jsonData = {
            ...formData,
            idRegistro: usuarioIdentificacion,
            nuevoValor: password1
        };

        try {
            const success = await updateAnything(jsonData);
            if (success) {
                alert("Contraseña modificada exitosamente");
                navigate('/');
            } else {
                alert("Error al modificar la contraseña");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error al modificar la contraseña:", error);
            alert("Error al modificar la contraseña");
        }
    };

    return (
        <div className='password-change-container'>
            <h1 className='password-change-title'>Cambio de Contraseña</h1>
            <p className='password-change-subtitle'>Bienvenido, {correo}</p>
            <form className='password-change-form' onSubmit={handleSubmit}>
                <label className='password-change-label'>
                    Nueva Contraseña
                    <input
                        className='password-change-input'
                        type="password"
                        name="contrasena1"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder='Digite su nueva contraseña'
                    />
                </label>
                <label className='password-change-label'>
                    Revalidar Contraseña
                    <input
                        className='password-change-input'
                        type="password"
                        name="contrasena2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder='Revalide su nueva contraseña'
                    />
                </label>
                <button
                    className='password-change-button'
                    type="submit"
                >
                    Cambiar Contraseña
                </button>
            </form>
        </div>
    );
}

export default PasswordChangeSc;
