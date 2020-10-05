// MODULE
import React , { useEffect , useState } from 'react'
import axios from 'axios'

// TOAST
import { ToastContainer, toast } from 'react-toastify';

// COMPONENT
import Table from './Table'
import Loader from '../../Loader'

// SERVER
import SERVER from '../../../helper/server/index'

// STYLE
import '../style.css'

function Kandang (props) {

    const [dataRows,setDataRows] = useState(null)
    const [showInput,setShowInput] = useState(false)
    const [rowsName,setRowsName] = useState(null)
    const [locationName,setLocationName] = useState("")
    const [unitName,setUnitName] = useState("")
    const [isInputLoading,setInputLoading] = useState(false)
    const [isClick,SetIsClick] = useState(false)

    // TOAST NOTIFICATION
    const succesNotify = () => toast.success("Berhasil Menambah Baris Baru")
    const errorNotify = () => toast.error("Internal Server Error")
    const blankNotift = () => toast.error('Harap Isi Semua Form')
    const succesEdit = () => toast.success("Berhasil Edit")
    const errorEdit = () => toast.error("Gagal Edit")
    const blankEdit = () => toast.error("Harap Isi Semua Form")

    const { idUnit , idLocation } = props.match.params

    let getDataRows = () => {
        axios({
            method : "POST",
            url : `${SERVER}kandang/get-data-rows`,
            headers : {
                token : localStorage.getItem('token')
            },
            data : {
                id_location : idLocation,
                id_unit : idUnit
            }
        })
        .then(({data})=>{
            setDataRows(data.data)
            setLocationName(data.locationName)
            setUnitName(data.unitName)
        })
        .catch((err)=>{
            console.log(' ERROR' , err)
        })
    }

    useEffect(()=>{
        getDataRows()
    },[])

    let saverowsName = () => {
        setInputLoading(true)
        SetIsClick(true)
        axios({
            method : "POST",
            url : `${SERVER}kandang/add-rows`,
            data : {
                rows_name : rowsName,
                id_location : idLocation,
                id_unit : idUnit
            },
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            getDataRows()
            succesNotify()
            setInputLoading(false)
            SetIsClick(false)
        })
        .catch(err=>{
            errorNotify()
            setInputLoading(false)
            SetIsClick(false)
        })
    }

    useEffect(()=>{
        if (!rowsName&& isClick) {
            blankNotift()
            SetIsClick(false)
        }
    },[isClick,rowsName])

    return (
        <div>

            <ToastContainer />
            
            <h2>Baris {unitName} Lokasi {locationName}</h2>

            <div className="search-kandang-container">

                <input type="text" className="search-kandang" placeholder="Cari Lokasi"/>

                <button 
                    className="plus-kandang"
                    onClick={e=>setShowInput(true)}
                >
                    Tambah
                </button>

            </div>

            {
                showInput &&
                <div className="input-kandang-container">

                    <h3>Input Baris Baru</h3>
                    <input 
                        type="text" 
                        className="input-kandang"
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setRowsName(e.target.value)}
                    />

                    <div style={{display : "flex", marginTop : 20}}>
                        <button
                            // onClick={e=>saverowsName()}
                            onClick={e=> rowsName ? saverowsName() : SetIsClick(true)}
                        >
                            {
                             isInputLoading ?
                             <Loader />
                             :
                             "Save"
                            }   
                        </button>
                        <button 
                            style={{marginLeft : 10}}
                            onClick={e=>setShowInput(false)}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            }

            <div style={{ display: 'flex', width: '100%'  }}>
                {
                    !dataRows
                    ?
                    <div style={{ marginTop: '24px', marginLeft: '10px' , display : "flex" , justifyContent : "center" , alignItems : "center" , width : "100%" , height : 100 }}>
                        <Loader />
                    </div>
                    :
                    null
                }
            </div>



            {
                dataRows &&
                <Table
                    dataRows={dataRows}
                    idUnit={idUnit}
                    idLocation={idLocation}
                    getDataRows={getDataRows}
                    Loader={Loader}
                    succesEdit={succesEdit}
                    errorEdit={errorEdit}
                    blankEdit={blankEdit}
                />
            }


        </div>
    )

}

export default Kandang