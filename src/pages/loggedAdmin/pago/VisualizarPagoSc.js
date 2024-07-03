import React from 'react';
import TablaPago from "../../../components/showData/TablaPago";
import Foot from "../../../components/Footer/Foot";
import HeadAdmin from "../../../components/Header/HeadAdmin";

const VisualizarPagoSc = () => {
    return (
        <div>
            <HeadAdmin/>
            <div className='centered-title2'> 
                <h1 className='black'> Visualizar Pagos </h1>
            </div>
            <TablaPago/>
            <br/><br/><br/><br/>
            <Foot/>
        </div>
    );
};

export default VisualizarPagoSc;