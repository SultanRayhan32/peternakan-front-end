import React, { useState } from 'react'

// STYLE
import '../../.././style.css'

export default function Cart(props) {
    const {
        id, name, price, jumlah, total, setTotal, idx, deleteItem, arrQty, setArrQty
    } = props

    const [ qty, setQty ] = useState(1)
    const [ harga, setHarga ] = useState(price)
    const [ arrJumlah, setArrJumlah ] = useState(arrQty)

    // const editArrQty = () => {
    //     setArrQty
    //     return arrJumlah[idx] + num
    // }

    const plus = (num) => {
        if(qty === jumlah) {
            setQty(qty)
            setHarga(harga)
            arrJumlah[idx] = qty
        } else {
            setQty(qty + num)
            setHarga((harga + price) * num)
            setTotal(total + price)
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


    return (
        <div className="cart-item-box">

            <span className="cart-item-name"> 
                {name} <span style={{ fontSize: "small" }}>{price}</span>  X {qty}
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
                </div>
            </span>
            <span>Rp. {price} ,-</span>
        </div>
    )
}
