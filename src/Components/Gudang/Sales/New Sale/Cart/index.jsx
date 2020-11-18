import Axios from 'axios'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'

// STYLE
import '../../.././style.css'

export default function Cart(props) {
    const {
        id, name, price, jumlah, total, setTotal, idx, deleteItem, arrQty, setArrQty, dataCart, setQtyButir, berat, butir, priceEgg, setPriceEgg,
        kgEgg, setKgEgg, qtyEgg, setQtyEgg
    } = props

    const [ qty, setQty ] = useState(1)
    const [ harga, setHarga ] = useState(Number(price))
    const [ arrJumlah, setArrJumlah ] = useState(arrQty)
    const [ showDiskon, setShowDiskon ] = useState(false)
    const [ showAddDiskon, setShowAddDiskon ] = useState(true)
    const [ diskon, setDiskon ] = useState(0)
    const [ diskonStatus, setDiskonStatus ] = useState(0)
    const [ showEgg, setShowEgg ] = useState(false)
    const [ isEgg, setIsEgg ] = useState(false)


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
            var harg = Number(price) -  (Number(price) * (disc/100))
            setQty(qty + num)
            setTotal(Number(total) + Number(harg))
            arrQty[idx] = qty + num
            setArrQty(arrQty)
        }
        setArrQty(arrJumlah)
    }

    const min = (index) => {
        var disc = Number(diskon)
        var harg = Number(price) -  (Number(price) * (disc/100))
        // console.log(harg)
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

    const deleteItemInCart = (index) => {
        var priceNum = Number(price)
        var disc = Number(diskon)
        var harg = ""
      
        if(name === "Telur" && Number(kgEgg) > 0 && qtyEgg === 0 && !isEgg) {
            priceNum = 0
        } else if(name === "Telur" && kgEgg === 0 && Number(qtyEgg) > 0 && !isEgg) {
            priceNum = 0
        }
        
        if(name === "Telur" && Number(kgEgg) > 0 && Number(qtyEgg) > 0 && isEgg) {
            priceNum = priceEgg
        } else if(name === "Telur" && kgEgg === 0 && !isEgg) {
            priceNum = 0
        } 
   
        if(dataCart.length > 0) {
            setDiskonStatus(0)
            setDiskon(0)
            var harg = priceNum -  (priceNum * (disc/100))
            setHarga(priceNum)
            setQty(arrQty[idx + 1])
            deleteItem(index, harg)
        } else {
            setDiskonStatus(0)
            setDiskon(0)
            var rego = dataCart[idx + 1].price
            setHarga(rego)
            deleteItem(index, priceNum)
        }
        
    }

    const handleDiscount = () => {
        const arrLength = Number(arrQty.length)
        var disc = Number(diskon)
        var harg = Number(price) -  (Number(price) * (disc/100))
       
        if(disc > 100) {
            alert("Max 100 %")
        } else {
            if(diskonStatus === 0) {
                setDiskonStatus(1)
            } else if(qty > 1 && arrLength === 1) {
                setTotal(harg * qty)
                setDiskonStatus(2)
            } else if(qty === 1 && arrLength === 1) {
                setTotal(total - Number(price) + harg)
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
        var harg = Number(price) - (Number(price) * (disc/100))
        const rego = Number(price)
        if(qty === 1 && arrLength === 1) {
            setTotal(total - harg + rego)
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty > 1 && arrLength === 1) {
            setTotal(total - total + (rego * qty))
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty === 1 && arrLength > 1) {
            setTotal(total - harg + rego)
            setDiskon(0)
            setDiskonStatus(0)
        } else if(qty > 1 && arrLength > 1) {
            setTotal(total - (harg * qty) + (rego * qty))
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

    const renderInputButir = () => {
        if(!showEgg) {
                return (
                    <div>
                        <div className="input-butir-sales-box">
                            <input type="number" placeholder="Berat (kg)" style={{ width: "48%" }} className="input-butir-sales" onChange={(e) => setKgEgg(e.target.value)}/>
                            <input type="number" placeholder="Butir" style={{ width: "48%" }} className="input-butir-sales" onChange={(e) => setQtyEgg(e.target.value)}/>
                        </div>
                        <button
                            className="add-butir-btn-sales"
                            style={{ backgroundColor: "#20A8D8" }}
                            onClick={handleEggSales}
                            >
                            Save
                        </button>
                        <button
                            className="add-butir-btn-sales" 
                            style={{ backgroundColor: "#F86C6B", marginLeft: "7px" }}
                            onClick={() => deleteItemInCart(idx, harga)}
                        >
                            Delete
                        </button>
                    </div>
            )
        } else {
            return (
                <div>
                    <div style={{ display: "flex" }}>
                        <span>{kgEgg} Kg</span> || <span>{qtyEgg} Butir</span>
                    </div>
                    <button
                        className="add-butir-btn-sales"
                        style={{ backgroundColor: "#20A8D8", marginLeft: "7px" }}
                        onClick={() => setShowEgg(false)}
                    >
                        Edit
                    </button>
                    <button
                        className="add-butir-btn-sales" 
                        style={{ backgroundColor: "#F86C6B", marginLeft: "7px" }}
                        onClick={() => deleteItemInCart(idx, harga)}
                    >
                        Delete
                    </button>
                    {
                        diskonStatus === 0
                        ?
                        <button
                            className="add-butir-btn-sales" 
                            style={{ backgroundColor: "#FEC106", marginLeft: "7px", color: "black" }}
                            onClick={handleDiscount}
                        >
                            %
                        </button>
                        :
                        <>
                        <input type="number" className="input-butir-sales" style={{ marginLeft: "7px" }} onChange={(e) => setDiskon(e.target.value)}/>
                        <button
                            className="add-butir-btn-sales" 
                            style={{ backgroundColor: "#FEC106", marginLeft: "7px", color: "black" }}
                            onClick={handleDiscount}
                        >
                            Add
                        </button>
                        </>
                    }
                </div>
            )
        }
    }

    const handleEggSales = (num) => {
        if(kgEgg === 0) {
           alert("Masukkan Berat Telur!")
        } else if(qtyEgg === 0) {
            alert("Masukkan jumlah telur!")
        } else if(Number(kgEgg) >= berat) {
            alert("Berat Telur kurang!")
        } else if(Number(qtyEgg >= butir)) {
            alert("Jumlah Telur kurang!")
        } else if(Number(kgEgg) === 0 && Number(qtyEgg) > 0 )  {
            alert("Masukkan berat telur!")
        } else {
            var disc = 0
            if(diskon === 0) {
                disc = 0
            } else {
                disc = diskon
            }
            var tara = Math.ceil(Number(qtyEgg) / 30)
            var beratTara = Number((0.14 * tara).toFixed(2))
            var hargaTelur = Number(price) * Number(kgEgg)
            // console.log(Number(price) * (Number(kgEgg) - beratTara))
            var harg = hargaTelur -  (hargaTelur * (disc/100)) 
        
            setPriceEgg(Number(price) * kgEgg)
            if(arrQty.length === 1) {
                setIsEgg(true)
                setQty(kgEgg)
                setTotal(Number(harg))
                arrQty[idx] = kgEgg
                setArrQty(arrQty)
                setQtyButir(qtyEgg)
                setShowEgg(true)
            } else {    
                setIsEgg(true)
                setQtyButir(qtyEgg)
                setQty(kgEgg)
                setTotal(Number(total) + Number(harg))
                arrQty[idx] = kgEgg
                setArrQty(arrQty)
                setShowEgg(true)
            }
        }
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
                            Discount {diskon} %
                        </span>
                        </>
                        :
                    null
                }
                
                {
                    name === 'Telur'
                    ?
                    renderInputButir()
                    :
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
                }
            </span>
            {
                diskonStatus === 2
                ?
                <strike style={{ color: "red" }}><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></strike>
                :
                <span className="price-in-cart" ><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
            }
            {
                diskonStatus === 2
                ?
                <span style={{ marginLeft: "7px" }} className="price-in-cart" >
                    <CurrencyFormat value={harga - (harga * (Number(diskon)/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </span>
                :
                null
            }
        </div>
    )
}
