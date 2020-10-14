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
    const [ arrQty, setArrQty ] = useState([])

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

    const addToCart = (id, name, price, jumlah, idSup) => {
        var data = {
            id,
            name,
            price,
            jumlah,
            idSup
        }
        var arr = dataCart
        
        function checkId(val) {
            return Number(val.id) === Number(id);
        }
        var arr2 = arr.filter(checkId);
        console.log(arrQty)
        if(jumlah < 1) {
            return null
        } else if(arr2.length < 1) {
            setCartTotal(cartTotal + price)
            arrQty.push(1)  
            dataCart.push(data)
        } else {
            return null
        }
    }

    const deleteItemCart = (idx, harga) => {
        if(window.confirm("Yakin?")) {
            const array = dataCart;
            array.splice(idx, 1)
            setCartTotal(cartTotal - harga)
        }

    }

    const renderCart = () => {
        return dataCart && dataCart.map((val, idx) => {
            return (
                <Cart
                    id={val.id} 
                    name={val.name}
                    price={val.price}
                    jumlah={val.jumlah}
                    total={cartTotal}
                    setTotal={setCartTotal}
                    idx={idx}
                    deleteItem={deleteItemCart}
                    arrQty={arrQty}
                    setArrQty={setArrQty}
                />
            )
        })
    }

    const checkOut = () => {
        var arrIdItem = []
        var arrIdSup = []
        dataCart.forEach((val) => {
            arrIdItem.push(Number(val.id))
            arrIdSup.push(Number(val.idSup))
        })
        axios({
            method: "POST",
            url: `${SERVER}barang/check-out`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id_customer: 1,
                id_item: arrIdItem,
                value: cartTotal,
                jumlah_item: dataCart.length,
                id_supplier: arrIdSup,
                qty_item: arrQty
            }
        })
        .then(() => {
            setDataCart([])
            setCartTotal(0)
            setArrQty(0)
            setItem(null)
            alert("sukses")
        })
        .catch((err) => {
            console.log(err)
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
                                        onClick={() => addToCart(val.id_barang, val.nama_barang, val.harga_barang, val.jumlah_barang, val.id_supplier)}
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

                    <div className="check-out-box">
                        <button className="btn-check-out" onClick={checkOut}>Check Out</button>
                        <button onClick={() => setSaleIsOpen(false)} className="btn-close-sale" style={{ marginLeft: "10px" }}>Close</button>
                    </div>

                    <div className="cart-box">
                        {renderCart()}
                    </div>
                   
                </div>
                {/* CART */}

            </div>
            {/* NEW SALE BIG BOX */}

        </div>
    )
}
