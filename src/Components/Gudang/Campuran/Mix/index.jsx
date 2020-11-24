import React from 'react'

export default function Mix(props) {
    const {
        name, value
    } = props
    return (
        <tr className='gudang-campuran-table-row'>
            <td>
                {name}
            </td>
            <td>
                {value}
            </td>
        </tr>
    )
}
