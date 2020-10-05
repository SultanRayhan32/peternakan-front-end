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
            
            <h2>Recording Harian</h2>

            <div
                style={{
                    display: "flex"
                }}>

                <input type="text" className="search-kandang" placeholder="Cari Laporan" style={{ height: "35px" }}/>
                <button className="btn-search-report">Cari</button>

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
                        className="input-days-report"
                        placeholder="Masukkan Berat"
                        // onChangeT={e=>console.log(e.target)}
                        style={{ 
                            marginBottom: "15px"
                        }}
                        onChange={e=>setKg(e.target.value)}
                    />

                    <input 
                        type="number" 
                        className="input-days-report"
                        placeholder={"Jumlah Butir"}
                        // onChangeT={e=>console.log(e.target)}
                        style={{
                            marginBottom: "15px"
                        }}
                        onChange={e=>setJumlahButir(e.target.value)}
                    />

                    <input 
                        type="number" 
                        className="input-days-report"
                        placeholder={"Mati Afkir"}
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setMatiAfkir(e.target.value)}
                    />

                    <div style={{display : "flex", marginTop : 20}}>
                        <button
                            onClick={e=>saveDaysReport(e)}
                            className="save-button"
                            // disabled={ayam === 0 || !ayam || pakan === 0 || !pakan ? true : false }
                        >
                            {
                                isInputLoading ?
                                <Loader />
                                :
                                "Save"
                            }   
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
            {/* <form className="input-kandang-container" onSubmit={e=>saveDaysReport(e)}>

                <h3>Input Recording Harian</h3>
                <input 
                    type="number" 
                    className="input-days-report"
                    placeholder="Masukkan Berat (kg)"
                    onChange={e=>setKg(e.target.value)}
                    style={{
                        marginBottom: "15px"
                    }}
                />
                <input 
                    type="number" 
                    className="input-days-report"
                    placeholder={"Jumlah Butir"}
                    onChange={e=>setJumlahButir(e.target.value)}
                    style={{
                        marginBottom: "15px"
                    }}
                />
                <input 
                    type="number" 
                    className="input-days-report"
                    placeholder={"Mati Afkir"}
                    onChange={e=>setMatiAfkir(e.target.value)}
                />

                <div style={{display : "flex", marginTop : 20}}>
                    <button
                        onClick={e=>saveDaysReport(e)}
                        className="save-button"
                        style={{
                            width: "250px"
                        }}
                    >
                        {
                            isInputLoading ?
                            <Loader />
                            :
                            "Save"
                        }   
                    </button>
                </div>

            </form> */}

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