import React from 'react';
import Foot from "../../components/Footer/Foot";
import HeadAdmin from "../../components/Header/HeadAdmin";

import Card from "../../components/ui/Card";

import PrincipalMenu from '../../components/menu/PrincipalMenu';


const LandAdminSc = () => {
    return (
        <div >
            <HeadAdmin/>
            <Card />            
            <Foot />
        </div>
    );
};

export default LandAdminSc;
