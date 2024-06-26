import React from 'react';
import PrincipalMenu from '../../components/menu/PrincipalMenu';
import MenuHome from '../../components/menu/MenuHome';
import ResponsiveFooter from "../../components/responsiveFooter/ResponsiveFooter";
import HomeScreen from '../../pages/Home/HomeScreen';

const HomeSc = () => {
    return (
        <div>
            <PrincipalMenu/>
            <HomeScreen/>
            
            <ResponsiveFooter/>
        </div>
    );
};

export default HomeSc;

