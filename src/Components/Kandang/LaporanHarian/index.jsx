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
            getDataDaysReport()
        })
        .catch(err=>{
            console.log(err , '  <<< ERROR')
        })
    }

    return (
        <div>
            
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

            <div className="input-kandang-container">

                <h3>Input Baris Baru</h3>
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
                        onClick={e=>saveDaysReport()}
                    >
                        Save
                    </button>
                    <button 
                        style={{marginLeft : 10}}
                        onClick={e=>setShowInput(false)}
                    >
                        Cancel
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