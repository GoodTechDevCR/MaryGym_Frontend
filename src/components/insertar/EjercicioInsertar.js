import React, { useState } from 'react';
import SelectSingleCatEje from '../ui/selectSingle/SelectSingleCatEje';
import useCreateAnything from '../../hooks/useCreateAnything';

const handleReload = () => {
    window.location.reload();
};

function EjercicioInsertar(){
    const {createAnything} = useCreateAnything('http://25.7.30.30:4000/ejercicio');
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
        console.log(formData);
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
            insertar ejercicio
            <form onSubmit={handleSubmit}> 
                Seleccione la categoria del ejercicio
                <SelectSingleCatEje onCatEjeChange={handleCatEjeChange} />
                <label>
                    Ingrese el nombre del ejercicio
                    <input 
                        id="nombre-input"
                        type="text"
                        name="nombreEjercicio"
                        value={formData.nombreEjercicio}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Guardar Ejercicio</button>
            </form>
        </div>
    );
}

export default EjercicioInsertar;
