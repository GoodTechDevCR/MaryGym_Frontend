import React, { useState, useEffect } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';
import SelectSingleRelacion from '../ui/selectSingle/SelectSingleRelacion';
import UseConsultaByCorreo from '../../hooks/usuarioHooks/useConsultaUsuarioByCorreo';

function ContactoEmergenciaInsertar({ correo }) {
    const { createAnything } = useCreateAnything('http://localhost:4000/contactoEme');
    const IdUsuarioGuardar = UseConsultaByCorreo(correo);
    console.log("correo correo: ", correo);
    console.log("dato dato dato: ", IdUsuarioGuardar);
    // Estado inicial con los campos necesarios
    const [formData, setFormData] = useState({
        IdUsuario: '', 
        Nombre: '',
        NumeroTelefono: '',
        Relacion: '',
    });

    // Manejar el cambio de nombre
    const handleNombreChange = (event) => {
        setFormData({
            ...formData,
            Nombre: event.target.value,
        });
    };

    // Manejar el cambio de teléfono
    const handleTelefonoChange = (event) => {
        setFormData({
            ...formData,
            NumeroTelefono: event.target.value,
        });
    };

    // Manejar el cambio de relación
    const handleRelacionChange = (relacion) => {
        setFormData({
            ...formData,
            Relacion: relacion 
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("filter filter filter: ", IdUsuarioGuardar[0].IdUsuario)

        const jsonData = {
            ...formData,
            IdUsuario:IdUsuarioGuardar[0].IdUsuario
        };

        console.log(jsonData);
    };

    return (
        <div>
            <h2>Insertar contacto de emergencia</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre
                    <input 
                        type="text" 
                        value={formData.Nombre} 
                        onChange={handleNombreChange} 
                        placeholder="Ingrese el nombre" 
                    />
                </label>
                <br/>
                <label>
                    Teléfono
                    <input 
                        type="text" 
                        value={formData.NumeroTelefono} 
                        onChange={handleTelefonoChange} 
                        placeholder="Ingrese el teléfono" 
                    />
                </label>
                <br/>
                <label>
                    Relación
                    <SelectSingleRelacion onRelacionChange={handleRelacionChange} />
                </label>
                <br/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ContactoEmergenciaInsertar;
