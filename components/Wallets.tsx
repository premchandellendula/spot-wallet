import React, { useEffect, useState } from 'react'
import Button from './ui/Button'
import AccountCard from './card/AccountCard'
import Footer from './footer/Footer';
import { toast } from 'sonner';

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

interface IWallets {
    handleGenerateWallet: () => void,
    handleWalletsDelete: () => void,
    handleWalletDelete: (index: number) => void,
    wallets: Wallet[],
    setWallets: (wallets: []) => void
}

const Wallets = ({handleGenerateWallet, handleWalletsDelete, handleWalletDelete, wallets, setWallets}: IWallets) => {

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
    
        if (storedWallets) {
            setWallets(JSON.parse(storedWallets));        
        }
    }, []);

    return (
        <div className='p-4 w-full flex flex-col h-screen overflow-y-auto'>
            <div className='flex justify-between'>
                <h2 className='text-3xl font-semibold'>Spot</h2>

                <div className='flex gap-2'>
                    <Button type='button' size='xs' width='auto' variant='primary' text='Add Wallet' onClick={handleGenerateWallet} />
                    <Button type='button' size='xs' width='auto' variant='special' text='Clear Wallets' onClick={handleWalletsDelete} />
                </div>
            </div>

            <div className='my-10 flex-1'>
                {wallets.length > 0 ? (
                    wallets.map((wallet, idx) => (
                        <AccountCard key={idx} wallet={wallet} index={idx} handleWalletDelete={handleWalletDelete} />
                    ))
                    ) : (
                    <p className="text-center text-gray-400">
                        No wallets yet. Add one to get started!
                    </p>
                )}
            </div>
            
            <div className='mt-auto'>
                <Footer />
            </div>
        </div>
    )
}

export default Wallets