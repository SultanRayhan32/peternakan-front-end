import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// COMPONENT
import Table from './Table'
import Loader from '../../Loader'

// STYLE
import '../style.css'

export default function Supplier() {

    const [ showAddSupplier, setShowAddSupplier ] = useState(false)
    const [ namaSupplier, setNamaSupplier ] = useState(null)
    const [ alamatSupplier, setAlamatSupplier ] = useState(null)
    const [ nomorSupplier, setNomorSupplier ] = useState(null)
 
    const [ dataSupplier, setDataSupplier ] = useState(null)
    const [ isLoading,setIsLoading] = useState(false)

    let checkName = (name) => {
        if (name.toLowerCase() === "kandang" || name.toLowerCase() === "gudang" || name.toLowerCase() === "doc" ) {
            return false
        }else {
            return true
        }
    }

    const addNewSupplier = (e) => {
        e.preventDefault()
        if(!namaSupplier) {
            alert("Masukkan Nama Supplier")
        } else if(!alamatSupplier) {
            alert("Masukkan Alamat Supplier")
        } else if(!nomorSupplier) {
            alert("Masukkan Nomor HP Supplier")
        }else if (!checkName(namaSupplier)) {
            alert("Nama sudah tersedia")
        }else {
            setIsLoading(true)
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
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                alert('input failed')
                setIsLoading(false)
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

    const searchDataSupplier = (key) => {
        axios({
            method: "POST",
            url: `${SERVER}supplier/search-data-supplier`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                keyword: key
            }
        })
        .then((res) => {
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

            {/* FORM SEARCH SUPPLIER */}
            <input type="text" placeholder="Search ..." className="input-cari-barang-toko" onKeyUp={(e) => searchDataSupplier(e.target.value)}/>


            {/* FORM ADD BARANG */}
            {
                showAddSupplier
                ?
                <form onSubmit={e=>addNewSupplier(e)} style={{marginTop : 15,display : "flex",flexDirection : "column"}}>
                    <h4 style={{ marginTop: "50px" }}>Add New Supplier</h4> 
                    <div>
                        <input className="toko-input-new-barang" onChange={(e) => setNamaSupplier(e.target.value)} type="text" placeholder="Nama Supplier"/>
                        <input className="toko-input-new-barang" onChange={(e) => setAlamatSupplier(e.target.value)} type="text" placeholder="Alamat Supplier"/>
                        <input className="toko-input-new-barang" onChange={(e) => setNomorSupplier(e.target.value)} type="text" placeholder="Nomor Supplier"/>
                        
                    </div>
                    <div style={{display : "flex"}}>

                        <button 
                            // className="toko-add-new-01" 
                            className="save-button"
                            style={{ marginTop: 15  }} 
                            onClick={e=>addNewSupplier(e)}
                        >
                            {
                                isLoading ?
                                <Loader/>:
                                "Add"
                            }
                        </button>
                        <button 
                            // className="toko-add-new-01" 
                            className="save-button" 
                            style={{ backgroundColor: "red",marginLeft : 7 , marginTop : 15 }}
                            onClick={() => setShowAddSupplier(false)}    
                        >Cancel</button>

                    </div>
                </form>
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
