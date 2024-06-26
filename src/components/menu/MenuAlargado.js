import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LinkTab(props) {
    return (
        <Tab
            component={Link}
            to={props.to}
            label={props.label}
            value={props.value}
        />
    );
}

LinkTab.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

function MenuAlargado() {
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        const currentTab = getCurrentTab(location.pathname);
        setValue(currentTab);
    }, [location]);

    const getCurrentTab = (pathname) => {
        switch (pathname) {
            case '/admin/usuario/registrar':
                return 0;
            case '/admin/usuario/modificar':
                return 1;
            case '/admin/usuario/visualizar':
                return 2;
            case '/admin/pago/registrar':
                return 3;
            case '/admin/pago/modificar':
                return 4;
            case '/admin/pago/visualizar':
                return 5;
            case '/admin/crearRutina':
                return 6;
            default:
                return 0;
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="nav tabs example"
                role="navigation"
            >
                <LinkTab to="/admin/usuario/registrar" label="Registrar Usuarios" value={0} />
                <LinkTab to="/admin/usuario/modificar" label="Modificar Usuarios" value={1} />
                <LinkTab to="/admin/usuario/visualizar" label="Visualizar Usuarios" value={2} />
                <LinkTab to="/admin/pago/registrar" label="Visualizar Usuarios" value={3} />
                <LinkTab to="/admin/pago/modificar" label="Visualizar Usuarios" value={4} />
                <LinkTab to="/admin/pago/visualizar" label="Visualizar Usuarios" value={5} />
                <LinkTab to="/admin/crearRutina" label="Visualizar Usuarios" value={6} />
            </Tabs>
        </Box>
    );
}

export default MenuAlargado;
