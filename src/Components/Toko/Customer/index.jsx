import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// COMPONENTS
import Table from './Table'

// STYLE
import '../style.css'

export default function Customer() {

    const [ dataCustomer, setDataCustomer ] = useState([])
    const [ showAddCustomer, setShowAddCustomer ] = useState(false)
    const [ name, setName ] = useState('')
    const [ address, setAddress] = useState('')
    const [ phone, setPhone ] = useState('')

    const addNewCustomer = () => {
        if(!name) {
            alert("Masukkan Nama !")
        } else if(!address) {
            alert("Masukkan Alamat!")
        } else if(!phone) {
            alert("Masukkan Nomor HP!")
        } else {
            axios({
                method: "POST",
                url: `${SERVER}customer/add-new-customer`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    name, address, phone
                }
            })
            .then(() => {
                alert("Input Customer Success")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const getDataCustomer = () => {
        axios({
            method: "GET",
            url: `${SERVER}customer/get-data-customer`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            setDataCustomer(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchCustomer = (key) => {
        axios({
            method: "POST",
            url: `${SERVER}customer/search-customer-2`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                keyword: key
            }
        })
        .then((res) => {
            setDataCustomer(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {   
        getDataCustomer()
        const socket = io(`${SERVER}`)
        socket.on('add-customer', data => {
            getDataCustomer()
        })
    }, [])

    return (
        <div>

            <h2>
                Manage Customer
                <button 
                    className="toko-add-new-01"
                    onClick={() => setShowAddCustomer(!showAddCustomer)}
                    >
                    Add +
                </button> 
            </h2>

            {/* FORM SEARCH SUPPLIER */}
            <input type="text" placeholder="Search ..." className="input-cari-barang-toko" onKeyUp={(e) => searchCustomer(e.target.value)}/>

             {/* FORM ADD BARANG */}
             {
                showAddCustomer
                ?
                <div>
                    <h4 style={{ marginTop: "50px" }}>Add New Customer</h4> 
                    <div>
                        <input className="toko-input-new-barang" onChange={(e) => setName(e.target.value)} type="text" placeholder="Nama Customer"/>
                        <input className="toko-input-new-barang" onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Alamat Customer"/>
                        <input className="toko-input-new-barang" onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Nomor HP Customer"/>
                    </div>
                    <button className="toko-add-new-01" style={{ marginTop: "15px", width: "55px" }} onClick={addNewCustomer}>Add</button>
                    <button 
                        className="toko-add-new-01" 
                        style={{ backgroundColor: "red" }}
                        onClick={() => setShowAddCustomer(false)}    
                    >Cancel</button>
                </div>
                :
                null
            }      

            <Table 
                dataCustomer={dataCustomer}
            />

        </div>
    )
}
