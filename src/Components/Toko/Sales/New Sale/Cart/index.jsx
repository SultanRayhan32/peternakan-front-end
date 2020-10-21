import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'

// STYLE
import '../../.././style.css'

export default function Cart(props) {
    const {
        id, name, price, jumlah, total, setTotal, idx, deleteItem, arrQty, setArrQty
    } = props

    const [ qty, setQty ] = useState(1)
    const [ harga, setHarga ] = useState(price)
    const [ arrJumlah, setArrJumlah ] = useState(arrQty)
    const [ showDiskon, setShowDiskon ] = useState(false)
    const [ diskon, setDiskon ] = useState(0)

    const plus = (num) => {
        // console.log(diskon)
        // console.log(harga)
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
            console.log(harg)
            // setHarga((harg + price) * num)
            setTotal(total + harg)
            arrQty[idx] = qty + num
            setArrQty(arrQty)
        }
        // console.log(arrJumlah)
        setArrQty(arrJumlah)
    }

    const min = (index) => {
        if(arrQty[idx] === 1) {
            setQty(1)
            setHarga(price)
            deleteItemInCart(index, harga)
        } else {
            setQty(qty - 1)
            setHarga(harga - price)
            setTotal(total - price)
            arrQty[idx] = qty - 1
            setArrQty(arrQty)
        }
    }

    const deleteItemInCart = (index, harga) => {
        deleteItem(index, harga)
    }

    const handleDiscount = () => {
        if(!showDiskon) {
            setShowDiskon(true)
        } else {
            var disc = Number(diskon)
            var harg = harga -  (harga * (disc/100))
            setTotal(total - harga + harg)
        }
    }

    const cancelDiscount = () => {
        var disc = Number(diskon)
        var harg = harga - (harga * (disc/100))
      
        setTotal(total - harg + harga)
        setDiskon(0)
        setShowDiskon(false)
    }

    return (
        <div className="cart-item-box">

            <span className="cart-item-name"> 
                {name} X {qty}
                <div>
                    <button 
                        className="sale-qty-btn" 
                        style={{ backgroundColor: "#20A8D8", marginRight: "5px" }}
                        onClick={() => plus(1)}

                    >
                            +
                    </button>
                    <span>{qty}</span>
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
                        showDiskon
                        ?
                        <>
                            <input type="number" className="sale-input-diskon" onChange={(e) => setDiskon(e.target.value)}/>
                        </>
                        :
                        null
                    }
                        <button 
                            className="sale-diskon-btn"
                            onClick={handleDiscount}
                        >   
                        {
                            showDiskon
                            ?
                            "Add"
                            :
                            "Diskon %"
                        }
                        </button>
                    {
                        diskon === 0
                        ?
                        null
                        :
                        <button
                            className="sale-qty-btn" 
                            style={{ backgroundColor: "#F86C6B", marginLeft: "5px" }}
                            onClick={cancelDiscount}
                        >
                            x
                        </button>
                    }
                </div>
            </span>
            <span><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
        </div>
    )
}
