import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function BotonPrincipalNavegacion({ texto, to }) {
    return (
        <Button variant="contained" component={Link} to={to}>{texto}</Button>
    )
}

export default BotonPrincipalNavegacion;
