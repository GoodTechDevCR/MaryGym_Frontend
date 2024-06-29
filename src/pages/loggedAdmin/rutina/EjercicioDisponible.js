import React, {useState} from 'react';
import CatEjeInsertar from '../../../components/insertar/CatEjeInsertar';
import EjercicioInsertar from '../../../components/insertar/EjercicioInsertar';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';
import TablaEjercicioPorCat from "../../../components/showData/TablaEjercicioPorCat";
import SelectSingleCatEje from "../../../components/ui/selectSingle/SelectSingleCatEje";



function EjercicioDisponible(){
    const [formData, setFormData] = useState({
        nombreEjercicio: '',
        categoriaId: 0
    });

    const handleCatEjeChange = (id) => {
        setFormData({ ...formData, categoriaId: id });

    };
    return(
        <div>
            <PrincipalMenu/>
            EjercicioDisponibles
            <br/>
            <br/>
            Seleccione la categoría del ejercicio:
            <SelectSingleCatEje onCatEjeChange={handleCatEjeChange}/>
            <br/>
            <TablaEjercicioPorCat key={formData.categoriaId} categoria={formData.categoriaId}/>
            <br/>
            <CatEjeInsertar/>

            <br/>

            <EjercicioInsertar/>
        </div>
    )
}

export default EjercicioDisponible;
