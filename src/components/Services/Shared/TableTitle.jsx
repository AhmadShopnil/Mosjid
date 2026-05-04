import React from 'react'

const TableTitle = ({ title1, title2 }) => {
    return (
        <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-[#B98C20] ">{title1}</h2>
            <h2 className="text-2xl font-semibold text-[#B98C20] ">{title2}</h2>
        </div>
    )
}

export default TableTitle