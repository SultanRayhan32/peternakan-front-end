import React, { isValidElement, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SERVER from '../../../../helper/server'

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

    const {
        dataCustomer
    } = props

  const Rows = () => {
      return dataCustomer.map((e, idx) => {
          return (
              <TableBody>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{e.customer_name}</TableCell>
                <TableCell>{e.customer_address}</TableCell>
                <TableCell>{e.customer_phone}</TableCell>
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
            <TableCell >NAMA</TableCell>
            <TableCell>ALAMAT</TableCell>
            <TableCell>NOMOR HP</TableCell>
          </TableRow>
        </TableHead>
        
            <Rows />

      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
