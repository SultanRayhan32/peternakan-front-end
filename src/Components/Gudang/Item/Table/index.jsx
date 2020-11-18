import React, { useState, useEffect } from 'react'

// MATERIAL UI
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';    

export default function TableComponent(props) {
    const {
        dataItem
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
        }
        return date + ' ' + month  + ' ' + year
    }

    let showHour = (hourParams) => {

        let hour = new Date(hourParams).getHours()
        let minutes = new Date(hourParams).getMinutes()
    
        return (hour > 9 ? hour : "0" + hour ) + ":" + (minutes > 9 ? minutes : "0" + minutes)
    }

    const Rows = () => {
        return dataItem.map((val, idx) => {    
            return (
                <TableBody>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{val.nama_barang}</TableCell>
                    <TableCell>{val.in}</TableCell>
                    <TableCell>{val.stock}</TableCell>
                    <TableCell>{val.out}</TableCell>
                    <TableCell>{showDate(val.tanggal)}</TableCell>
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
              <TableCell>NAMA</TableCell>
              <TableCell>IN</TableCell>
              <TableCell>STOCK</TableCell>
              <TableCell>OUT</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>EDIT/DELETE</TableCell>
            </TableRow>
          </TableHead>
          
              <Rows />
  
        </Table>
      </TableContainer>
    )
}
