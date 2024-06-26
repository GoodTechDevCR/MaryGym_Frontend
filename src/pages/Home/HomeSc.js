import React from 'react';
import PrincipalMenu from '../../components/menu/PrincipalMenu';
import MenuHome from '../../components/menu/MenuHome';
import ResponsiveFooter from "../../components/responsiveFooter/ResponsiveFooter";


const HomeSc = () => {
    return (
        <div>
            <PrincipalMenu/>
            <MenuHome/>
            <ResponsiveFooter/>
        </div>
    );
};

export default HomeSc;

