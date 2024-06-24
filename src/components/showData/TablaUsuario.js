import * as React from 'react';
import useFetchUsuario from "../../hooks/useFetchUsuario";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

/*renderizado de las columnas, aca se declara la cantidad de columnas necesarias
    -id funciona como el dato del json a mostrar
    -label funciona en como se muestra en la columna
 */
const columns = [
    { id: 'idusuario', label: 'IdUsuario', minWidth: 170 },
    { id: 'nombreCompleto', label: 'Nombre Completo', minWidth: 200 },
    { id: 'telefono', label: 'Telefono', minWidth: 170, align: 'right' },
    { id: 'correo', label: 'Correo', minWidth: 170, align: 'right' },
    { id: 'saldo', label: 'Saldo', minWidth: 170, align: 'right' },
    {
        id: 'estado',
        label: 'Estado',
        minWidth: 170,
        align: 'right',
        format: (value) => (value === 1 ? 'Activo' : 'NO activo')
    },
    {
        id: 'fechanacimiento',
        label: 'Fecha Nacimiento',
        minWidth: 170,
        align: 'right',
        format: (value) => {
            const date = new Date(value);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    }
];

/* se hace un fetching de datos desde la funcion de fetch data usuario, esta funcion
solo debe de enviar la data, en caso de querer hacer concatenaciones
de valores hacerlo antes de enviarlos a la funcion.
mirar la linea 95-96 del codigo
 */
function TablaUsuario() {
    const data = useFetchUsuario();

    console.log("data: ", data);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (!data) return <div>Loading...</div>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow hover role="checkbox" tabIndex={0} key={row.idusuario}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'nombreCompleto'
                                                    ? `${row.nombre} ${row.apellido}`
                                                    : column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TablaUsuario;
