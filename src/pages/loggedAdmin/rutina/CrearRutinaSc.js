import React, { useState } from 'react';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';
import SelectSingleUsuarioByName from '../../../components/ui/selectSingle/selectSingleUsuarioByName';
import DatePickerPrueba from '../../../components/datePicker/DatePickerPrueba';

const CrearRutinaSc = () => {
    const [formData, setFormData] = useState({
        usuario: "",
        fechaInicio: null,
        fechaFin: null,
        cantSemana: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsuarioChange = (id) => {
        setFormData({ ...formData, usuario: id });
    };

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fechaInicio, fechaFin, cantSemana } = formData;

        if (!fechaInicio || !fechaFin) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }

        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            alert("La fecha de inicio debe ser menor que la fecha de fin.");
            return;
        }

        if (cantSemana < 1) {
            alert("Mínimo debe haber una semana de trabajo.");
            return;
        }

        if (cantSemana > 5) {
            alert("El máximo permitido de semanas son cinco.");
            return;
        }

        const fechaInicioFinal = formData.fechaInicio.toISOString().split('T')[0];
        const fechaFinFinal = formData.fechaFin.toISOString().split('T')[0];

        const jsonData = {
            ...formData,
            fechaInicio: fechaInicioFinal,
            fechaFin: fechaFinFinal
        };

        // Envía los datos al backend para generar el PDF
        const response = await fetch('http://localhost:4000/servicioAPI/generarPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        // Crea un blob a partir de la respuesta
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prueba.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            <PrincipalMenu />
            <h1>Crear Rutina</h1>
            <h2>Crear Rutina</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Seleccione el usuario al que pertenece la rutina
                    <SelectSingleUsuarioByName onUsuarioChange={handleUsuarioChange} />
                </label>
                <label>
                    Seleccione la fecha de inicio de la Rutina
                    <DatePickerPrueba
                        selected={formData.fechaInicio}
                        onDateChange={(date) => handleDateChange('fechaInicio', date)}
                    />
                </label>
                <label>
                    Seleccione la fecha de finalizacion de la Rutina
                    <DatePickerPrueba
                        selected={formData.fechaFin}
                        onDateChange={(date) => handleDateChange('fechaFin', date)}
                    />
                </label>
                <label>
                    Seleccione la cantidad de semanas de la Rutina
                    <input
                        type="number"
                        name="cantSemana"
                        value={formData.cantSemana}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Generar Rutina</button>
            </form>
        </div>
    );
};

export default CrearRutinaSc;
