import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Wallets from './Wallets'

const UserWallet = () => {
    return (
        <div className='w-full flex'>
            <Sidebar />
            <Wallets />
        </div>
    )
}

export default UserWallet