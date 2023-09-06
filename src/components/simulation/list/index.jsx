import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, name, description, creation_date, update_date) {
  return { 
    "id": id, 
    "name": name, 
    "description": description,  
    "creation": creation_date.toLocaleDateString(), 
    "update": update_date.toLocaleDateString() 
  };
}

const rows = [
  createData('1','Frozen yoghurt', 'desc', new Date(), new Date()),
  createData('2','Ice cream sandwich', 'desc', new Date(), new Date()),
  createData('3','Eclair', 'desc', new Date(), new Date()),
  createData('4','Cupcake', 'desc', new Date(), new Date()),
  createData('5','Gingerbread', 'desc', new Date(), new Date()),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} sx={{ width:'95%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell> 
            <TableCell align="right">Descrição</TableCell>
            <TableCell align="right">Data de criação</TableCell>
            <TableCell align="right">Última alteração</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ 
                '&:hover': { backgroundColor:"#f1f3f5" },
                '&:last-child td, &:last-child th': { border: 0 } 
              }}
            >
              <TableCell> {row.name} </TableCell> 
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.creation}</TableCell>
              <TableCell align="right">{row.update}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
