import { Copy } from 'lucide-react'
import React from 'react'

const CopyIcon = () => {
    return (
        <div className='cursor-pointer'>
            <Copy className='dark:text-gray-400 text-gray-800 hover:text-gray-700 dark:hover:text-gray-500' size={"16px"} />
        </div>
    )
}

export default CopyIcon