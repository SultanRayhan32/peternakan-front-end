import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
import SERVER from '../../../helper/server'

// STYLE
import '../style.css'

import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function Home() {
    const history = useHistory()

    const [ cBarang, setCBarang ] = useState(null)
    const [ cSupplier, setCSupplier ] = useState(null)
    const [ owner, setOwner ] = useState(null)

    const countInToko = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/count-in-toko`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            setCBarang(res.data.barang)
            setCSupplier(res.data.supplier)
            setOwner(res.data.owner)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        countInToko()
        const socket = io(`${SERVER}`)
        socket.on('add-supplier-toko', data => {
            countInToko()
        })
        socket.on('edit-supplier-toko', data => {
            countInToko()
        })
        socket.on('add-barang-toko', data => {
            countInToko()
        })
        socket.on('edit-barang-toko', data => {
            countInToko()
        })
    }, [])

    return (
        <div className="owner-container">

        <h1>Welcome, {owner} !</h1>
        <div style={{ display: "flex" }}>
            <h2>Your Store Overview</h2> 
            <button 
                style={{ 
                    height: "30px",
                    width: "70px",
                    marginTop: "18px",
                    marginLeft: "5px"
                }}
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
                    2323
                </div>

                <div className="dbc-02-f-2">
                    Total Income
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
                    {cBarang}
                </div>

                <div className="dbc-02-f-2">
                    Barang
                <button className="btn-show-dashboard-01" onClick={() => history.push('/stock-barang')}>Show</button>
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
                    {cSupplier}
                </div>

                <div className="dbc-02-f-2">
                    Supplier
                    <button className="btn-show-dashboard-01" onClick={() => history.push('/supplier')}>Show</button>
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
                  32232
                </div>

                <div className="dbc-02-f-2">
                    Penjualan
                    <button className="btn-show-dashboard-01" onClick={() => history.push('/sales')}>Show</button>
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

      

        
    </div>
    )
}