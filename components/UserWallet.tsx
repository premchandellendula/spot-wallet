import React from 'react'
import Sidebar from './sidebar/Sidebar'
import Wallets from './Wallets'

export interface CoinKeyPair {
    coinType: string;
    path: string;
    publicKey: string;
    privateKey: string;
    balance: number
} 

interface Wallet {
    mnemonic: string;
    keys: CoinKeyPair[];
    balance: number
}

interface IUserWallet {
    handleGenerateWallet: () => void,
    handleWalletsDelete: () => void,
    handleWalletDelete: (index: number) => void,
    wallets: Wallet[],
    setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>
}

const UserWallet = ({handleGenerateWallet, handleWalletsDelete, handleWalletDelete, wallets, setWallets}: IUserWallet) => {
    return (
        <div className='w-full flex'>
            <Sidebar />
            <Wallets handleGenerateWallet={handleGenerateWallet} handleWalletsDelete={handleWalletsDelete} wallets={wallets} setWallets={setWallets} handleWalletDelete={handleWalletDelete} />
        </div>
    )
}

export default UserWallet