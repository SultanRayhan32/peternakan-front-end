import React , { useState , useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// COMPONENT
import Table from './Table/index'
import Loader from '../../Loader'

// SERVER
import SERVER from '../../../helper/server/index'

function Lokasi () {

    let getDataLocation = () => {
        axios({
            method : "GET",
            url : `${SERVER}gudang/get-gudang-location`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then(({data})=>{
            setDataLocation(data)
        })
        .catch((err)=>{
            console.log(' ERROR' , err)
        })
    }

    useEffect(()=>{
        getDataLocation()
        const socket = io(`${SERVER}`)
        socket.on('add-location-kandang', data => {
            getDataLocation()
        })
    },[])

    // LOCAL STATE
    const [dataLocation,setDataLocation] = useState(null)
    const [showInput,setShowInput] = useState(false)
    const [locationName,setLocationName] = useState(null)
    const [isError,setIsError] = useState(false)
    const [isInputLoading,setInputLoading] = useState(false)
    const [isClick,SetIsClick] = useState(false)

    return (
        <div>

            <h2>Lokasi</h2>


            <div className="search-kandang-container">

            <input 
                type="text" 
                className="search-kandang" 
                placeholder="Cari Lokasi" 
                // onKeyUp={(e) => searchDataLocation(e.target.value)}
            />

            <button 
                className="plus-kandang"
                // onClick={e=>setShowInput(true)}
            >
                Tambah
            </button>

            </div>

            {
            showInput &&
            <div className="input-kandang-container">

                <h3>Input Lokasi Baru</h3>
                <input 
                    type="text" 
                    className="input-kandang"
                    // onChangeT={e=>console.log(e.target)}
                    // onChange={e=>setLocationName(e.target.value)}
                />

                <div style={{display : "flex", marginTop : 20}}>
                    <button
                        // onClick={e=> locationName ? saveLocationName() : SetIsClick(true)}
                        className="save-button"
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
                        // onClick={e=>setShowInput(false)}
                        className="cancel-button"
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

export default Lokasi