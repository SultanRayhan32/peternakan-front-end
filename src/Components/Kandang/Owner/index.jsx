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
    const [ jumlah, setJumlah ] = useState(null)
    const [ berat, setBerat ] = useState(null)
    const [ tray, setTray ] = useState(null)
    const [ tara, setTara ] = useState(null)
    const [ netto, setNetto ] = useState(null)
    const [ matiAfkir, setMatiAfkir ] = useState(null)
    const [ IOOkg, setIOOkg ] = useState(null)
    const [ countLoc, setCountLoc ] = useState(null)
    const [ countUnit, setCountUnit ] = useState(null)
    const [ tanggal, setTanggal ] = useState(null)
    const [ jam, setJam ] = useState(null)

    const history = useHistory()

    let showDate = (dateParams) => {
        let date = new Date(dateParams).getDate() 
        let monthNumber = new Date(dateParams).getMonth()
        let month = ''
        let year = new Date(dateParams).getFullYear()
        switch (monthNumber) {
        case 0 :
            month = 'Januari'
            break;
        case 1 :
            month = 'Februari'
            break;
        case 2 :
            month = 'Maret'
            break;
        case 3 :
            month = 'April'
            break;
        case 4 :
            month = 'mei'
            break;
        case 5 :
            month = 'Juni'
            break;
        case 6 :
            month = 'Juli'
            break;
        case 7 :
            month = 'Agustus'
            break;
        case 8 :
            month = 'September'
            break;
        case 9 :
            month = 'Oktober'
            break;
        case 10 :
            month = 'November'
            break;
        case 11 :
            month = 'Desember'
            break;
        default:
            month = 'hehe'
            break;
        // case 0 :
        //     month = '01'
        //     break;
        // case 1 :
        //     month = '02'
        //     break;
        // case 2 :
        //     month = '03'
        //     break;
        // case 3 :
        //     month = '04'
        //     break;
        // case 4 :
        //     month = '05'
        //     break;
        // case 5 :
        //     month = '06'
        //     break;
        // case 6 :
        //     month = '07'
        //     break;
        // case 7 :
        //     month = '08'
        //     break;
        // case 8 :
        //     month = '09'
        //     break;
        // case 9 :
        //     month = '10'
        //     break;
        // case 10 :
        //     month = '11'
        //     break;
        // case 11 :
        //     month = '12'
        //     break;
        // default:
        //     month = 'hehe'
        //     break;
        }
        return date + ' ' + month  + ' ' + year
    }

    let showHour = (hourParams) => {

        let hour = new Date(hourParams).getHours()
        let minutes = new Date(hourParams).getMinutes()
    
        return (hour > 9 ? hour : "0" + hour ) + ":" + (minutes > 9 ? minutes : "0" + minutes)
    
      }

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
            console.log(data)
            setOwnerName(data.ownername)
            setDataOwner(data)
            setAyam(data.ayam)
            setPakan(data.pakan)
            setFcr(data.fcr)
            setPresentase(data.presentase)
            setJumlah(data.jumlah_butir)
            setBerat(data.kg)
            setTray(data.tray)
            setTara(data.tara)
            setNetto(data.netto)
            setMatiAfkir(data.mati_afkir)
            setIOOkg(data["100/kg"])
            setTanggal(showDate(data.tanggal))
            setJam(showHour(data.tanggal))
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
                        {ayam} ekor
                    </div>

                    <div className="dbc-02-f-2">
                        Ayam
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : {tanggal}
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        {jam}
                    </div>

                </div>

            </div>

                <div 
                className="dashboard-box-content-02"
                style={{backgroundColor : "#63C2DE"}}
                >

                <div className="dbc-02-f">

                    <div className="dbc-02-f-1">
                        {pakan} kg
                    </div>

                    <div className="dbc-02-f-2">
                        Pakan
                    </div>

                </div>

                <div className="dbc-02-s">

                    <div className="dbc-02-s-1-c">
                        <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                        <div className="dbc-02-s-1">
                            update : {tanggal}
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        {jam}
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
                            update : {tanggal}
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        {jam}
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
                            update : {tanggal}
                        </div>
                    </div>

                    <div className="dbc-02-s-2">
                        {jam}
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
                                last update : {tanggal} {jam}
                                
                            </div>
                        </div>
                   

                    </div>

                    <div className="dbc-02-s-total">

                        <div className="dbc-02-s-2" >
                            <div className="dbc-total-data">
                                <span>Jumlah Telur: {jumlah} butir</span>
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
