import React from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DatePickerPrueba from "../datePicker/DatePickerPrueba";

const TextInputs = ({ selectedOption, newData, setNewData }) => {

    const handleDateChange = (date) => {
        console.log("Fecha seleccionada:", date);
        setNewData(date); // Asegúrate que date tenga el formato correcto que esperas
    };
    const handleChange = (e) => {
        setNewData(e.target.value);
    };



    // Verifica si selectedOption es null o undefined antes de acceder a sus propiedades
    if (!selectedOption) {
        return null; // O maneja este caso según tu lógica
    }

    return (
        <div>
            {selectedOption.type === 'date' && (
                <DatePickerPrueba onDateChange={handleDateChange} />
            )}

            {selectedOption.type === 'bit' && (
                <Select
                    value={newData}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                >
                    <MenuItem value={0}>Inactivo</MenuItem>
                    <MenuItem value={1}>Activo</MenuItem>
                </Select>
            )}
            
            {selectedOption.type === 'bitTC' && (
                <Select
                    value={newData}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                >
                    <MenuItem value={0}>TC NO Aceptados</MenuItem>
                    <MenuItem value={1}>TC Aceptados</MenuItem>
                </Select>
            )}

            {selectedOption.type === 'tipoTran' && (
                <Select
                    value={newData}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                >
                    <MenuItem value={11}>Abono</MenuItem>
                    <MenuItem value={12}>Membresía Mensual</MenuItem>
                    <MenuItem value={13}>Membresía Semanal</MenuItem>
                    <MenuItem value={14}>Membresía un día</MenuItem>
                    <MenuItem value={15}>Precio Especial</MenuItem>
                </Select>
            )}

            {(selectedOption.type === 'text' || selectedOption.type === 'number') && (
                <TextField
                    label={selectedOption.label}
                    type={selectedOption.type}
                    value={newData}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                />
            )}
        </div>
    );
};

export default TextInputs;