import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import TablaContactoEmergencia from '../../../components/showData/TableContactoEmergencia';
import SelectSingleRelacion from '../../../components/ui/selectSingle/SelectSingleRelacion';
import useCreateAnything from '../../../hooks/useCreateAnything';

function VisualizarContactoEmergencia() {
    const { createAnything } = useCreateAnything('http://localhost:4000/contactoEme/unico');
    const { id } = useParams();
    // Estado inicial con los campos necesarios
    const [formData, setFormData] = useState({
        IdUsuario: id, 
        Nombre: '',
        NumeroTelefono: '',
        Relacion: '',
    });

    // Manejar el cambio de nombre
    const handleNombreChange = (event) => {
        setFormData({
            ...formData,
            Nombre: event.target.value,
        });
    };

    // Manejar el cambio de teléfono
    const handleTelefonoChange = (event) => {
        setFormData({
            ...formData,
            NumeroTelefono: event.target.value,
        });
    };

    // Manejar el cambio de relación
    const handleRelacionChange = (relacion) => {
        setFormData({
            ...formData,
            Relacion: relacion 
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("form data form data: ",formData);

        try {
            const success = await createAnything(formData);
            if (success) {
                alert("Contacto emergencia Creado Exitosamente");
                window.location.reload();
            } else {
                alert("Error al crear el contacto emergencia");
            }
        } catch (error) {
            console.error("Error al crear el contacto emergenciao:", error);
            alert("Error al crear el contacto emergencia");
        }
    };

    return (
        <div>
            <h2>Contacto Emergencia</h2>
            <p>ID: {id}</p>
            <TablaContactoEmergencia id = {id}/>

            <br/>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre
                    <input 
                        type="text" 
                        value={formData.Nombre} 
                        onChange={handleNombreChange} 
                        placeholder="Ingrese el nombre" 
                    />
                </label>
                <br/>
                <label>
                    Teléfono
                    <input 
                        type="text" 
                        value={formData.NumeroTelefono} 
                        onChange={handleTelefonoChange} 
                        placeholder="Ingrese el teléfono" 
                    />
                </label>
                <br/>
                <label>
                    Relación
                    <SelectSingleRelacion onRelacionChange={handleRelacionChange} />
                </label>
                <br/>
                <button type="submit">Guardar contacto emergencia</button>
            </form>
        </div>
    );
}

export default VisualizarContactoEmergencia;
