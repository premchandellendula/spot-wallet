import React, { useEffect } from 'react'
import Button from './ui/Button'
import AccountCard from './card/AccountCard'
import Footer from './footer/Footer';
import { useWallet } from '@/other/WalletProvider';

const Wallets = () => {

    const { wallets, setWallets, handleGenerateWallet, handleWalletDelete, handleWalletsDelete } = useWallet()

    const updateWalletBalance = (walletIndex: number, keyIndex: number, balance: number) => {
        setWallets(prevWallets => {
            const updatedWallets = [...prevWallets];
            const updatedKeys = [...updatedWallets[walletIndex].keys];
            updatedKeys[keyIndex] = {
                ...updatedKeys[keyIndex],
                balance
        };

        updatedWallets[walletIndex] = {
            ...updatedWallets[walletIndex],
            keys: updatedKeys
        };

            return updatedWallets;
        });
    };

    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
    
        if (storedWallets) {
            setWallets(JSON.parse(storedWallets));        
        }
    }, []);

    return (
        <div className='p-2 md:p-4 pt-5 md:pt-4 w-full flex flex-col h-screen overflow-y-auto'>
            <div className='flex justify-between'>
                <h2 className='text-2xl md:text-3xl font-semibold'>Spot</h2>

                <div className='flex gap-2'>
                    <Button type='button' size='xs' width='auto' variant='primary' text='Add Wallet' onClick={handleGenerateWallet} />
                    <Button type='button' size='xs' width='auto' variant='special' text='Clear Wallets' onClick={handleWalletsDelete} />
                </div>
            </div>

            <div className='my-6 flex-1'>
                {wallets.length > 0 ? (
                    wallets.map((wallet, idx) => (
                        <AccountCard key={idx} wallet={wallet} index={idx} updateWalletBalance={updateWalletBalance} />
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