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

    // Estado para almacenar todos los contactos de emergencia
    const [contactos, setContactos] = useState([]);

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

    // Agregar un nuevo contacto a la lista
    const handleAddContact = () => {
        if (formData.Nombre && formData.NumeroTelefono && formData.Relacion) {
            setContactos([
                ...contactos,
                { ...formData, IdUsuario: IdUsuarioGuardar[0].IdUsuario }
            ]);
            // Limpiar los campos del formulario
            setFormData({
                IdUsuario: IdUsuarioGuardar[0].IdUsuario,
                Nombre: '',
                NumeroTelefono: '',
                Relacion: '',
            });
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const success = await createAnything(contactos);
            if (success) {
                alert("Contactos Creados Exitosamente");
                window.location.reload();
            } else {
                alert("Error al crear el Usuario");
            }
        } catch (error) {
            console.error("Error al crear el Usuario:", error);
            alert("Error al crear el Usuario");
        }
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
                <button type="button" onClick={handleAddContact}>Agregar Contacto</button>
                <button type="submit">Enviar</button>
            </form>

            <div>
                <h3>Contactos de Emergencia</h3>
                <ul>
                    {contactos.map((contacto, index) => (
                        <li key={index}>
                            {contacto.Nombre} - {contacto.NumeroTelefono} - {contacto.Relacion}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ContactoEmergenciaInsertar;
