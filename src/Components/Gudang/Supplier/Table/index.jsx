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
import '../../style.css'

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
                </TableHead>
                <TableBody>
                  <TableCell>adsn</TableCell>
                  <TableCell >asd</TableCell>
                  <TableCell >asd</TableCell>
                  <TableCell >askd</TableCell>
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

    const [ showEdit, setShowEdit ] = useState(null)

  const history = useHistory()
    const {
        dataSupplier
    } = props
  const Rows = () => {
      return dataSupplier.map((e, idx) => {

        var alamatEdit = e.alamat_supplier
        var nomorEdit = e.nomor_supplier

        const editAlamat = (val) => {
          console.log(val)
          alamatEdit = val
        }

        const editNomor = (val) => {
          console.log(val)
          nomorEdit = val
        }

        const editSupplier = () => {
          axios({
            method: "POST",
            url: `${SERVER}supplier/edit-data-supplier`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
              alamat: alamatEdit,
              nomor: nomorEdit,
              id_supplier: e.id_supplier
            }
          })
          .then(() => {
            setShowEdit(null)
            alert("Edit Success")
          })
          .catch((err) => {
            alert("Edit Failed")
          })
        }
    
          return (
              <TableBody>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{e.nama_supplier}</TableCell>
                <TableCell>{showEdit === e.id_supplier ?   
                            <input type="text" placeholder={e.alamat_supplier} onChange={(e) => editAlamat(e.target.value)} className="input-edit-toko" style={{ width: "150px" }}/> 
                            : e.alamat_supplier}</TableCell>
                <TableCell>{showEdit === e.id_supplier ? 
                            <input type="number" placeholder={e.nomor_supplier} onChange={(e) => editNomor(e.target.value)} className="input-edit-toko" style={{ width: "150px" }}/> 
                            : e.nomor_supplier}</TableCell>
                <TableCell>
                    {
                        showEdit === e.id_supplier
                        ?
                        <>
                          <button className="edit-btn-toko" style={{ marginRight: "10px"}} onClick={editSupplier}>Save</button>
                          <button className="delete-btn-toko" style={{ marginRight: "10px" }} onClick={() => setShowEdit(null)}>Cancel</button>
                        </>
                        :
                        <>
                          <button className="edit-btn-toko" style={{ marginRight: "10px" }} onClick={() => setShowEdit(e.id_supplier)}>Edit</button>
                          <button className="delete-btn-toko">Delete</button>    
                        </>
                      }

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
            <TableCell >NAMA SUPPLIER</TableCell>
            <TableCell>ALAMAT SUPPLIER</TableCell>
            <TableCell>NOMOR SUPPLIER</TableCell>
            <TableCell>EDIT/DELETE</TableCell>
          </TableRow>
        </TableHead>
        
            <Rows />

      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
