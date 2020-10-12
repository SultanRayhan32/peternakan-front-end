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
        } else {
            setQty(qty + num)
            setHarga((harga + price) * num)
            setTotal(total + price)
        }
        console.log(arrJumlah)
    }

    const min = () => {
        if(qty === 1) {
            setQty(1)
            setHarga(harga)
        } else {
            setQty(qty - 1)
            setHarga(harga - price)
            setTotal(total - price)
        }
    }

    const deleteItemInCart = (idx, harga) => {
        deleteItem(idx, harga)
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
                </div>
            </span>
            <span>Rp. {harga} ,-</span>
        </div>
    )
}
