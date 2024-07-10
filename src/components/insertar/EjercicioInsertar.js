import React, { useState, useEffect } from 'react';
import SelectSingleCatEje from '../ui/selectSingle/SelectSingleCatEje';
import useCreateAnything from '../../hooks/useCreateAnything';
import TablaEjercicioPorCat from '../showData/TablaEjercicioPorCat';

const handleReload = () => {
    window.location.reload();
};

function EjercicioInsertar() {
    const { createAnything } = useCreateAnything('https://marygymbackend-production.up.railway.app/ejercicio');
    const [formData, setFormData] = useState({
        nombreEjercicio: '',
        categoriaId: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCatEjeChange = (id) => {
        setFormData({ ...formData, categoriaId: id });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonData = {
            ...formData
        };

        try {
            const success = await createAnything(jsonData);
            if (success) {
                alert("Ejercicio Creado Exitosamente");
                handleReload();
            } else {
                alert("Error al crear el ejercicio");
            }
        } catch (error) {
            console.error("Error al crear el Ejercicio:", error);
            alert("Error al crear el Ejercicio");
        }
    };

    return (
        <div>
            <h2>Insertar Ejercicio</h2>
            <form onSubmit={handleSubmit}>
                <label className='elemento2'> Seleccione la categoría del ejercicio: </label>
                <label className='elemento2'> <SelectSingleCatEje onCatEjeChange={handleCatEjeChange} /> </label>
                <label className='elemento2'>
                    Ingrese el nombre del ejercicio:
                    <input
                        id="nombre-input"
                        type="text"
                        name="nombreEjercicio"
                        value={formData.nombreEjercicio}
                        onChange={handleInputChange}
                    />
                </label>
                <label className='elemento2'> 
                    <button type="submit" className='black-button'>Guardar Ejercicio</button>
                </label>
            </form>
        </div>
    );
}

export default EjercicioInsertar;
