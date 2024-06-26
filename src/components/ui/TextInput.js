import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {logIfDateIsBeforeJuly5th2024} from "../../utils/DateUtils";
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
