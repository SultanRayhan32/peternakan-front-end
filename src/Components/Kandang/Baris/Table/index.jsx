// MODULE
import React , { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// SERVER
import SERVER from '../../../../helper/server/index'

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

  const { idUnit , idLocation , Loader , succesEdit , errorEdit , blankEdit } = props

  const [editedId, setEditedId] = useState(null)
  const [valueAyam,setValueAyam] = useState(null)
  const [valuePakan,setValuePakan] = useState(null)
  const [editLoading,setEditLoading] = useState(false)
  const [isEditClick,setIsEditClick] = useState(false)

  let renderData = (data,id,fn,inputData) => {
    if (data && id !== editedId ) {
      return data
    }
    else if ( id === editedId) {
      return (
        <>
          <input
            value={inputData}
            type={"number"}
            style={{
              paddingTop : 3,
              marginTop : 2
            }}
            onChange={e=>  fn(e.target.value)}
            className="rows-form-edit"
          />
        </>
      )
    }
    else if (!data) {
      return "0"
    }
  }
  
  let editPakanAyam = (id_rows) => {
    setEditLoading(true)
    setIsEditClick(true)
    axios({
      method : "POST",
      url : `${SERVER}kandang/edit-ayam-pakan-rows`,
      data : {
        ayam : valueAyam,
        pakan : valuePakan,
        id_rows,
        id_location : idLocation,
        id_unit : idUnit
      },
      headers : {
          token : localStorage.getItem('token')
      }
    })
    .then(({data})=>{
      setEditLoading(false)
      props.getDataRows()
      setEditedId(null)
      succesEdit()
      setIsEditClick(false)
    })
    .catch(err=>{
      setEditLoading(false)
      errorEdit()
      setIsEditClick(false)
    })
  }

  useEffect(()=>{

    if (!valueAyam || !valuePakan) { 
      if (isEditClick) {
        blankEdit()
        setIsEditClick(false)
      }
    }

  },[isEditClick,valuePakan,valueAyam])

  return (
    <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NOMOR</TableCell>
            <TableCell >BARIS</TableCell>
            <TableCell>Jumlah Ayam (ekor)</TableCell>
            <TableCell>Jumlah Pakan (kg)</TableCell>
            <TableCell>Presentase/%</TableCell>
            <TableCell>FCR</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell align="right">DETAIL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataRows.map((row,index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell >{ row.rows_name}</TableCell>
              <TableCell >
                { 
                  renderData(row.ayam,row.id_rows,setValueAyam,valueAyam)
                }
              </TableCell>
              <TableCell>
                {
                  renderData(row.pakan,row.id_rows,setValuePakan,valuePakan)
                }
              </TableCell>
              <TableCell>
               {row.presentase}
              </TableCell>
              <TableCell>
                {row.fcr}
              </TableCell>
              <TableCell>
                <></>
                {
                  row.id_rows === editedId ?
                  <div style={{display : "flex"}}>
                    <button
                      onClick={e=> valueAyam && valuePakan ? editPakanAyam(row.id_rows) : setIsEditClick(true)}
                      className="edit-button"
                    >
                      {
                        editLoading ?
                        <Loader />
                        :
                        "Save"
                      }
                    </button>
                    <button 
                      style={{marginLeft : 5}}
                      onClick={e=>setEditedId(null)}
                      className="cancel-button-rows"
                    >
                      Cancel
                    </button>
                  </div> :
                  <div style={{display : "flex"}}>
                    <button
                      onClick={e=>[setEditedId(row.id_rows),setValueAyam(row.ayam),setValuePakan(row.pakan)]} 
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </div>
                }

              </TableCell>
              <TableCell align="right">
                <button 
                  // onClick={e=>history.push(`/unit-kandang/${row.id_location}`)}
                  onClick={e=>history.push(`/laporan-harian/${idLocation}/${idUnit}/${row.id_rows}`,{ ayam : row.ayam , pakan : row.pakan })} className="detail-button"
                >
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