// MODULE
import React , { useEffect , useState } from 'react'
import axios from 'axios'

// COMPONENT
import Table from './Table/index'
import Loader from '../../Loader'

// SERVER
import SERVER from '../../../helper/server/index'

// STYLE
import '../style.css'

function Kandang () {

    const [dataLocation,setDataLocation] = useState(null)
    const [showInput,setShowInput] = useState(false)
    const [locationName,setLocationName] = useState(null)
    const [isError,setIsError] = useState(false)
    const [isInputLoading,setInputLoading] = useState(false)

    let getDataLocation = () => {
        axios({
            method : "GET",
            url : `${SERVER}kandang/get-data-location`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            setDataLocation(data)
            console.log(data)
        })
        .catch((err)=>{
            console.log(' ERROR' , err)
            setIsError(true)
        })
    }

    useEffect(()=>{
        getDataLocation()
    },[])

    let saveLocationName = () => {
        setInputLoading(true)
        axios({
            method : "POST",
            url : `${SERVER}kandang/add-location`,
            data : {
                location_name : locationName
            },
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            console.log(data)
            alert('SUKSES !!')
            getDataLocation()
            setInputLoading(false)
        })
        .catch(err=>{
            setInputLoading(false)
            console.log(err , '  <<< ERROR')
        })
    }

    return (
        <div>
            
            <h2> Lokasi Kandang</h2>


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
                        onChange={e=>setLocationName(e.target.value)}
                    />

                    <div style={{display : "flex", marginTop : 20}}>
                        <button
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
                            onClick={e=>setShowInput(false)}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            }

            
            <div style={{ display: 'flex', width: '100%'  }}>
                {
                    !dataLocation
                    ?
                    <div style={{ marginTop: '24px', marginLeft: '10px' , display : "flex" , justifyContent : "center" , alignItems : "center" , width : "100%" , height : 100 }}>
                        <Loader />
                    </div>
                    :
                    null
                }
            </div>

            {
                dataLocation &&
                <Table
                    dataLocation={dataLocation}
                />
            }


        </div>
    )

}

export default Kandang