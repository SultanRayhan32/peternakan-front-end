import React, { useState } from 'react'


// STYLE
import '../../style.css'
export default function Box(props) {
    const {
        data, mix, setMix
    } = props

    const [ value, setValue ] = useState(0)
    
    const addToMix = () => {
        if(value < 1) {
            alert("Input Value")
        } else if(Number(value) > Number(data.in)) {
            alert("Jumlah tidak cukup!")
        } else {
            var dataMix = {
                name: data.nama_barang,
                value: Number(value)
            }
            mix.push(dataMix)
            setMix(mix)
        }
    }

    return (
        <div className="gudang-campuran-item-content">
            <span>{data.nama_barang} X {data.in}</span>
            
            <div className="gudang-campuran-input-box">
                <input type="number" onChange={(e) => setValue(e.target.value)}/>
                <button onClick={addToMix}>Tambah</button>
            </div>
        </div>
    )
}
