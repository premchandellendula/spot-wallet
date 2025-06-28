import { ArrowLeft } from 'lucide-react'
import React from 'react'

const Back = ({onClick}: {onClick: () => void}) => {
    return (
        <div
            className="w-fit flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer mb-2"
            onClick={onClick}
            >
            <ArrowLeft className="w-5 h-5" />
        </div>
    )
}

export default Back