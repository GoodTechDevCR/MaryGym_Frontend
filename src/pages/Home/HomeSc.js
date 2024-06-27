import React from 'react';
import PrincipalMenu from '../../components/menu/PrincipalMenu';
import Head from "../../components/Header/Head";
import Foot from "../../components/Footer/Foot";
import HomeScreen from './HomeScreen';
import MenuHome from '../../components/menu/MenuHome';

const HomeSc = () => {
    return (
        <div>
            <Head/>
            <PrincipalMenu/>
            <MenuHome/>
            <Foot />
        </div>
    );
};

export default HomeSc;

