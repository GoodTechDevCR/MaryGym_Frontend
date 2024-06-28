import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useConsultaUsuarioByCorreo from "../../hooks/usuarioHooks/useConsultaUsuarioByCorreo";
import useUpdateAnything from "../../hooks/useUpdateAnything";

function PasswordChangeSc() {
    const {updateAnything} = useUpdateAnything('http://25.7.30.30:4000/usuario/update');
    const { correo } = useParams();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();
    const dataUsuario = useConsultaUsuarioByCorreo(correo);
    const [formData, setFormData] = useState({
        idRegistro: null,
        nombreColumna: "Password",
        nuevoValor: null
    })
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!dataUsuario || dataUsuario.length === 0) {
            console.error('No se encontraron datos de usuario');
            return;
        }

        if (password1 !== password2) {
            alert('Las contraseñas no coinciden');
            window.location.reload();
        } else {

            const usuarioIdentificacion = dataUsuario[0].IdUsuario;
            const jsonData ={
                ...formData,
                idRegistro : usuarioIdentificacion,
                nuevoValor : password1
            }

            try {
                const success = await updateAnything(jsonData);
                if (success) {
                    alert("Contrasena modifica exitosamente");
                } else {
                    alert("Error al modificar la contrasena");
                }
            } catch (error) {
                console.error("Error al modificar la contrasena:", error);
                alert("Error al modificar la contrasena");
            }
        }
    };

    return (
        <div>
            <h1>Bienvenido, {correo}</h1>
            <p>Cambio de contraseña</p>

            <form onSubmit={handleSubmit}>
                <label>
                    Digite su nueva contraseña
                    <input
                        type="password"
                        name="contrasena1"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Revalide su nueva contraseña
                    <input
                        type="password"
                        name="contrasena2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </label>
                <br/>
                <button type="submit">Cambiar contraseña</button>
            </form>
        </div>
    );
}

export default PasswordChangeSc;
