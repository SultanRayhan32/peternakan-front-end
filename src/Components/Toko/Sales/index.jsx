import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SERVER from '../../.././helper/server'
import io from 'socket.io-client'

// COMPONENTS
import NewSale from './New Sale'
import Table from './Table'

// STYLE 
import '.././style.css'

export default function Sales() {
    const [ saleIsOpen, setSaleIsOpen ] = useState(false)
    const [ dataSale, setDataSale ] = useState([])

    const getDataSales = () => {
        axios({
            method: "GET",
            url: `${SERVER}barang/get-data-sales`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res.data)
            setDataSale(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getDataSales()
        const socket = io(`${SERVER}`)
        socket.on('check-out', data => {
            getDataSales()
        })
    }, [])

    return (
        <div>
            
            {/* HEADER */}
            <h2>
                Penjualan
                {
                    !saleIsOpen
                    ?
                    <button className="toko-add-new-01" onClick={() => setSaleIsOpen(true)}>New Sale</button>
                    :
                    null
                }

            </h2>

            {/* NEW SALE */}
            {
                saleIsOpen
                ?
                <NewSale 
                    setSaleIsOpen={setSaleIsOpen}
                
                />
                :
                null
            }

            <Table 
                dataSale={dataSale}
            />

        </div>
    )
}
