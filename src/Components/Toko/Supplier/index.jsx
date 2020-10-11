import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// COMPONENT
import Table from './Table'

// STYLE
import '../style.css'

export default function Supplier() {
    const [ showAddSupplier, setShowAddSupplier ] = useState(false)
    const [ namaSupplier, setNamaSupplier ] = useState(null)
    const [ alamatSupplier, setAlamatSupplier ] = useState(null)
    const [ nomorSupplier, setNomorSupplier ] = useState(null)
 
    const [ dataSupplier, setDataSupplier ] = useState(null)

    const addNewSupplier = () => {
        if(!namaSupplier) {
            alert("Masukkan Nama Supplier")
        } else if(!alamatSupplier) {
            alert("Masukkan Alamat Supplier")
        } else if(!nomorSupplier) {
            alert("Masukkan Nomor HP Supplier")
        } else {
            axios({
                method: "POST",
                url: `${SERVER}supplier/add-new-supplier`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    nama_supplier: namaSupplier,
                    alamat_supplier: alamatSupplier,
                    nomor_supplier: nomorSupplier,
                }
            })
            .then(() => {
                alert('input success')
            })
            .catch((err) => {
                console.log(err)
                alert('input failed')
            })
        }
    }

    const getDataSupplier = () => {
        axios({
            method: "GET",
            url: `${SERVER}supplier/get-data-supplier`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            // console
            setDataSupplier(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDataSupplier()
        const socket = io(`${SERVER}`)
        socket.on('add-supplier-toko', data => {
            getDataSupplier()
        })
        socket.on('edit-supplier-toko', data => {
            getDataSupplier()
        })
    }, [])

    return (
        <div>

            {/* HEADERS */}
            <h2>Manage Supplier
                <button 
                    className="toko-add-new-01"
                    onClick={() => setShowAddSupplier(!showAddSupplier)}
                >
                    Add +
                </button> 
            </h2>

            {/* FORM ADD BARANG */}
            {
                showAddSupplier
                ?
                <div>
                    <h4 style={{ marginTop: "50px" }}>Add New Supplier</h4> 
                    <div>
                        <input className="toko-input-new-barang" onChange={(e) => setNamaSupplier(e.target.value)} type="text" placeholder="Nama Supplier"/>
                        <input className="toko-input-new-barang" onChange={(e) => setAlamatSupplier(e.target.value)} type="text" placeholder="Alamat Supplier"/>
                        <input className="toko-input-new-barang" onChange={(e) => setNomorSupplier(e.target.value)} type="text" placeholder="Nomor Supplier"/>
                        
                    </div>
                    <button className="toko-add-new-01" style={{ marginTop: "15px", width: "55px" }} onClick={addNewSupplier}>Add</button>
                    <button 
                        className="toko-add-new-01" 
                        style={{ backgroundColor: "red" }}
                        onClick={() => setShowAddSupplier(false)}    
                    >Cancel</button>
                </div>
                :
                null
            }      

            {
                dataSupplier &&
                <Table 
                    dataSupplier={dataSupplier}
                />
            }


        </div>
    )
}
