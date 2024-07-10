import React, { useState, useEffect } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';
import SelectSingleRelacion from '../ui/selectSingle/SelectSingleRelacion';
import UseConsultaByCorreo from '../../hooks/usuarioHooks/useConsultaUsuarioByCorreo';
import { useNavigate } from 'react-router-dom';


function ContactoEmergenciaInsertar({ correo }) {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/contactoEme');
    const IdUsuarioGuardar = UseConsultaByCorreo(correo);
    const navigate = useNavigate();

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
                navigate(`/admin/usuario/visualizar`);
            } else {
                alert("Error al crear el Usuario");
            }
        } catch (error) {
            console.error("Error al crear el Usuario:", error);
            alert("Error al crear el Usuario");
        }
    };

    const handleSalir = async(event) => {
        event.preventDefault();

        navigate(`/admin/usuario/visualizar`);
    }

    return (
        <div className='centerd title'>
            <h2>Insertar contacto de emergencia</h2>
            <p>
                Para agregar los contactos de emergencia se debe de ir llenar los datos y oprimir el boton "agregar",
                una vez digitados todos los contactos se debe digitar el boton "enviar", en caso de NO querer agregar contactos
                digitar el boton "Salir"
            </p>
            <form onSubmit={handleSubmit}>
                <label className='elemento2'>
                    <input 
                        type="text" 
                        value={formData.Nombre} 
                        onChange={handleNombreChange} 
                        placeholder="Nombre Contacto" 
                    />
                </label>
                <label className='elemento2'>
                    <input 
                        type="text" 
                        value={formData.NumeroTelefono} 
                        onChange={handleTelefonoChange} 
                        placeholder="Teléfono" 
                    />
                </label>
                <label className='elemento2'>
                    <SelectSingleRelacion onRelacionChange={handleRelacionChange} />
                </label>
                <div className='elemento2'>
                    <button type="button" className='black-button' onClick={handleAddContact}>Agregar Contacto</button>
                </div>
                <div className='elemento2'>
                    <button type="submit" className='black-button'>Enviar</button>
                </div>
                <div className='elemento2'>
                    <button type="button" className='black-button' onClick={handleSalir}>Salir</button>
                </div>
                </form>

            <div className='centered-title'>
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
