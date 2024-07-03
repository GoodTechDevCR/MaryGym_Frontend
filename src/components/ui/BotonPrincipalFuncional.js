import React from 'react';
import Button from '@mui/material/Button';

function BotonPrincipalFuncional({ texto, onClick }) {
    return (
            <Button variant="contained" onClick={onClick}>{texto}</Button>
    )
}

export default BotonPrincipalFuncional;
