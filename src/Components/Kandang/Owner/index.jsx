import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// STYLE
import './style.css'

// MATERIAL ICONS
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function Owner() {
    const [ ownerName, setOwnerName ] = useState(null)
    const [ dataOwner, setDataOwner ] = useState(null)
    const [ ayam, setAyam ] = useState(null)
    const [ pakan, setPakan ] = useState(null)
    const [ fcr, setFcr ] = useState(null)
    const [ presentase, setPresentase ] = useState(null)
    const [ berat, setBerat ] = useState(null)
    const [ tray, setTray ] = useState(null)
    const [ tara, setTara ] = useState(null)
    const [ netto, setNetto ] = useState(null)
    const [ matiAfkir, setMatiAfkir ] = useState(null)
    const [ IOOkg, setIOOkg ] = useState(null)
    const [ countLoc, setCountLoc ] = useState(null)
    const [ countUnit, setCountUnit ] = useState(null)

    const history = useHistory()

    const getDataOwnerKandang = () => {
        axios({
            method: "GET",
            url: `${SERVER}kandang/get-data-owner-kandang`,
            headers : {
                token : localStorage.getItem('token')
            }
        })
        .then((res) => {
            setCountLoc(res.data.countLocation)
            setCountUnit(res.data.countUnit)
            var data = res.data.data[0]
            setOwnerName(data.ownername)
            setDataOwner(data)
            setAyam(data.ayam)
            setPakan(data.pakan)
            setFcr(data.fcr)
            setPresentase(data.presentase)
            setBerat(data.kg)
            setTray(data.tray)
            setTara(data.tara)
            setNetto(data.netto)
            setMatiAfkir(data.mati_afkir)
            setIOOkg(data["100/kg"])
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDataOwnerKandang()
        const socket = io(`${SERVER}`)
        socket.on('input-days-record-kandang', data => {
            getDataOwnerKandang()
        })
        socket.on('edit-ayam-pakan', data => {
            getDataOwnerKandang()
        })
    }, [])
    
    return (
        <div className="owner-container">

            <h1>Welcome, {ownerName} !</h1>
            <div style={{ display: "flex" }}>
                <h2>Your Kandang Overview</h2> 
                <button 
                    style={{ 
                        height: "30px",
                        width: "70px",
                        marginTop: "18px",
                        marginLeft: "5px"
                    }}
                    onClick={() => history.push('/kandang')}
                    className="detail-button">
                        Manage
                </button>
            </div>

            <div className="dashboard-content-02">

                <div 
                className="dashboard-box-content-02"
                style={{backgroundColor : "#20A8D8"}}
            >

                <div className="dbc-02-f">

                    <div className="dbc-02-f-1">
                        {ayam}
                    </div>

                    <div className="dbc-02-f-2">
                        Total Ayam
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : 11 Aug 2020
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        04:44:59
                    </div>

                </div>

            </div>

                <div 
                className="dashboard-box-content-02"
                style={{backgroundColor : "#63C2DE"}}
                >

                <div className="dbc-02-f">

                    <div className="dbc-02-f-1">
                        {pakan}
                    </div>

                    <div className="dbc-02-f-2">
                        Total Pakan
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : 11 Aug 2020
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        04:44:59
                    </div>

                </div>

                </div>

                <div 
                className="dashboard-box-content-02"
                style={{backgroundColor : "#FEC106"}}
                >

                <div className="dbc-02-f">

                    <div className="dbc-02-f-1">
                        {fcr}
                    </div>

                    <div className="dbc-02-f-2">
                        FCR
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : 11 Aug 2020
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        04:44:59
                    </div>

                </div>

                </div>

                <div 
                className="dashboard-box-content-02"
                style={{backgroundColor : "#F86C6B"}}
                >

                <div className="dbc-02-f">

                    <div className="dbc-02-f-1">
                       {presentase} %
                    </div>

                    <div className="dbc-02-f-2">
                        Presentase
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : 11 Aug 2020
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        04:44:59
                    </div>

                </div>

                </div>    

            </div>

            <div className="dashboard-content-03">

                {/* OTHER BOX */}
                <div 
                    className="dashboard-box-content-02"
                    style={{backgroundColor : "#F86C6B"}}
                >

                    <div className="dbc-02-f">

                        <div className="dbc-02-f-1">
                            Recording Harian
                        </div>

                      
                        <div className="dbc-02-s-1-c">
                            <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                            <div className="dbc-02-s-1">
                                last update : 11 Aug 2020
                                
                            </div>
                        </div>
                   

                    </div>

                    <div className="dbc-02-s-total">

                        <div className="dbc-02-s-2" >
                            <div className="dbc-total-data">
                                <span>Berat Total : {berat}kg</span>
                                <span>Jumlah Tray : {tray}</span> 
                                <span>Tara : {tara}</span>
                                <span>Netto : {netto}</span>
                                <span>Total Mati/Afkir : {matiAfkir}</span>
                                <span style={{ marginBottom: "15px" }}>100/KG : {IOOkg}</span> 
                            </div>
                        </div>

                    </div>
                </div>    
            
            </div>

            
        </div>
    )
}
