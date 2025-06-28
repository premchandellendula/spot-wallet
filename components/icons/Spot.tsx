import { Vault } from 'lucide-react'
import React from 'react'

interface ISpot {
    size: string,
    color: string
}
const Spot = ({size, color}: ISpot) => {
    return (
        <div>
            <Vault size={size} color={color} />
        </div>
    )
}

export default Spot