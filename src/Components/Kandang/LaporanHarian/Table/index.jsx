// MODULE
import React from 'react';
import { useHistory } from 'react-router-dom'

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function TableLocation (props) {

  const classes = useStyles();

  const history = useHistory()

  console.log(props.match , ' << VALUE PROPS')

  return (
    <TableContainer component={Paper} style={{marginTop : 40}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NOMOR</TableCell>
            <TableCell >JUMLAH BUTIR</TableCell>
            <TableCell>KG</TableCell>
            <TableCell>K/P</TableCell>
            <TableCell>TARA</TableCell>
            <TableCell>NETTO</TableCell>
            <TableCell>EKOR</TableCell>
            <TableCell>MATI/AFKIR</TableCell>
            <TableCell>SISA EKOR</TableCell>
            <TableCell>PRESENTASE</TableCell>
            <TableCell>100/KG</TableCell>
            <TableCell>PAKAN</TableCell>
            <TableCell>FCR</TableCell>
            <TableCell align="right">DETAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataRows.data.map((row,index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell >{row.jumlah_butir}</TableCell>
              <TableCell >{row.kg}</TableCell>
              <TableCell >{row.tray}</TableCell>
              <TableCell >{row.tara}</TableCell>
              <TableCell >{ Math.min(row.netto) }</TableCell>
              <TableCell>-</TableCell>
              <TableCell >{row.mati_afkir}</TableCell>
              <TableCell >{row.sisa_ekor}</TableCell>
              <TableCell >{row.presentase}</TableCell>
              <TableCell >{row["100/kg"]}</TableCell>
              <TableCell>-</TableCell>
              <TableCell >{row.fcr}</TableCell>
              <TableCell align="right">
                <button onClick={e=>history.push(`/unit-kandang/${row.id_location}`)}>
                  Detail
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableLocation;