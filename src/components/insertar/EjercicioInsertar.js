import React, { useState, useEffect } from 'react';
import SelectSingleCatEje from '../ui/selectSingle/SelectSingleCatEje';
import useCreateAnything from '../../hooks/useCreateAnything';
import TablaEjercicioPorCat from '../showData/TablaEjercicioPorCat';

const handleReload = () => {
    window.location.reload();
};

function EjercicioInsertar() {
    const { createAnything } = useCreateAnything('http://25.7.30.30:4000/ejercicio');
    const [formData, setFormData] = useState({
        nombreEjercicio: '',
        categoriaId: 0
    });
    const [showTabla, setShowTabla] = useState(false); // Estado para mostrar la tabla

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCatEjeChange = (id) => {
        setFormData({ ...formData, categoriaId: id });
        setShowTabla(true); // Mostrar la tabla al cambiar la categoría
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
                <label>
                    Seleccione la categoría del ejercicio:
                    <SelectSingleCatEje onCatEjeChange={handleCatEjeChange} />
                </label>
                <br />
                {showTabla && <TablaEjercicioPorCat key={formData.categoriaId} categoria={formData.categoriaId} />}
                <br />
                <label>
                    Ingrese el nombre del ejercicio:
                    <input
                        id="nombre-input"
                        type="text"
                        name="nombreEjercicio"
                        value={formData.nombreEjercicio}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="submit">Guardar Ejercicio</button>
            </form>
        </div>
    );
}

export default EjercicioInsertar;
