import React, { useState } from 'react';
import PaisesTelefono from '../ui/PaisesTelefono';
import useCreateAnything from '../../hooks/useCreateAnything';
import DatePickerPrueba from "../datePicker/DatePickerPrueba";

import Box from '@mui/material/Box';
import ContactoEmergenciaInsertar from './ContactoEmergenciaInsertar';

function UsuarioInsertar() {
    const { createAnything } = useCreateAnything('http://25.7.30.30:4000/usuario');
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Password: '123',
        Telefono: '',
        Correo: '',
        Estado: 'activo',
        Pais: '',
        CodigoPais: '',
        FechaNacimiento: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (event, value) => {
        setFormData({
            ...formData,
            Pais: value ? value.label : '',
            CodigoPais: value ? value.phone : ''
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, FechaNacimiento: date });
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const telefonoCompleto = `${formData.CodigoPais}${formData.Telefono}`;
        const estadoNumerico = formData.Estado === 'activo' ? 1 : 0;
        const fechaNacimientoFinal = formData.FechaNacimiento.toISOString().split('T')[0];

        const jsonData = {
            ...formData,
            Telefono: telefonoCompleto,
            Estado: estadoNumerico,
            FechaNacimiento: fechaNacimientoFinal
        };
        delete jsonData.CodigoPais;
        delete jsonData.Pais;
        console.log("JSON: ", jsonData);
        try {
            const success = await createAnything(jsonData);
            if (success) {
                alert("Usuario Creado Exitosamente");
                setStep(2);
            } else {
                alert("Error al crear el Usuario:", error);
            }
        } catch (error) {
            console.error("Error al crear el Usuario:", error);
            alert("Error al crear el Usuario");
        }
    };


    return (
        <div className='centered-title'>
            <h1 className='black'>Registro de usuarios</h1>  
            {step === 1 && (
                <form onSubmit={handleSubmit} className='centered-title2'>
                    <label className = 'elemento2' >
                        <input type="text" placeholder="Nombre" name="Nombre" value={formData.Nombre} onChange={handleInputChange}/>
                    </label>
                    <label className = 'elemento2' >
                        <input type="text" placeholder="Apellido" name="Apellido" value={formData.Apellido} onChange={handleInputChange} />
                    </label>
                    <label className = 'elemento2' >
                        <input type="email" placeholder="Correo" name="Correo" value={formData.Correo} onChange={handleInputChange} />
                    </label>
                    <Box  className= "elemento2">
                        <PaisesTelefono onCountryChange={handleCountryChange}/>
                    </Box>
                    <label className = 'elemento2'>
                        <input type="text" placeholder="Teléfono" name="Telefono" value={formData.Telefono} onChange={handleInputChange} />
                    </label>
                    <label className = 'elemento2'>
                        <div className='body2'> Estado: </div>
                        <select name="Estado" value={formData.Estado} onChange={handleInputChange}>
                            <option value="activo">Activo</option>
                            <option value="noActivo">No Activo</option>
                        </select>
                    </label>
                    <Box className = 'elemento2'>
                        <div className='body2'> Fecha de nacimiento: </div>
                        <DatePickerPrueba onDateChange={handleDateChange} />
                    </Box>
                    <div className = 'elemento2'>
                        <button type="submit" className='black-button' >Enviar</button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <div className='centered-title2'>
                    <ContactoEmergenciaInsertar correo={formData.Correo} />
                </div>
            )}

        </div>
    );
}

export default UsuarioInsertar;
