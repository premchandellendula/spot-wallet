import { Vault } from 'lucide-react'
import React from 'react'

interface ISpot {
    size: string,
}
const Spot = () => {
    return (
        <div>
            <Vault className='text-black w-12 h-12 md:w-14 md:h-14 dark:text-white' />
        </div>
    )
}

export default Spot