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
    const [isInputLoading,setInputLoading] = useState(false)
    const [isClick,setIsClick] = useState(false)

    const [kg,setKg] = useState(null)
    const [mati_afkir,setMatiAfkir] = useState(null)
    const [jumlah_butir,setJumlahButir] = useState(null)
    const [ayam,setAyam] = useState(null)
    const [pakan,setPakan] = useState(null)

    // TOAST NOTIFICATION
    const succesNotify = () => toast.success("Berhasil Menambah Baris Baru")
    const errorNotify = () => toast.error("Internal Server Error")
    const blankNotift = () => toast.error('Harap Isi Semua Form')

    const { idUnit , idLocation , idBaris } = props.match.params

    let getDataDaysReport = () => {
        axios({
            method : "GET",
            url : `${SERVER}kandang/get-days-record-report/${idBaris}`,
            headers : {
                token : localStorage.getItem('token')
            },
            data : {
                id_location : idLocation,
                id_unit : idUnit
            }
        })
        .then(({data})=>{
            setDataRows(data)
            setAyam(data.ayam)
            setPakan(data.pakan)
            console.log(data.ayam , ' << AYAM')
            console.log(data.pakan , ' << PAKAN')
        })
        .catch((err)=>{
            console.log(' ERROR' , err)
        })
    }

    useEffect(()=>{
        getDataDaysReport()
    },[])

    let saveDaysReport = (e) => {
        e.preventDefault()
        setIsClick(true)
        setInputLoading(true)
        if (kg && jumlah_butir && mati_afkir ) {
            axios({
                method : "POST",
                url : `${SERVER}kandang/add-days-record-report`,
                data : {
                    rows_name : rowsName,
                    id_location : idLocation,
                    id_unit : idUnit,
                    id_rows : idBaris,
                    kg,
                    jumlah_butir,
                    mati_afkir,
                    ayam ,
                    pakan
                    
                },
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                succesNotify()
                setKg(null)
                setJumlahButir(null)
                setMatiAfkir(null)
                getDataDaysReport()
                setInputLoading(false)
                setIsClick(false)
            })
            .catch(err=>{
                errorNotify()
                setInputLoading(false)
                setIsClick(false)
            })
        }else {
            blankNotift()
            setInputLoading(false)
        }
    }

    return (
        <div>

            <ToastContainer />
            
            <h2>Laporan Harian</h2>

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
                dataRows &&

                <form className="input-kandang-container" onSubmit={e=>saveDaysReport(e)}>

                    <h3>Input Baris Baru</h3>

                    {
                        ayam === 0 || !ayam || pakan === 0 || !pakan  ?<h4 style={{color : "#ff0033", fontWeight : "bold"}}>Harap Isi Data Ayam dan Pakan Terlebih Dahulu</h4>
                        : <></>
                        
                    } 

                    <input 
                        type="number" 
                        className="input-kandang"
                        placeholder="Masukkan Berat"
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setKg(e.target.value)}
                    />

                    <input 
                        type="number" 
                        className="input-kandang"
                        placeholder={"Mati Afkir"}
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setMatiAfkir(e.target.value)}
                    />

                    <input 
                        type="number" 
                        className="input-kandang"
                        placeholder={"Jumlah Butir"}
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setJumlahButir(e.target.value)}
                    />

                    <div style={{display : "flex", marginTop : 20}}>
                        <button
                            onClick={e=>saveDaysReport(e)}
                            // disabled={ayam === 0 || !ayam || pakan === 0 || !pakan ? true : false }
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

                </form>

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
                />
            }


        </div>
    )

}

export default Kandang