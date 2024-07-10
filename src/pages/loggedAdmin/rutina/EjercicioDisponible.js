import React, {useState} from 'react';
import CatEjeInsertar from '../../../components/insertar/CatEjeInsertar';
import EjercicioInsertar from '../../../components/insertar/EjercicioInsertar';
import TablaEjercicioPorCat from "../../../components/showData/TablaEjercicioPorCat";
import SelectSingleCatEje from "../../../components/ui/selectSingle/SelectSingleCatEje";
import HeadAdmin from '../../../components/Header/HeadAdmin';
import Foot from '../../../components/Footer/Foot';


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
            <HeadAdmin/>
            <div className='centered-title'>
                <h1 className='black'> Ejercicios </h1>
                <div className='elemento2'> Seleccione la categoría del ejercicio: </div>
                <div className='elemento2'> <SelectSingleCatEje onCatEjeChange={handleCatEjeChange}/></div>
                <div className='elemento2'> 
                    <TablaEjercicioPorCat key={formData.categoriaId} categoria={formData.categoriaId}/>
                </div>
                <CatEjeInsertar/>
                <EjercicioInsertar/>
                <br/><br/><br/>
            </div>
            <Foot/>
        </div>
    )
}

export default EjercicioDisponible;
