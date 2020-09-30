// MODULE
import React from 'react';
import { useHistory } from 'react-router-dom'

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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

  const [open, setOpen] = React.useState(false);


  return (
    <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
      <Table className={classes.table} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>NOMOR</TableCell>
            <TableCell >UNIT</TableCell>
            <TableCell align="right">DETAIL</TableCell>
            <TableCell align="right">LIHAT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.dataUnit.map((row,index) => (
              <React.Fragment>
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell >{row.unit_name}</TableCell>
                  <TableCell align="right">
                    <button onClick={e=>history.push(`/${props.idUnit}/baris/${row.id_unit}`)}>
                      Detail
                    </button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                      <Typography variant="h6" gutterBottom component="div">
                        Total
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
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
                        </TableHead>
                        <TableBody>
                          <TableCell>{row.jumlah_butir?row.jumlah_butir:"0"}</TableCell>
                          <TableCell >{row.kg?row.kg:"0"}</TableCell>
                          <TableCell >{row.tray?row.tray:"0"}</TableCell>
                          <TableCell >{row.tara?row.tara:"0"}</TableCell>
                          <TableCell >{ row.netto ? Math.min(row.netto) : "0" }</TableCell>
                          <TableCell>{row.ayam ? row.ayam : "0"}</TableCell>
                          <TableCell >{row.mati_afkir ? row.mati_afkir : "0"}</TableCell>
                          <TableCell >{row.sisa_ekor ? row.sisa_ekor : "0"}</TableCell>
                          <TableCell >{row.presentase ? row.presentase : "0" }</TableCell>
                          <TableCell >{row["100/kg"] ? row["100/kg"] : "0"}</TableCell>
                          <TableCell>{row.pakan ? row.pakan : "0"}</TableCell>
                          <TableCell >{row.fcr ? row.fcr : "0"}</TableCell>
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableLocation;