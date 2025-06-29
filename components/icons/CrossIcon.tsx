import { X } from 'lucide-react'
import React from 'react'

const CrossIcon = ({onClick}: {onClick: () => void}) => {
    return (
        <button onClick={onClick} className='cursor-pointer'>
            <X />
        </button>
    )
}

export default CrossIcon