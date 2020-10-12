import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVER from '../../../../helper/server'

// COMPONENT
import Cart from './Cart'

// STYLE 
import '../.././style.css'

export default function NewSale(props) {

    const {
        setSaleIsOpen
    } = props

    const [ item, setItem ] = useState(null)
    const [ dataCart, setDataCart ] = useState([])
    const [ cartTotal, setCartTotal ] = useState(0)

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

    const addToCart = (id, name, price, jumlah) => {
        var data = {
            id,
            name,
            price,
            jumlah
        }
        var arr = dataCart
        
        function checkId(val) {
            return Number(val.id) === Number(id);
        }
        
        var arr2 = arr.filter(checkId);
        if(arr2.length < 1) {
            setCartTotal(cartTotal + price)
            return dataCart.push(data)
        } else {
            return null
        }
    }

    const renderCart = () => {
        return dataCart && dataCart.map((val) => {
            return (
                <Cart
                    id={val.id} 
                    name={val.name}
                    price={val.price}
                    jumlah={val.jumlah}
                    total={cartTotal}
                    setTotal={setCartTotal}
                />
            )
        })
    }

    useEffect(() => {   
        // getDataBarang()
    }, [])

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
                           
                            return (
                                <div className="new-sale-column-box">
                                    <p>{val.nama_barang}</p>
                                    <span>Price: {val.harga_barang}</span>

                                    <button 
                                        className="sale-qty-btn" 
                                        style={{ backgroundColor: "#20A8D8", width: "70px" }}
                                        onClick={() => addToCart(val.id_barang, val.nama_barang, val.harga_barang, val.jumlah_barang)}
                                    >
                                        Tambah
                                    </button>
                                </div>
                            ) 
                        })
                    }

                </div>
                {/* HASIL SEARCH ITEM BOX */}

                {/* CART */}
                <div className="new-sale-row-box02">
                    
                    <h2>
                        Total : Rp, {cartTotal} ,-
                    </h2>

                    <div style={{ display: "flex" }}>
                        <button className="btn-check-out">Check Out</button>
                        <button onClick={() => setSaleIsOpen(false)} className="btn-close-sale" style={{ marginLeft: "10px" }}>Close</button>
                    </div>

                    
                    {renderCart()}
                   
                </div>
                {/* CART */}

            </div>
            {/* NEW SALE BIG BOX */}

        </div>
    )
}
