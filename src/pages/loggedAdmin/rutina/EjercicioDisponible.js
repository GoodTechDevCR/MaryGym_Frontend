import React from 'react';
import CatEjeInsertar from '../../../components/insertar/CatEjeInsertar';
import EjercicioInsertar from '../../../components/insertar/EjercicioInsertar';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';
import TablaEjercicioPorCat from "../../../components/showData/TablaEjercicioPorCat";

function EjercicioDisponible(){
    return(
        <div>
            <PrincipalMenu/>
            EjercicioDisponibles
            <TablaEjercicioPorCat key={0} categoria={0} />
            <br/>
            <br/>

            <CatEjeInsertar/>

            <br/>
            <br/>
            <EjercicioInsertar/>
        </div>
    )
}

export default EjercicioDisponible;
