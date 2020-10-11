import React, { useState, useEffect } from 'react'

// COMPONENTS
import NewSale from './New Sale'

// STYLE 
import '.././style.css'

export default function Sales() {

    const [ saleIsOpen, setSaleIsOpen ] = useState(false)

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

        </div>
    )
}
