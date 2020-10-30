import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'

// STYLE
import '../../.././style.css'

export default function Cart(props) {
    const {
        id, name, price, jumlah, total, setTotal, idx, deleteItem, arrQty, setArrQty, dataCart
    } = props

    const [ qty, setQty ] = useState(1)
    const [ harga, setHarga ] = useState(price)
    const [ arrJumlah, setArrJumlah ] = useState(arrQty)
    const [ showDiskon, setShowDiskon ] = useState(false)
    const [ showAddDiskon, setShowAddDiskon ] = useState(true)
    const [ diskon, setDiskon ] = useState(0)
    const [ diskonStatus, setDiskonStatus ] = useState(0)
    const [ trayQty, setTrayQty ] = useState(0)

    const plus = (num) => {
        var disc = 0
        if(diskon === 0) {
            disc = 0
        } else {
            disc = diskon
        }

        if(qty === jumlah) {
            setQty(qty)
            setHarga(harga)
            arrJumlah[idx] = qty
        } else {
            var harg = harga -  (harga * (disc/100))
            setQty(qty + num)
            setTotal(total + harg)
            arrQty[idx] = qty + num
            setArrQty(arrQty)
        }
        setArrQty(arrJumlah)
    }

    const min = (index) => {
        var disc = Number(diskon)
        var harg = harga -  (harga * (disc/100))
        if(arrQty[idx] === 1) {
            setQty(1)
            setHarga(price)
            deleteItemInCart(index, harga)
        } else if(Number(arrQty.length) === 1) {
            setQty(qty - 1)
            setTotal(harg * (qty - 1))
            arrQty[idx] = qty - 1
            setArrQty(arrQty)
        } else {
            setQty(qty - 1)
            setTotal(total - harg)
            arrQty[idx] = qty - 1
            setArrQty(arrQty)
        }
    }

    const deleteItemInCart = (index, harga) => {
      
        var disc = Number(diskon)
        var harg = ""
        
        if(dataCart.length === 1) {
            var harg = harga -  (harga * (disc/100))
            setHarga(harga)
            deleteItem(index, harg)
        } else {
            var rego = dataCart[idx + 1].price
            setHarga(rego)
            deleteItem(index, harga)
        }
    }

    const handleDiscount = () => {
        const arrLength = Number(arrQty.length)
        var disc = Number(diskon)
        var harg = harga -  (harga * (disc/100))

        if(disc > 100) {
            alert("Max 100 %")
        } else {
            if(diskonStatus === 0) {
                setDiskonStatus(1)
            } else if(qty > 1 && arrLength === 1) {
                setTotal(harg * qty)
                setDiskonStatus(2)
            } else if(qty === 1 && arrLength === 1) {
                setTotal(total - harga + harg)
                setDiskonStatus(2)
            } else if(qty === 1 && arrLength > 1) {
                setTotal(total - harga + harg)
                setDiskonStatus(2)
            } else if(arrLength > 1) {
                setTotal(total - (harga * qty) + (harg * qty))
                setDiskonStatus(2)
            }
        }
    }

    const cancelDiscount = () => {
        const arrLength = arrQty.length
        var disc = Number(diskon)
        var harg = harga - (harga * (disc/100))

        if(qty === 1 && arrLength === 1) {
            setTotal(total - harg + harga)
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty > 1 && arrLength === 1) {
            setTotal(total - total + (harga * qty))
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty === 1 && arrLength > 1) {
            setTotal(total - harg + harga)
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty > 1 && arrLength > 1) {
            setTotal(total - (harg * qty) + (harga * qty))
            setDiskon(0)
            setDiskonStatus(0)
        }
    }

    const renderDiskonStatus = () => {
        if(diskonStatus === 0) {
            return (
                <button 
                className="sale-diskon-btn"
                onClick={handleDiscount}
                >   
                %
            </button>
            )
        } else if(diskonStatus === 1) {
            return (
                <button 
                    className="sale-diskon-btn"
                    onClick={handleDiscount}
                    >  
                    Add
                </button>
            )
        }
    }   

    const renderAddTrayEgg = () => {
        return (
            <div>
                <button
                    className="sale-qty-btn" 
                    style={{ backgroundColor: "#20A8D8", marginRight: "5px" }}
                >
                    +
                </button>
                1 Tray
                <button
                    className="sale-qty-btn" 
                    style={{ backgroundColor: "#F86C6B", marginLeft: "5px" }}
                >
                    -
                </button>
            </div>
        )
    }

    const plusTray = () => {
        
    }

    return (
        <div className="cart-item-box">

            <span className="cart-item-name"> 
                {name} X {qty}
                {
                    diskonStatus === 2
                    ?
                        <>
                          <span
                          className="sale-discount-label" 
                          style={{ backgroundColor: "#F86C6B", marginLeft: "5px", width: "20px" }}
                          onClick={cancelDiscount}
                        >
                            x
                        </span>
                        <span className='sale-discount-label'>
                            {diskon} %
                        </span>
                        </>
                        :
                    null
                }
                <div>
                    <button 
                        className="sale-qty-btn" 
                        style={{ backgroundColor: "#20A8D8", marginRight: "5px" }}
                        onClick={() => plus(1)}

                    >
                            +
                    </button>
                    <span>{qty} 
                    
                    { name === 'Telur' ? ' Kg' : null }</span>
                    {
                        qty === 1
                        ?
                        <button 
                            className="sale-qty-btn" 
                            style={{ backgroundColor: "#F86C6B", marginLeft: "5px" }}
                            onClick={() => deleteItemInCart(idx, harga)}
                        >
                            -
                        </button>
                        :
                        <button 
                            className="sale-qty-btn" 
                            style={{ backgroundColor: "#F86C6B", marginLeft: "5px" }}
                            onClick={min}
                        >
                            -
                        </button>

                    }

                    {
                        diskonStatus === 1
                        ?
                            <input type="number" className="sale-input-diskon" onChange={(e) => setDiskon(e.target.value)}/>
                        :
                            null
                    }

                    {renderDiskonStatus()}

                </div>
                {
                    name === 'Telur'
                    ?
                    renderAddTrayEgg()
                    :
                    null
                }
            </span>
            {
                diskonStatus === 2
                ?
                <strike style={{ color: "red" }}><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></strike>
                :
                <span><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
            }
            {
                diskonStatus === 2
                ?
                <span style={{ marginLeft: "7px" }}>
                    <CurrencyFormat value={harga - (harga * (Number(diskon)/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
                :
                null
            }
        </div>
    )
}
