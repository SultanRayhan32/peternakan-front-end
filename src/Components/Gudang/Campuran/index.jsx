import React, { useState } from 'react'
import axios from 'axios'

// SERVER
import SERVER from '../../../helper/server'

// COMPONENTS
import Box from './Box'

// STYLE
import '../style.css'

export default function Campuran(props) {
    const [ item, setItem ] = useState([])
    const [ mix, setMix ] = useState([])

    const searchItem = (keyword) => {
        axios({
            method: "POST",
            url: `${SERVER}gudang/search-data-item-campuran`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                id_location: props.match.params.id,
                keyword
            }
        })
        .then((res) => {
            setItem(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <h2>Campuran</h2>

            <input type="text" placeholder="Cari Item ..." className="input-cari-barang-toko" onKeyUp={(e) => searchItem(e.target.value)}/>

            <div className="gudang-campuran-item-box">
                {item.map((val) => {
                    return (
                        <Box 
                            data={val}
                            mix={mix}
                            setMix={setMix}
                        />
                    )
                })}
            </div>

            <div>
                {mix && mix.map((val) => {
                    return (
                        <div>
                            {val.name}
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
