// MODULE
import React , { useEffect , useState } from 'react'
import axios from 'axios'

// COMPONENT
import Table from './Table'
import Loader from '../../Loader'


// SERVER
import SERVER from '../../../helper/server/index'

function Unit (props) {

    const [dataUnit,setDataUnit] = useState(null)
    const [showInput,setShowInput] = useState(false)
    const [unitName,setUnitName] = useState(null)
    const [isInputLoading,setInputLoading] = useState(false)
    const [locationName,setLocationName] = useState("")

    const paramsId = props.match.params.id

    let getDataUnit = () => {
        console.log(paramsId , ' << PARAMS ID')
        axios({
            method : "GET",
            url : `${SERVER}kandang/get-data-kandang/${paramsId}`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            setDataUnit(data.data)
            setLocationName(data.locationName)
            console.log(data , ' DATAAAAA')
            console.log('WKWKWKWKWKWK')
        })
        .catch((err)=>{
            console.log(' ERROR' , err)
        })
    }

    useEffect(()=>{
        getDataUnit()
    },[])

    let saveLocationName = () => {
        setInputLoading(true)
        axios({
            method : "POST",
            url : `${SERVER}kandang/add-kandang`,
            data : {
                unit_name : unitName,
                id_location : paramsId
            },
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data)
            alert('SUKSES !!')
            getDataUnit()
            setInputLoading(false)
        })
        .catch(err=>{
            setInputLoading(false)
            console.log(err , '  <<< ERROR')
        })
    }

    return (
        <div>
            
            <h2>Kandang {locationName}</h2>


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

                    <h3>Input Kandang Baru</h3>
                    <input 
                        type="text" 
                        className="input-kandang"
                        // onChangeT={e=>console.log(e.target)}
                        onChange={e=>setUnitName(e.target.value)}
                    />

                    <div style={{display : "flex", marginTop : 20}}>
                        <button
                            className="save-button"
                            onClick={e=>saveLocationName()}
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
                            className="cancel-button"
                            onClick={e=>setShowInput(false)}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            }

            <div style={{ display: 'flex', width: '100%'  }}>
                {
                    !dataUnit
                    ?
                    <div style={{ marginTop: '24px', marginLeft: '10px' , display : "flex" , justifyContent : "center" , alignItems : "center" , width : "100%" , height : 100 }}>
                        <Loader />
                    </div>
                    :
                    null
                }
            </div>


            {
                dataUnit &&
                <Table
                    dataUnit={dataUnit}
                    idUnit={paramsId}
                />
            }


        </div>
    )

}

export default Unit