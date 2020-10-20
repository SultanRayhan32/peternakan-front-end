import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

// API
import SERVER from '../../../helper/server'

// STYLE
import '../style.css'

// COMPONENT
import Table from './Table'

export default function Barang() {

    const [ dataBarang, setDataBarang ] = useState(null)
    const [ listSupplier, setListSupplier ] = useState(null)
    const [ showAddBarang, setShowAddBarang ] = useState(false)
    const [ namaBarang, setNamaBarang ] = useState(null)
    const [ hargaBarang, setHargaBarang ] = useState(null)
    const [ jumlahBarang, setJumlahBarang ] = useState(null)
    const [ satuanBarang, setSatuanBarang ] = useState(null)
    const [ idSupplier, setIdSupplier ] = useState(null)
    const [ saldo, setSaldo ] = useState(0)

    const addNewBarang = () => {
        if(!satuanBarang) {
            alert("Masukkan Nama Barang")
        } else if(!hargaBarang) {
            alert("Masukkan Harga Barang")
        } else if(!jumlahBarang) {
            alert("Masukkan Jumlah Awal")
        } else if(!satuanBarang) {
            alert("Masukkan Satuan Barang")
        } else if(!idSupplier) {
            alert("Pilih Supplier")
        } else {
            axios({
                method: "POST",
                url: `${SERVER}barang/add-new-barang`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    nama_barang: namaBarang,
                    harga_barang: hargaBarang,
                    jumlah_barang: jumlahBarang,
                    satuan_barang: satuanBarang,
                    id_supplier: idSupplier
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

    const getDataBarang = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/get-data-barang`,
            headers: {
                token: localStorage.getItem('token')
            },
        })
        .then((res) => {
            setSaldo(res.data.income)
            setDataBarang(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getListSupplier = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/get-list-supplier`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            setListSupplier(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchDataBarang = (key) => {
        axios({
            method: "POST",
            url: `${SERVER}barang/search-data-barang`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                keyword: key
            }
        })
        .then((res) => {
            setDataBarang(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDataBarang()
        getListSupplier()
        const socket = io(`${SERVER}`)
        socket.on('add-barang-toko', data => {
            getDataBarang()
        })
        socket.on('edit-barang-toko', data => {
            getDataBarang()
        })
    }, [])

    return (
        <div>

            {/* HEADERS */}
            <h2>Manage Stocking Barang 
                <button 
                    className="toko-add-new-01"
                    onClick={() => setShowAddBarang(!showAddBarang)}
                >
                    Add +
                </button> 
            </h2>

            {/* FORM SEARCH BARANG */}
            <input type="text" placeholder="Search ..." className="input-cari-barang-toko" onKeyUp={(e) => searchDataBarang(e.target.value)}/>

            {/* FORM ADD BARANG */}
            {
                showAddBarang
                ?
                <div>
                    <h4 style={{ marginTop: "50px" }}>Add New Barang</h4> 
                    <div>
                        <input className="toko-input-new-barang" onChange={(e) => setNamaBarang(e.target.value)} type="text" placeholder="Nama Barang"/>
                        <input className="toko-input-new-barang" onChange={(e) => setHargaBarang(e.target.value)} type="text" placeholder="Harga Barang"/>
                        <input className="toko-input-new-barang" onChange={(e) => setJumlahBarang(e.target.value)} type="text" placeholder="Jumlah Awal"/>
                        <input className="toko-input-new-barang" onChange={(e) => setSatuanBarang(e.target.value)} type="text" placeholder="Satuan Barang"/> <br />
                        <select className="toko-input-new-barang" onChange={(e) => setIdSupplier(e.target.value)} style={{ marginTop: "15px"}}>
                            <option disabled selected>Pilih Supplier</option>
                            {listSupplier.map((val) => {
                                return (
                                    <option value={val.id_supplier}>{val.nama_supplier}</option>
                                )
                            })}
                            <option value={1}>Joko Anwar</option>
                            <option value={2}>Ferdi Budiman</option>
                        </select>
                    </div>
                    <button className="toko-add-new-01" style={{ marginTop: "15px", width: "55px" }} onClick={addNewBarang}>Add</button>
                    <button 
                        className="toko-add-new-01" 
                        style={{ backgroundColor: "red" }}
                        onClick={() => setShowAddBarang(false)}    
                    >Cancel</button>
                </div>
                :
                null
            }      

            {
                dataBarang &&
                <Table 
                    dataBarang={dataBarang}
                />
            }

        </div>
    )
}
