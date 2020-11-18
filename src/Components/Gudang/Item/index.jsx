import React, { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import SERVER from '../../../helper/server'

// COMPONENTS
import Table from './Table'
export default function Item() {
    const [ dataItem, setDataItem ] = useState([])

    const getDataItem = () => {
        axios({
            method: "POST",
            url: `${SERVER}gudang/get-data-item`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id_location: 2
            }
        })
        .then((res) => {
            setDataItem(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchDataItem = (keyword) => {
        axios({
            method: "POST",
            url: `${SERVER}gudang/search-data-item`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id_location: 2,
                keyword
            }
        })
        .then((res) => {
            setDataItem(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {   
        getDataItem()
        const socket = io(`${SERVER}`)
        socket.on('insert-item-gudang', data => {
            getDataItem()
        })
        socket.on('update-item-gudang', data => {
            getDataItem()
        })
    }, [])

    return (
        <div>
            <h2>Manage Item</h2>

            <input type="text" placeholder="Search ..." className="input-cari-barang-toko" onKeyUp={(e) => searchDataItem(e.target.value)}/>

            <Table 
                dataItem={dataItem}
            />
        </div>
    )
}
