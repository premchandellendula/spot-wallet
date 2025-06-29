"use client"
import React, { useState } from 'react'
import DeleteIcon from '../icons/DeleteIcon'
import Solana from '../icons/Solana'
import Ethereum from '../icons/Ethereum'
import CopyIcon from '../icons/CopyIcon'
import ArrowDown from '../icons/ArrowDown'
import ArrowUp from '../icons/ArrowUp'
import { toast } from 'sonner'
import LockIcon from '../icons/LockIcon'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import CrossIcon from '../icons/CrossIcon'

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

const AccountCard = ({wallet, index, handleWalletDelete}: {wallet: Wallet, index: number, handleWalletDelete: (index: number) => void}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [isPrivKeysDialogOpen, setIsPrivKeysDialogOpen] = useState(false)
    const [isSolPrivKeyVisible, setIsSolPrivKeyVisible] = useState(false)
    const [isEthPrivKeyVisible, setIsEthPrivKeyVisible] = useState(false)

    const copyToClipboard = (content: string) => {
        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard!");
    };
    
    return (
        <>
            {!isPrivKeysDialogOpen ? (
                <div className='w-full relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300 my-6'>

                    <div className='flex justify-between items-center p-5 '>
                        <h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>Wallet {index + 1}</h2>
                        <div className='flex gap-6'>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Lock className='text-zinc-500 cursor-pointer hover:text-green-400' size={"20px"} onClick={() => setIsPrivKeysDialogOpen(true)} />
                                </TooltipTrigger>
                                <TooltipContent side="left" className="bg-white text-black rounded px-2 py-2 text-sm">
                                    Show Private Keys
                                </TooltipContent>
                            </Tooltip>
                            <DeleteIcon onClick={() => handleWalletDelete(index)} />
                        </div>
                    </div>

                    <div className='dark:bg-zinc-800 bg-zinc-100 rounded-lg p-5'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3 className='text-xl font-semibold text-zinc-700 dark:text-zinc-200'>Public Keys</h3>
                            <h3 className='text-lg font-semibold text-zinc-800 dark:text-zinc-300'>Balance:{" "}<span className='text-green-500 dark:text-green-400'>${(wallet.balance).toFixed(2)}</span></h3>
                        </div>

                        <div className='flex flex-col gap-4 my-5'>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2">
                                    <Solana />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Solana</span>
                                </div>
                                <div onClick={() => copyToClipboard(wallet.keys[0].publicKey)} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-base cursor-pointer">
                                    <span className='dark:text-gray-200 text-gray-900'>{wallet.keys[0].publicKey}</span>
                                    <CopyIcon />
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2">
                                    <Ethereum />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Ethereum</span>
                                </div>
                                <div onClick={() => copyToClipboard(wallet.keys[1].publicKey)} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-base cursor-pointer">
                                    <span className='dark:text-gray-200 text-gray-900'>{wallet.keys[1].publicKey}</span>
                                    <CopyIcon />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                                className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200 cursor-pointer"
                            >
                                {!isAccordionOpen ? <ArrowDown /> : <ArrowUp />}
                            </button>
                        </div>

                        {isAccordionOpen && 
                            <div className='flex flex-col gap-4 mt-5'>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Solana />
                                        <span className="text-lg font-semibold text-zinc-800 dark:text-white">Solana</span>
                                    </div>
                                    <span className="text-lg font-semibold text-green-500 dark:text-green-400">${(wallet.keys[0].balance).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Ethereum />
                                        <span className="text-lg font-semibold text-zinc-800 dark:text-white">Ethereum</span>
                                    </div>
                                    <span className="text-lg font-semibold text-green-500 dark:text-green-400">${(wallet.keys[1].balance).toFixed(2)}</span>
                                </div>
                            </div>
                        }
                    </div>

                </div>

            ) : (
                <div className='w-full relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300 my-6'>

                    <div className='flex justify-between items-center p-5 '>
                        <h2 className='text-2xl font-bold text-zinc-900 dark:text-white'>Wallet {index + 1}</h2>
                        <CrossIcon onClick={() => setIsPrivKeysDialogOpen(false)} />
                    </div>

                    <div className='dark:bg-zinc-800 bg-zinc-100 rounded-lg p-5'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3 className='text-xl font-semibold text-zinc-700 dark:text-zinc-200'>Private Keys</h3>
                        </div>

                        <div className='flex flex-col gap-4 my-5'>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2">
                                    <Solana />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Solana</span>
                                </div>
                                <div  className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-base cursor-pointer">
                                    <span onClick={() => copyToClipboard(wallet.keys[0].privateKey)} className='dark:text-gray-200 text-gray-900'>
                                        {isSolPrivKeyVisible ? wallet.keys[0].privateKey : "•".repeat(wallet.mnemonic.length)}
                                    </span>

                                    <button onClick={() => setIsSolPrivKeyVisible(!isSolPrivKeyVisible)} className='cursor-pointer'>
                                        {isSolPrivKeyVisible ? (
                                            <EyeOff className="size-4" />
                                            ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-2">
                                    <Ethereum />
                                    <span className="text-base font-medium text-zinc-800 dark:text-zinc-100">Ethereum</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-base cursor-pointer">
                                    <span onClick={() => copyToClipboard(wallet.keys[1].privateKey)} className='dark:text-gray-200 text-gray-900'>
                                        {isEthPrivKeyVisible ? wallet.keys[1].privateKey : "•".repeat(wallet.mnemonic.length)}
                                    </span>
                                    
                                    <button onClick={() => setIsEthPrivKeyVisible(!isEthPrivKeyVisible)} className='cursor-pointer'>
                                        {isSolPrivKeyVisible ? (
                                            <EyeOff className="size-4" />
                                            ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default AccountCard