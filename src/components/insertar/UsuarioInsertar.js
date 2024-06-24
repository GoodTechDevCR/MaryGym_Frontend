import React, { useState } from 'react';
import PaisesTelefono from '../ui/PaisesTelefono';
import useCreateAnything from '../../hooks/useCreateAnything';
import DatePickerPrueba from "../datePicker/DatePickerPrueba";
import {isDateBefore1900} from "../../utils/DateUtils"

function UsuarioInsertar() {
    const { data, error, loading, createAnything } = useCreateAnything('http://localhost:4000/usuario');

    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Password: '123',
        Telefono: '',
        Correo: '',
        Saldo: 0,
        Estado: 'activo',
        Pais: '',
        CodigoPais: '',
        FechaNacimiento: null
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

    const handleSubmit = (e) => {
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
        createAnything(jsonData);
    };

    return (
        <div>
            <h2>Prueba de insertar usuario:</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" name="Nombre" value={formData.Nombre} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Apellido:
                    <input type="text" name="Apellido" value={formData.Apellido} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Correo:
                    <input type="email" name="Correo" value={formData.Correo} onChange={handleInputChange}/>
                </label>
                <br/>
                <PaisesTelefono onCountryChange={handleCountryChange}/>
                <label>
                    Número de Teléfono:
                    <input type="text" name="Telefono" value={formData.Telefono} onChange={handleInputChange}/>
                </label>
                <br/>
                <label>
                    Estado:
                    <select name="Estado" value={formData.Estado} onChange={handleInputChange}>
                        <option value="activo">Activo</option>
                        <option value="noActivo">No Activo</option>
                    </select>
                </label>
                <br/>
                <label>
                    Fecha de nacimiento:
                    <DatePickerPrueba onDateChange={handleDateChange}/>
                </label>
                <button type="submit" disabled={loading}>Enviar</button>
            </form>
        </div>
    );
}

export default UsuarioInsertar;
