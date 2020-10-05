import React, { useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// STYLE
import '../style.css'

export default function Supplier() {
    const [ showAddSupplier, setShowAddSupplier ] = useState(false)
    const [ namaSupplier, setNamaSupplier ] = useState(null)
    const [ alamatSupplier, setAlamatSupplier ] = useState(null)
    const [ nomorSupplier, setNomorSupplier ] = useState(null)
 

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

        </div>
    )
}
