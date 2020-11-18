import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'
import SERVER from '../../../helper/server'


import CurrencyFormat from 'react-currency-format'

// STYLE
import '../style.css'
import '../../../App.css'

import AccessTimeIcon from '@material-ui/icons/AccessTime';

export default function Home() {
    const history = useHistory()

    const [ cBarang, setCBarang ] = useState(0)
    const [ cSupplier, setCSupplier ] = useState(0)
    const [ owner, setOwner ] = useState('')
    const [ cSales, setCSales ] = useState(0)
    const [ cCustomer, setCCustomer ] = useState(0)
    const [ income, setIncome ] = useState(0)
    const [ newDate, setNewDate ] = useState({})
    const [ incomeDate, setIncomeDate ] = useState('')

    const countInToko = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/count-in-toko`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            setNewDate(res.data.newDate)
            setCBarang(res.data.barang)
            setCSupplier(res.data.supplier)
            setOwner(res.data.owner)
            setCSales(res.data.sales)
            setCCustomer(res.data.customer)
            setIncome(res.data.income)
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
        socket.on('check-out', data => {
            countInToko()
        })
        socket.on('add-customer', data => {
            countInToko()
        })
    }, [])

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

    return (
        <div className="owner-container">
        <h1>Welcome, {owner} !</h1>
        <div style={{ display: "flex" }}>
            <h2>Your Gudang Overview</h2> 
        </div>

        <div className="dashboard-content-02">

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#20A8D8"}}
        >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    <CurrencyFormat value={income} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </div>

                <div className="dbc-02-f-2">
                    Total Income
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : {showDate(newDate.income_date)}
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    {showHour(newDate.income_date)}
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
                    Item
                <button className="btn-show-dashboard-01" onClick={() => history.push('/gudang/item')}>Show</button>
                </div>
            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : {showDate(newDate.item_date)}
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    {showHour(newDate.item_date)}
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
                        update : {showDate(newDate.supplier_date)}
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    {showHour(newDate.supplier_date)}
                </div>

            </div>

            </div>

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#F86C6B"}}
            >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                  {cSales}
                </div>

                <div className="dbc-02-f-2">
                    Sales
                    <button className="btn-show-dashboard-01" onClick={() => history.push('/sales')}>Show</button>
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        update : {showDate(newDate.sales_date)}
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    {showHour(newDate.sales_date)}
                </div>

            </div>

            </div>    

        </div>

        
        <div className="dashboard-content-02">

            <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#20A8D8"}}
        >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    {cCustomer}
                </div>

                <div className="dbc-02-f-2">
                    Customer
                    <button className="btn-show-dashboard-01" onClick={() => history.push('/customer')}>Show</button>
                </div>

            </div>

            <div className="dbc-02-s">

                <div className="dbc-02-s-1-c">
                    <AccessTimeIcon style={{ color : "white" , width : 17 , height : 17 }}/>
                    <div className="dbc-02-s-1">
                        last update : {showDate(newDate.customer_date)}
                    </div>
                </div>

                <div className="dbc-02-s-2">
                    {showHour(newDate.customer_date)}
                </div>

            </div>

        </div>
{/* 
        <div 
            className="dashboard-box-content-02"
            style={{backgroundColor : "#63C2DE"}}
            >

            <div className="dbc-02-f">

                <div className="dbc-02-f-1">
                    {cBarang}
                </div>

                <div className="dbc-02-f-2">
                    Item
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

            </div> */}

            {/* <div 
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

            </div> */}
 

        </div>


        
    </div>
    )
}
