import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectSingleUsuario from "../ui/selectSingle/SelectSingleUsuario";
import UseConsultaPago from "../../hooks/pagoHooks/useConsultaPago";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function TablaPago() {
    const [selectedUser, setSelectedUser] = useState(null);
    const { data, loading, error } = UseConsultaPago(selectedUser);

    const handleUsuarioChange = (id) => {
        setSelectedUser(id);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <SelectSingleUsuario onUsuarioChange={handleUsuarioChange} />
            {data && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>IdPago</StyledTableCell>
                                <StyledTableCell>Nombre Usuario</StyledTableCell>
                                <StyledTableCell align="right">Fecha Pago</StyledTableCell>
                                <StyledTableCell align="right">Tipo Transaccion</StyledTableCell>
                                <StyledTableCell align="right">Monto</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.IdPago}>
                                    <StyledTableCell>{row.IdPago}</StyledTableCell>
                                    <StyledTableCell>{row.NombreUsuario}</StyledTableCell>
                                    <StyledTableCell align="right">{row.FechaPago}</StyledTableCell>
                                    <StyledTableCell align="right">{row.TipoTran}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Monto}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

export default TablaPago;
