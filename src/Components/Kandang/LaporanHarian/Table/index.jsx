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

  let showDate = (dateParams) => {
      let date = new Date(dateParams).getDate() 
      let monthNumber = new Date(dateParams).getMonth()
      let month = ''
      let year = new Date(dateParams).getFullYear()
      switch (monthNumber) {
      case 0 :
          month = 'Januari'
          break;
      case 1 :
          month = 'Februari'
          break;
      case 2 :
          month = 'Maret'
          break;
      case 3 :
          month = 'April'
          break;
      case 4 :
          month = 'mei'
          break;
      case 5 :
          month = 'Juni'
          break;
      case 6 :
          month = 'Juli'
          break;
      case 7 :
          month = 'Agustus'
          break;
      case 8 :
          month = 'September'
          break;
      case 9 :
          month = 'Oktober'
          break;
      case 10 :
          month = 'November'
          break;
      case 11 :
          month = 'Desember'
          break;
      default:
          month = 'hehe'
          break;
      // case 0 :
      //     month = '01'
      //     break;
      // case 1 :
      //     month = '02'
      //     break;
      // case 2 :
      //     month = '03'
      //     break;
      // case 3 :
      //     month = '04'
      //     break;
      // case 4 :
      //     month = '05'
      //     break;
      // case 5 :
      //     month = '06'
      //     break;
      // case 6 :
      //     month = '07'
      //     break;
      // case 7 :
      //     month = '08'
      //     break;
      // case 8 :
      //     month = '09'
      //     break;
      // case 9 :
      //     month = '10'
      //     break;
      // case 10 :
      //     month = '11'
      //     break;
      // case 11 :
      //     month = '12'
      //     break;
      // default:
      //     month = 'hehe'
      //     break;
      }
      return date + ' ' + month  + ' ' + year
  }

  let showHour = (hourParams) => {

    let hour = new Date(hourParams).getHours()
    let minutes = new Date(hourParams).getMinutes()

    return (hour > 9 ? hour : "0" + hour ) + ":" + (minutes > 9 ? minutes : "0" + minutes)

  }

  return (
    <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NOMOR</TableCell>
            <TableCell style={{width : 200}}>WAKTU LAPORAN</TableCell>
            <TableCell >JUMLAH</TableCell>
            <TableCell>BERAT</TableCell>
            <TableCell>TRAY</TableCell>
            <TableCell>TARA</TableCell>
            <TableCell>NETTO</TableCell>
            <TableCell>EKOR</TableCell>
            <TableCell>MATI/AFKIR</TableCell>
            <TableCell>SISA EKOR</TableCell>
            <TableCell>PRESENTASE</TableCell>
            <TableCell>100/KG</TableCell>
            <TableCell>PAKAN</TableCell>
            <TableCell>FCR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataRows.data.map((row,index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell >
                {showDate(row.tanggal)} | {showHour(row.tanggal)}
              </TableCell>
              <TableCell >{row.jumlah_butir} Butir</TableCell>
              <TableCell >{row.kg} kg</TableCell>
              <TableCell >{row.tray}</TableCell>
              <TableCell >{row.tara}</TableCell>
              <TableCell >{ Math.min(row.netto) }</TableCell>
              <TableCell>{row.ayam}</TableCell>
              <TableCell >{row.mati_afkir}</TableCell>
              <TableCell >{row.sisa_ekor}</TableCell>
              <TableCell >{row.presentase}</TableCell>
              <TableCell >{row["100/kg"]}</TableCell>
              <TableCell>{row.pakan}</TableCell>
              <TableCell >{row.fcr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableLocation;