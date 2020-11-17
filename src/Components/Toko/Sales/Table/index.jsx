import React, { isValidElement, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SERVER from '../../../../helper/server'
import CurrencyFormat from 'react-currency-format'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// STYLE
// import '../../style.css'


function CollapsibleTable(props) {

    const [ showEdit, setShowEdit ] = useState(null)

    const history = useHistory()

    const {
        dataSale
    } = props

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

    const Rows = () => {
        return dataSale.map((e, idx) => {
            var showItem = false
            return (
                <TableBody>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell >
                        <div>
                        { showDate(e.tanggal) }
                        </div>
                        <div>
                        {  showHour(e.tanggal) }
                        </div>
                    </TableCell>
                    <TableCell><CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> ,-</TableCell>
                    {/* <TableCell>{e.jumlah_item}</TableCell> */}
                    <TableCell>
                        {
                        
                            e.nama_barang.map((val) => {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <span style={{ marginBottom: "5px" }}>{val}</span>
                                    </div>
                                )
                            })
                        }
                        <div style={{ backgroundColor: "black", fontWeight: "bold", width: "100px", color: "white", padding: "5px", borderRadius: "3px" }}>
                            {e.nama_barang.length} Item Terjual
                        </div>
                    </TableCell>
                    {/* <TableCell>
                        {
                            
                            e.nama_supplier.map((val) => {
                                return (
                                    <div style={{ display: "flex" }}>
                                        <span style={{ marginBottom: "5px" }}>{val}</span>
                                    </div>
                                )
                            })
                        }
                        <div style={{ backgroundColor: "black", fontWeight: "bold", width: "62px", color: "white", padding: "5px", borderRadius: "3px" }}>
                            {e.nama_supplier.length} Orang
                        </div>
                    </TableCell> */}
                    <TableCell>{e.customer_name} - {e.customer_address}</TableCell>
                </TableBody>
            )
        })
    }
    
  return (
    <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>NOMOR</TableCell>
            <TableCell >TANGGAL</TableCell>
            <TableCell>NILAI</TableCell>
            {/* <TableCell>ITEM TERJUAL</TableCell> */}
            <TableCell>ITEM</TableCell>
            {/* <TableCell>SUPPLIER</TableCell> */}
            <TableCell>CUSTOMER</TableCell>
          </TableRow>
        </TableHead>
        
            <Rows />

      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
