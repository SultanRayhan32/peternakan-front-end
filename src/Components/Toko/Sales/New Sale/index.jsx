import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVER from '../../../../helper/server'

// STYLE 
import '../.././style.css'

export default function NewSale(props) {

    const [ item, setItem ] = useState(null)
    const [ dataCart, setDataCart ] = useState([])

    const getDataBarang = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/get-data-barang`,
            headers: {
                token: localStorage.getItem('token')
            },
        })
        .then((res) => {
            setItem(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchItem = (key) => {
        if(key.length === 0) {
            // getDataBarang()
            setItem(null)
        } else {
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
                setItem(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const addToCart = (id, name, price) => {
        var data = {}
        var dataCar = dataCart
        if(!dataCart) {
            const dataNew = {
                id,
                name,
                price
            }
        } else {

        }
        return setDataCart(dataCart.push(data))
        console.log(data, "DATA")
        console.log(dataCart, "CART")
    }

    useEffect(() => {   
        // getDataBarang()
    }, [])

    const {
        setSaleIsOpen
    } = props
    return (
        <div className="new-sale-box">

            {/* SEARCH ITEM */}
            <input type="text" placeholder="Search Item ..." className="input-cari-barang-toko" onKeyUp={(e) => searchItem(e.target.value)}/>

            {/* NEW SALE BIG BOX */}
            <div className="new-sale-big-box">

                {/* HASIL SEARCH ITEM ROW*/}
                <div className="new-sale-row-box">

                    { item &&
                        item.map((val) => {
                            var qty = 0
                            const plus = (val) => {
                                console.log(qty, "QTY")
                                console.log(val, "VAL")
                                return qty = qty + val
                            }
                            const min = (val) => {
                                return qty - val
                            }
                            return (
                                <div className="new-sale-column-box">
                                    <p>{val.nama_barang}</p>
                                    <span>Price: {val.harga_barang}</span>

                                    <button 
                                        className="sale-qty-btn" 
                                        style={{ backgroundColor: "#20A8D8", width: "70px" }}
                                        onClick={() => addToCart(val.id_barang, val.nama_barang, val.harga_barang)}
                                    >
                                        Tambah
                                    </button>
                                    {/* <div>
                                        <button 
                                            className="sale-qty-btn" 
                                            style={{ backgroundColor: "#20A8D8", marginRight: "5px" }}
                                            onClick={() => plus(1)}
                                        >
                                                +
                                        </button>
                                        {qty}
                                        <button 
                                            className="sale-qty-btn" 
                                            style={{ backgroundColor: "#F86C6B", marginLeft: "5px" }}
                                        >
                                            -
                                        </button>
                                    </div> */}
                                </div>
                            ) 
                        })
                    }

                </div>
                {/* HASIL SEARCH ITEM BOX */}

                {/* CART */}
                <div>
                    CART
                </div>
                {/* CART */}

            </div>
            {/* NEW SALE BIG BOX */}

            <button onClick={() => setSaleIsOpen(false)} className="delete-btn-toko">Close Sale</button>
        </div>
    )
}
