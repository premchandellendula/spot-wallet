import { Trash } from 'lucide-react'
import React from 'react'

const DeleteIcon = ({onClick}: {onClick: () => void}) => {
    return (
        <button onClick={onClick} className='cursor-pointer text-zinc-500 hover:text-red-500 transition-colors duration-200'>
            <Trash size={"20px"} />
        </button>
    )
}

export default DeleteIcon