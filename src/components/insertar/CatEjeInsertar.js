import React, { useState } from 'react';
import useCreateAnything from '../../hooks/useCreateAnything';

function CatEjeInsertar(){
    const { createAnything } = useCreateAnything('http://25.7.30.30:4000/catEje');

    const [formData, setFormData] = useState({
        NombreCatEje: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleReload = () => {
        window.location.reload();
    };

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
                handleReload();
            } else {
                alert("Error al crear la Categoria Ejercicio");
            }
        } catch (error) {
            console.error("Error al crear la Categoria Ejercicio:", error);
            alert("Error al crear la Categoria Ejercicio");
        }
    }

    return (
        <div className='centered-title'>
            <h2 className='black'> Insertar categoría ejercicio </h2>
            <form onSubmit={handleSubmit}>
                <label className='elemento2'> Ingrese el nombre de la categoría ejercicio </label>
                <label className='elemento2'> <input type="text" name="NombreCatEje" value={formData.NombreCatEje} onChange={handleInputChange} /> </label>
                <button type="submit" className='black-button'>Guardar Categoría Ejercicio</button>
            </form>
        </div>
    )
}

export default CatEjeInsertar;