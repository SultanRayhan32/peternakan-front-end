import React from 'react';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}

function Row(props) {
  const { row , index , history } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell >{row.location_name}</TableCell>
        <TableCell align="right">
          <button onClick={e=>history.push(`/unit-kandang/${row.id_location}`)} className="detail-button">
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
                  <TableCell >JUMLAH</TableCell>
                  <TableCell>BERAT</TableCell>
                  <TableCell>TRAY</TableCell>
                  <TableCell>TARA</TableCell>
                  <TableCell>NETTO</TableCell>
                  <TableCell>AYAM</TableCell>
                  <TableCell>MATI/AFKIR</TableCell>
                  <TableCell>PRESENTASE</TableCell>
                  <TableCell>100/KG</TableCell>
                  <TableCell>PAKAN</TableCell>
                  <TableCell>FCR</TableCell>
                </TableHead>
                <TableBody>
                  <TableCell>{row.jumlah_butir?row.jumlah_butir:"0"} Butir</TableCell>
                  <TableCell >{row.kg?row.kg:"0"} kg</TableCell>
                  <TableCell >{row.tray?row.tray:"0"}</TableCell>
                  <TableCell >{row.tara?row.tara:"0"}</TableCell>
                  <TableCell >{ row.netto ? Math.min(row.netto) : "0" }</TableCell>
                  <TableCell>{row.ayam ? row.ayam : "0"} Ekor</TableCell>
                  <TableCell >{row.mati_afkir ? row.mati_afkir : "0"}</TableCell>
                  <TableCell >{row.presentase ? row.presentase : "0" } %</TableCell>
                  <TableCell >{row["100/kg"] ? row["100/kg"] : "0"}</TableCell>
                  <TableCell>{row.pakan ? row.pakan : "0"} kg</TableCell>
                  <TableCell >{row.fcr ? row.fcr : "0"}</TableCell>
                </TableBody>
              </Table>
              <button className="btn-delete-rows-kandang">Delete</button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function CollapsibleTable(props) {
  const history = useHistory()

  return (
    <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            <TableCell>NOMOR</TableCell>
            <TableCell >NAMA</TableCell>
            <TableCell align="right">DETAIL</TableCell>
            <TableCell align="right">LIHAT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataLocation.map((row , index) => (
            <Row key={row.name} row={row} index={index} history={history} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
