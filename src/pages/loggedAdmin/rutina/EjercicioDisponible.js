import React from 'react';
import CatEjeInsertar from '../../../components/insertar/CatEjeInsertar';
import EjercicioInsertar from '../../../components/insertar/EjercicioInsertar';
import PrincipalMenu from '../../../components/menu/PrincipalMenu';

function EjercicioDisponible(){
    return(
        <div>
            <PrincipalMenu/>
            EjercicioDisponibles
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
