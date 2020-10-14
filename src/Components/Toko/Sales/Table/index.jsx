import React, { isValidElement, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SERVER from '../../../../helper/server'

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

// STYLE
// import '../../style.css'


function CollapsibleTable(props) {

    const [ showEdit, setShowEdit ] = useState(null)

  const history = useHistory()
    const {
        dataSale
    } = props
  const Rows = () => {
      return dataSale.map((e, idx) => {
        var showItem = false
        const showItemBtn = () => {
            showItem = !showItem
            console.log(showItem)
        }
          return (
              <TableBody>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{e.tanggal}</TableCell>
                <TableCell>Rp. {e.value} ,-</TableCell>
                <TableCell>{e.jumlah_item}</TableCell>
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
                    <div style={{ backgroundColor: "black", fontWeight: "bold", width: "20%", color: "white", padding: "5px", borderRadius: "3px" }}>
                        {e.nama_barang.length} Item
                    </div>
                </TableCell>
                <TableCell>
                    {
                        
                        e.nama_supplier.map((val) => {
                            return (
                                <div style={{ display: "flex" }}>
                                    <span style={{ marginBottom: "5px" }}>{val}</span>
                                </div>
                            )
                        })
                    }
                    <div style={{ backgroundColor: "black", fontWeight: "bold", width: "45%", color: "white", padding: "5px", borderRadius: "3px" }}>
                        {e.nama_supplier.length} Orang
                    </div>
                </TableCell>
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
            <TableCell>ITEM TERJUAL</TableCell>
            <TableCell>ITEM</TableCell>
            <TableCell>SUPPLIER</TableCell>
          </TableRow>
        </TableHead>
        
            <Rows />

      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
