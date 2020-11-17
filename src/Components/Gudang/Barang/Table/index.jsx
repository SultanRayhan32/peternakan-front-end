import React, { isValidElement, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import SERVER from '../../../../helper/server'

import CurrencyFormat from 'react-currency-format'

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
        dataBarang
    } = props
  const Rows = () => {
      return dataBarang.map((e, idx) => {

        var hargaEdit = e.harga_barang
        var jumlahEdit = e.jumlah_barang
        var satuanEdit = e.satuan_barang

        const editHarga = (val) => {
          hargaEdit = val
        }

        const editJumlah = (val) => {
          jumlahEdit = val
        }

        const satuanEdit2 = (val) => {
            satuanEdit = val
        }

        const editBarang = () => {
          var statusEgg = false
          if(e.nama_barang === 'Telur') {
            statusEgg = true
          }
          axios({
            method: "POST",
            url: `${SERVER}barang/edit-data-barang`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                harga: hargaEdit, 
                jumlah: Number(jumlahEdit),
                satuan: satuanEdit,
                id_barang: e.id_barang,
                status_egg: statusEgg,
                jumlah_old: e.jumlah_barang
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

        const deleteBarang = (id) => {
          if(window.confirm("Are you sure to Delete this item?")) {
            axios({
            url: `${SERVER}barang/delete-barang/${id}`,
            method: "DELETE",
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(() => {
              alert("Delete Success")
            })
            .catch((err) => {
              console.log(err)
            })
          } 
        }
    
          return (
              <TableBody>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{e.nama_barang}</TableCell>
                {
                    showEdit === e.id_barang
                    ?
                    <>
                    <TableCell>
                        <input type="number" placeholder={e.harga_barang} onChange={(e) => editHarga(e.target.value)} className="input-edit-toko"/> /  
                        <input type="text" placeholder={e.satuan_barang} onChange={(e) => satuanEdit2(e.target.value)} className="input-edit-toko"/>
                    </TableCell>
                    <TableCell>
                        <input type="number" placeholder={e.jumlah_barang} onChange={(e) => editJumlah(e.target.value)} className="input-edit-toko"/> / 
                        {e.satuan_barang}
                    </TableCell>
                    </>
                    :
                    <>
                    <TableCell>
                      <CurrencyFormat value={e.harga_barang} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> / {e.satuan_barang}</TableCell>
                    <TableCell>{e.jumlah_barang} {e.satuan_barang}</TableCell>
                    </>
                }
                <TableCell>{e.nama_supplier}</TableCell>
                <TableCell>
                    {
                        showEdit === e.id_barang
                        ?
                        <>
                            <button className="edit-btn-toko" style={{ marginRight: "10px" }} onClick={editBarang}>Save</button>
                            <button className="delete-btn-toko" onClick={() => setShowEdit(null)}>Cancel</button>
                        </>
                        :
                        <>
                            <button className="edit-btn-toko" style={{ marginRight: "10px" }} onClick={() => setShowEdit(e.id_barang)}>Edit</button>
                            <button className="delete-btn-toko" onClick={() => deleteBarang(e.id_barang)}>Delete</button>
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
            <TableCell >NAMA</TableCell>
            <TableCell>HARGA</TableCell>
            <TableCell>JUMLAH</TableCell>
            <TableCell>SUPPLIER</TableCell>
            <TableCell>EDIT/DELETE</TableCell>
          </TableRow>
        </TableHead>
        
            <Rows />

      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
