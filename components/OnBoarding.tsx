"use client"
import React, { useEffect, useState } from 'react'
import Spot from './icons/Spot';
import Button from './ui/Button';
import SecurityInstructions from './onborading/SecurityInstructions';
import SecretPhrase from './onborading/SecretPhrase';;
import UserWallet from './UserWallet';
import { useWallet } from '@/other/WalletProvider';

const OnBoarding = () => {
    const [importWallet, setImportWallet] = useState<boolean>(false)
    const { step, setStep, setWallets, setMnemonicWords, next, handleGenerateWallet, setPathTypes, setMnemonicInput } = useWallet();


    useEffect(() => {
        const storedWallets = localStorage.getItem("wallets");
        const storedMnemonic = localStorage.getItem("mnemonics");
        const storedPathTypes = localStorage.getItem("paths");
        if (storedWallets && storedMnemonic && storedPathTypes) {
            setMnemonicWords(JSON.parse(storedMnemonic));
            setWallets(JSON.parse(storedWallets));
            setPathTypes(JSON.parse(storedPathTypes));
            // setStep(3)
        }
    }, []);

    useEffect(() => {
        const currentWallets = localStorage.getItem("wallets")

        if(currentWallets){
            setStep(3)
        }
    }, [])

    return (
        <div className='h-screen dark:bg-zinc-900 flex justify-center items-center'>
            {step === 0 && !importWallet && <>
                <div className='w-80 md:min-w-md min-h-76 px-4 py-6 border border-gray-300 dark:border-gray-800 rounded-md flex flex-col justify-between'>
                    <div>
                        <div className='flex justify-center items-center gap-1 mb-2'>
                            <Spot />
                            <h2 className='text-3xl md:text-4xl font-semibold'>Spot</h2>
                        </div>
                        <p className='text-center text-gray-700 dark:text-gray-400 text-base md:text-lg'>Create a new wallet to get started.</p>
                    </div>

                    <div>
                        <Button type='button' size='sm' text='Create a wallet' width='full' variant='primary' onClick={next} />
                        <Button type='button' size='sm' text='Import a wallet' width='full' variant='secondary' onClick={() => {
                            setImportWallet(true)
                        }} />
                    </div>
                </div>
                </>
            }
            {importWallet && 
                <div className='md:min-w-lg min-h-60 w-[95%] md:w-[60%] px-4 py-6 border border-gray-300 dark:border-gray-800 rounded-md flex flex-col justify-between'>
                    <div>
                        <h2 className='text-2xl font-semibold text-center mb-4'>Import Wallet</h2>
                        <p className='text-gray-700 dark:text-gray-400 text-center mb-10'>
                            Enter your secret recovery phrase to import your existing wallet.
                        </p>
                        <input
                            onChange={(e) => setMnemonicInput(e.target.value)}
                            className='w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-gray-100 outline-none'
                            placeholder='Enter your 12 or 24-word secret phrase here'
                        />
                    </div>

                    <div className='flex justify-end mt-2'>
                        <Button
                        type='button'
                        size='sm'
                        width='auto'
                        variant='primary'
                        text='Import Wallet'
                        onClick={() => {
                            handleGenerateWallet()
                            setStep(3);
                            setImportWallet(false)
                        }}
                        />
                    </div>
                </div>
            }

            {step === 1 &&
                <div className='max-w-md min-h-60 px-4 py-6 border border-gray-300 dark:border-gray-800 rounded-md flex flex-col justify-between'>
                    <SecurityInstructions />
                </div>
            }
            {step === 2 &&
                <div className='max-w-md min-h-60 px-4 py-6 border border-gray-300 dark:border-gray-800 rounded-md flex flex-col justify-between'>
                    <SecretPhrase />
                </div>
            }
            
            {step >= 3 && <UserWallet />}
        </div>

    )
}

export default OnBoarding