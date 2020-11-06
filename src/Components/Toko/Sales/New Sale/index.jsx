import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVER from '../../../../helper/server'
import CurrencyFormat from 'react-currency-format'

// COMPONENT
import Cart from './Cart'

// STYLE 
import '../.././style.css'

export default function NewSale(props) {

    const {
        setSaleIsOpen, berat, butir
    } = props

    const [ item, setItem ] = useState(null)
    const [ dataCart, setDataCart ] = useState([])
    const [ cartTotal, setCartTotal ] = useState(0)
    const [ arrQty, setArrQty ] = useState([])
    const [ dataCustomer, setDataCustomer ] = useState([])
    const [ customer, setCustomer ] = useState("")
    const [ customerId, setCustomerId ] = useState(0)
    const [ qtyButir, setQtyButir ] = useState(0)

    const searchItem = (key) => {
        if(key.length === 0) {
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

    const searchCustomer = (key) => {
        setItem(null)
        if(key.length === 0) {
            setDataCustomer([])
        } else {

            axios({
                method: "POST",
                url: `${SERVER}customer/searc-customer`,
                headers: {
                    token: localStorage.getItem("token")
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
       
        if(jumlah < 1) {
            return null
        } else if(arr2.length < 1) {
            setCartTotal(cartTotal + Number(price))
            arrQty.push(1)  
            dataCart.push(data)
        } else {
            return null
        }
    }

    const deleteItemCart = (idx, harga) => {
        if(window.confirm("Yakin?")) {
            dataCart.splice(idx, 1)
            arrQty.splice(idx, 1)
            setDataCart(dataCart)
            setArrQty(arrQty)
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
                    dataCart={dataCart}
                    qtyButir={qtyButir}
                    setQtyButir={setQtyButir}
                    berat={berat}
                    butir={butir}
                />
            )
        })
    }

    const checkOut = () => {
        var statusEgg = false
        var dataEgg = {}
        dataCart.forEach((val, idx) => {
            if(val.name === 'Telur') {
                statusEgg = true
                dataEgg = val
                dataEgg.index = idx
            }
        })
        if(dataCart.length === 0) {
            alert("Pilih Item !")
        } else if(customerId === 0) {
            alert("Pilih Customer!")
        } else {
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
                    id_customer: customerId,
                    id_item: arrIdItem,
                    value: cartTotal,
                    jumlah_item: dataCart.length,
                    id_supplier: arrIdSup,
                    qty_item: arrQty,
                    status_egg: statusEgg,
                    data_egg: dataEgg,
                    qty_butir: qtyButir
                }
            })
            .then(() => {
                setDataCart([])
                setCartTotal(0)
                setArrQty(0)
                setItem(null)
                setSaleIsOpen(false)
                alert("sukses")
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const fillCustomer = (name, id) => {
        setCustomer(name)
        setCustomerId(id)
        setDataCustomer([])
    }

    const renderDataCustomer = () => {
        return dataCustomer.map((val) => {
            return (
                <div className="customer-list-content" onClick={() => fillCustomer(val.customer_name, val.id_customer)}>
                    {val.customer_name}
                </div>
            )
        })
    }

    useEffect(() => {   
        // getDataBarang()
    }, [])

    return (
        <div className="new-sale-box">

        
            {/* NEW SALE BIG BOX */}
            <div className="new-sale-big-box">

                {/* HASIL SEARCH ITEM ROW*/}
                <div className="new-sale-row-box">

                      {/* ROW */}
                        <div className="new-sale-search-row">

                            {/* COLUMN 1 */}
                            <div className="new-sale-search-column">
                                {/* SEARCH ITEM */}
                                <input type="text" placeholder="Search Item ..." className="input-cari-barang-toko" onKeyUp={(e) => searchItem(e.target.value)}/>
                            </div>

                            {/* COLUMN 2 */}
                            <div style={{ marginLeft: "20px" }} className="new-sale-search-column">
                            {/* SEARCH CUSTOMER */}
                                <input type="text" 
                                    placeholder="Search Customer ..." 
                                    className="input-cari-barang-toko" 
                                    onKeyUp={(e) => searchCustomer(e.target.value)}
                                />
                                {
                                    dataCustomer.length === 0
                                    ?
                                    null
                                    :
                                    <div className="customer-list-box">
                                        {renderDataCustomer()}
                                    </div>
                                }
                                
                            </div>

                        </div>

                        <div 
                            className="new-sale-row-box-002" 
                            // style={{overflowY : item && item.length <= 8 ? "visible" : null  }}
                        > 
                            { item &&
                                item.map((val) => {
                                    var qty = 0
                                    
                                    return (
                                        <div className="new-sale-column-box">
                                            <p>{val.nama_barang}</p>
                                            <span>Price: <CurrencyFormat value={val.harga_barang} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>

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

                </div>
                {/* HASIL SEARCH ITEM BOX */}

                {/* CART */}
                <div className="new-sale-row-box02">
                    
                    <h2>
                        Customer: {customer}
                    </h2>
                    <h2>
                        Total : <CurrencyFormat value={cartTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /> ,-
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
