import React, { useState } from 'react';
import useValidateLogin from '../../hooks/loginHooks/useValidateLogin';


function InsertarLogin() {
    const { validateLogin } = useValidateLogin('http://25.7.30.30:4000/login');

    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleReload = () => {
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await validateLogin(formData);
            console.log(success);
            if (success) {
                alert("Ingreso Exitoso");
            } else {
                alert("Error al ingresar al sistema");
            }
        } catch (error) {
            console.error("Error al ingresar al sistema:", error);
            alert("Error al ingresar al sistema");
        }

    };

    return (
        <div className='centered-title'>
            <h2>Iniciar Sesion</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="Username" value={formData.Username} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Contrasena:
                    <input type="text" name="Password" value={formData.Password} onChange={handleInputChange} />
                </label>

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default InsertarLogin;