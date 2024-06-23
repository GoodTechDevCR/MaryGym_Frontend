import React, { useState } from 'react';
import DatePickerPrueba from "../components/datePicker/DatePickerPrueba";
import { logIfDateIsBeforeJuly5th2024 } from "../utils/DateUtils";

const ShowDatePicker = () => {
    const [message, setMessage] = useState('');

    const handleDateChange = (date) => {
        console.log("Fecha seleccionada:", date);
        logIfDateIsBeforeJuly5th2024(date);
        setMessage(date < new Date('2024-07-05') ? 'La fecha seleccionada es antes del 5 de julio de 2024.' : 'La fecha seleccionada es después del 5 de julio de 2024.');
    };


    return (
        <div>
            <h1>Show Date Picker</h1>
            <DatePickerPrueba onDateChange={handleDateChange} />

            {message && <p>{message}</p>}
        </div>
    );
};

export default ShowDatePicker;
