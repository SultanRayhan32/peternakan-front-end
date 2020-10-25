import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CurrencyFormat from 'react-currency-format'

// API
import SERVER from '../../../helper/server'

// STYLE
import '../style.css'

// COMPONENT
import TableComponent from './Table'

export default function Barang() {

    const [ dataBarang, setDataBarang ] = useState(null)
    const [ listSupplier, setListSupplier ] = useState(null)
    const [ dataTelur, setDataTelur ] = useState([])
    const [ showAddBarang, setShowAddBarang ] = useState(false)
    const [ showEditBarang, setShowEditBarang ] = useState(false)
    const [ namaBarang, setNamaBarang ] = useState(null)
    const [ hargaBarang, setHargaBarang ] = useState(null)
    const [ jumlahBarang, setJumlahBarang ] = useState(null)
    const [ satuanBarang, setSatuanBarang ] = useState(null)
    const [ idSupplier, setIdSupplier ] = useState(null)
    const [ showEditHargaTelur, setShowEditHargaTelur ] = useState(false)
    const [ hargaTelur, setHargaTelur ] = useState(null)
    const [ dataBarangBySupplier, setDataBarangBySupplier] = useState([])
    const [ dataBarangSupplierChoosed, setDataBarangSupplierChoosed ] = useState({})
    const [ plusJumlahValue, setPlusJumlahValue ] = useState(0)
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
        } else if(saldo < Number(hargaBarang) * Number(jumlahBarang)) {
            alert("Saldo anda tidak mencukupi")
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
            setDataTelur(res.data.telur)
            setSaldo(res.data.saldo)
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

    const editHargaTelur = () => {
        if(!hargaTelur) {
            alert("Masukkan Value")
        } else {
            axios({
                method: "POST",
                url: `${SERVER}barang/edit-harga-telur`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    harga_telur: hargaTelur
                }
            })
            .then(() => {
                setShowEditHargaTelur(false)
                alert("Harga di update")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const getBarangBySupplier = (id) => {
        axios({
            method: "POST",
            url: `${SERVER}barang/get-data-barang-by-supplier`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id_supplier: id
            }
        })
        .then((res) => {
           setDataBarangBySupplier(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleChangeBarangUpdate = (data) => {
        console.log(JSON.parse(data))
        setDataBarangSupplierChoosed(JSON.parse(data))
    }

    const plusJumlahBarang = () => {
        if(!plusJumlahValue) {
            alert("Masukkan Value !")
        } else {
            axios({
                method: "POST",
                url: `${SERVER}barang/plus-jumlah-barang`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    value: plusJumlahValue,
                    id_barang: dataBarangSupplierChoosed.id_barang,
                    total: Number(dataBarangSupplierChoosed.harga_barang) * plusJumlahValue
                }
            })
            .then(() => {
                setShowEditBarang(false)
                setPlusJumlahValue(null)
                alert("Update Jumlah Barang Success")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const handleOpenAdd = () => {
        setShowAddBarang(!showAddBarang)
        setShowEditBarang(false)
    }

    const handleOpenUpdate = () => {
        setShowEditBarang(!showEditBarang)
        setShowAddBarang(false)
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
        socket.on('edit-harga-telur', data => {
            getDataBarang()
        })
        socket.on('plus-jumlah-barang', data => {
            getDataBarang()
        })
        socket.on('delete-barang', data => {
            getDataBarang()
        })
    }, [])

    return (
        <div>

            {/* HEADERS */}
            <h2>Manage Stocking Barang 
                <button 
                    className="toko-add-new-01"
                    onClick={handleOpenAdd}
                >
                    Add +
                </button> 

                <button
                    className="toko-add-new-01"
                    onClick={handleOpenUpdate}
                >
                    Update
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

            {/* FORM UPDATE BARANG */}
            {
                showEditBarang
                ?
                <div>
                    <h4 style={{ marginTop: "50px" }}>Update Barang</h4> 
                    <div style={{ marginBottom: "15px" }}>
                        <select className="toko-input-new-barang" onChange={(e) => getBarangBySupplier(e.target.value)}>
                            <option disabled selected>Pilih Supplier</option>
                            {listSupplier.map((val) => {
                                return (
                                    <option value={val.id_supplier}>{val.nama_supplier}</option>
                                    )
                                })}
                        </select>
                        <select className="toko-input-new-barang" onChange={(e) => handleChangeBarangUpdate(e.target.value)}>
                            <option disabled selected>Pilih Barang</option>
                            {dataBarangBySupplier.map((val, idx) => {
                                var data = dataBarangBySupplier[idx]
                                return (
                                    <option value={JSON.stringify(val,2,3)}>{val.nama_barang}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="form-update-jumlah-barang">
                        <span>Nama Barang: {dataBarangSupplierChoosed.nama_barang}</span> 
                        <span>
                            Jumlah Barang: {dataBarangSupplierChoosed.jumlah_barang}
                        </span> 
                        <span>
                            Harga Barang: <CurrencyFormat value={dataBarangSupplierChoosed.harga_barang} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                        </span> 
                        <input placeholder="Tambah Jumlah Barang" onChange={(e) => setPlusJumlahValue(e.target.value)} type="number"/>
                    </div>
                    <button className="toko-add-new-01" style={{ marginTop: "15px", width: "55px" }} onClick={plusJumlahBarang}>
                        Add
                    </button>
                    <button 
                        className="toko-add-new-01" 
                        style={{ backgroundColor: "red" }}
                        onClick={() => setShowEditBarang(false)}    
                    >Cancel</button>
                </div>
                :
                null
            }     

            <TableContainer component={Paper} style={{marginTop : 40,marginBottom : 40}}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell >BERAT TELUR</TableCell>
                            <TableCell>JUMLAH BUTIR</TableCell>
                            <TableCell>HARGA TELUR</TableCell>
                            <TableCell>EDIT HARGA</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                    {
                        dataTelur.map((val) => {
                            return (
                                <>
                                <TableCell>
                                    <CurrencyFormat value={val.kg} displayType={'text'} thousandSeparator={true} prefix={''} /> Kg
                                </TableCell>
                                <TableCell>
                                    <CurrencyFormat value={val.jumlah_butir} displayType={'text'} thousandSeparator={true} prefix={''} /> butir
                                </TableCell>
                                <TableCell>
                                    {
                                        showEditHargaTelur
                                        ?
                                        <>
                                        Rp. <input placeholder={val.harga_telur}  
                                            style={{ 
                                                width: "100px", padding: "5px", outline: "none", borderRadius: "2px", border: "1px solid black" 
                                            }}
                                            onChange={(e) => setHargaTelur(e.target.value)}
                                        /> / Kg
                                        </> 
                                        :
                                        <>
                                            <CurrencyFormat value={val.harga_telur} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> / Kg
                                        </>
                                    }
                                </TableCell>
                                <TableCell> 
                                    {
                                        showEditHargaTelur
                                        ?
                                        <>
                                        <button className="edit-btn-toko" onClick={editHargaTelur} style={{ marginRight: "5px" }}>Save</button>
                                        <button className="delete-btn-toko" onClick={() => setShowEditHargaTelur(false)}>Cancel</button>
                                        </>
                                        :
                                        <button className="edit-btn-toko" onClick={() => setShowEditHargaTelur(true)}>Edit</button>
                                    }
                                </TableCell>
                                </>
                            )
                        })
                    }
                    </TableBody>
                

                </Table>
            </TableContainer>

            {
                dataBarang &&
                <TableComponent
                    dataBarang={dataBarang}
                />
            }

        </div>
    )
}
