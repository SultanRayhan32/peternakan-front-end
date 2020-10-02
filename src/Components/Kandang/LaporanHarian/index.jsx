// MODULE
import React , { useEffect , useState } from 'react'
import axios from 'axios'

// COMPONENT
import Table from './Table'

// SERVER
import SERVER from '../../../helper/server/index'

// STYLE
import '../style.css'

function Kandang (props) {

    const [dataRows,setDataRows] = useState(null)
    const [showInput,setShowInput] = useState(false)
    const [rowsName,setRowsName] = useState(null)

    const [kg,setKg] = useState(null)
    const [mati_afkir,setMatiAfkir] = useState(null)
    const [jumlah_butir,setJumlahButir] = useState(null)
    const [ayam,setAyam] = useState(null)
    const [pakan,setPakan] = useState(null)

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

    let saveDaysReport = () => {
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
                console.log(data)
                alert('SUKSES !!')
                setKg(null)
                setJumlahButir(null)
                setMatiAfkir(null)
                getDataDaysReport()
            })
            .catch(err=>{
                console.log(err , '  <<< ERROR')
            })
        }else {
            alert('HARAP ISI SEMUA FORM')
        }
    }

    return (
        <div>
            
            <h2>Recording Harian</h2>

            <div className="search-kandang-container">

                <input type="text" className="search-kandang" placeholder="Cari Lokasi"/>

                <button 
                    className="plus-kandang"
                    onClick={e=>setShowInput(true)}
                >
                    Tambah
                </button>

            </div>

            <div className="input-kandang-container">

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
                        className="save-button"
                        onClick={e=>saveDaysReport()}
                        style={{
                            width: "250px"
                        }}
                    >
                        Input
                    </button>
                </div>

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