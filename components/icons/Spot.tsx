import { Vault } from 'lucide-react'
import React from 'react'

interface ISpot {
    size: string,
}
const Spot = ({size}: ISpot) => {
    return (
        <div>
            <Vault size={size} className='text-black dark:text-white' />
        </div>
    )
}

export default Spot