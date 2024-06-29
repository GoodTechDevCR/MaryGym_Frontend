import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ConsultaEjercicioByCat from "../../hooks/ejercicioHooks/useConsultaEjercicioByCat";

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

function TablaEjercicioPorCat({ categoria }) {
    // Ensure categoria is a number, defaulting to 0 if not provided
    const catId = categoria || 0;

    // Call ConsultaEjercicioByCat with catId
    const data = ConsultaEjercicioByCat(catId) || [];

    // Function to render the table
    const renderTable = () => (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>IdEjercicio</StyledTableCell>
                        <StyledTableCell>Nombre</StyledTableCell>
                        <StyledTableCell>CategoriaId</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.IdEjercicio}>
                            <StyledTableCell>{row.IdEjercicio}</StyledTableCell>
                            <StyledTableCell>{row.Nombre}</StyledTableCell>
                            <StyledTableCell>{row.CategoriaId}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    

    return (
        <div>
            {renderTable()}
        </div>
    );
}

export default TablaEjercicioPorCat;
