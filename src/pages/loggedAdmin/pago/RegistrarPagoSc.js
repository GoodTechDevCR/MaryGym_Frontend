import React from 'react';
import Foot from "../../../components/Footer/Foot";
import HeadAdmin from "../../../components/Header/HeadAdmin";
import TextInputs from '../../../components/ui/TextInput';
import Box from '@mui/material/Box';
import BotonPrincipalFuncional from  '../../../components/ui/BotonPrincipalFuncional';
import PrincipalMenu from "../../../components/menu/PrincipalMenu";
import PagoInsertar from "../../../components/insertar/PagoInsertar";

const RegistrarPagoSc = () => {
    const [newData, setNewData] = "";
    return (
        <div>
            <HeadAdmin/>
            <PagoInsertar/>
            <Foot/>
            
        </div>
    );
};

export default RegistrarPagoSc;