import React, { useState } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';

function CatEjeInsertar(){
    const { createAnything } = useCreateAnything('http://localhost:4000/catEje');

    const [formData, setFormData] = useState({
        NombreCatEje: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonData = {
            ...formData
        }

        console.log(jsonData);

        try {
            const success = await createAnything(jsonData);
            if (success) {
                alert("Categoria Ejercicio Creado Exitosamente");
            } else {
                alert("Error al crear la Categoria Ejercicio");
            }
        } catch (error) {
            console.error("Error al crear la Categoria Ejercicio:", error);
            alert("Error al crear la Categoria Ejercicio");
        }
    }

    return (
        <div>
            Insertar categoria ejercicio
            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Ingrese el nombre de la categoria ejercicio
                    <input type="text" name="NombreCatEje" value={formData.NombreCatEje} onChange={handleInputChange} />
                </label>
                <button type="submit">Guardar Categoria Ejercicio</button>
            </form>
        </div>
    )
}

export default CatEjeInsertar;