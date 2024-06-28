import React from 'react';
import PrincipalMenu from '../../components/menu/PrincipalMenu';
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import MenuHome from '../../components/menu/MenuHome';
import InformacionUserSc from '../../pages/loggedUser/InformacionUserSc';

const HomeSc = () => {
    return (
        <div>
            <Head/>
            <MenuHome/>
            <Foot />
        </div>
    );
};

export default HomeSc;

