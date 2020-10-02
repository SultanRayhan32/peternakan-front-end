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

    console.log(props , ' <<< VALUE PROPS JJJJKJ')

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
            console.log(data , ' <<< yuuuhu')
            console.log('BERSJFNDSJFNDSJFN')
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

            <div className="search-kandang-container">

                <input type="text" className="search-kandang" placeholder="Cari Lokasi"/>

            </div>

            <form className="input-kandang-container" onSubmit={e=>saveDaysReport(e)}>

                <h3>Input Recording Harian</h3>
                <input 
                    type="number" 
                    className="input-days-report"
                    placeholder="Masukkan Berat"
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

            </form>

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