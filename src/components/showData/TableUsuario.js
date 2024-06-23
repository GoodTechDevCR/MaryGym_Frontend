// TableUsuario.js
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TableUsuario({ usuarios }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID Usuario</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Nombre de Usuario</TableCell>
                        <TableCell align="right">Teléfono</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell align="right">Saldo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Fecha de Nacimiento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow key={usuario.idusuario}>
                            <TableCell component="th" scope="row">
                                {usuario.idusuario}
                            </TableCell>
                            <TableCell>{usuario.nombre}</TableCell>
                            <TableCell>{usuario.apellido}</TableCell>
                            <TableCell>{usuario.nombreusuario}</TableCell>
                            <TableCell align="right">{usuario.telefono}</TableCell>
                            <TableCell>{usuario.correo}</TableCell>
                            <TableCell align="right">{usuario.saldo}</TableCell>
                            <TableCell>{usuario.estado}</TableCell>
                            <TableCell>{new Date(usuario.fechanacimiento).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUsuario;
