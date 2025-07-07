"use client"
import React, { useState } from 'react'
import Button from '../ui/Button'
import { useWallet } from '@/other/WalletProvider'

const SecretPhrase = () => {
    const [isSecretShown, setIsSecretShown] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const { mnemonicWords, next } = useWallet()
    return (
        <div className='max-w-lg mx-auto px-2'>
            <div className='flex flex-col gap-3 items-center mb-4'>
                <h2 className='text-2xl md:text-3xl font-semibold'>Secret Recovery Phrase</h2>
                <p className='text-yellow-700 dark:text-yellow-400 text-center text-[0.8rem] md:text-sm'>This phrase is the ONLY way to recover your wallet. DO NOT share it with anyone.</p>
            </div>

            <label className="flex items-start space-x-2 mb-4 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isSecretShown}
                    onChange={(e) => setIsSecretShown(e.target.checked)}
                    className="w-4 h-4 mt-1 cursor-pointer"
                />
                <span className="text-gray-700 dark:text-gray-200">
                    Show Secret Phrase
                </span>
            </label>

            <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 justify-center w-full items-center mx-auto my-6 transition-all duration-300 ${!isSecretShown ? "blur-sm pointer-events-none select-none" : ""}`}>
                {mnemonicWords.map((word, idx) => (
                    <p
                    key={idx}
                    className="md:text-lg bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-800/80 transition-all duration-300 rounded-lg px-3 p-2 text-start"
                    >
                        <span className='text-base text-gray-600 dark:text-gray-400 mr-0.5'>{idx + 1}.</span> {word}
                    </p>
                ))}
            </div>

            <label className="flex items-start space-x-2 mb-4 cursor-pointer">
                <input
                    type="checkbox"
                    checked={isSaved}
                    onChange={(e) => setIsSaved(e.target.checked)}
                    className="w-4 h-4 mt-1 cursor-pointer"
                />
                <span className="text-gray-700 dark:text-gray-200">
                    I saved my recovery phrase
                </span>
            </label>

            <Button type='button' variant='primary' size='sm' width='full' text='Next' disabled={!isSaved} onClick={() => {
                if (!isSaved) return;
                next();
            }} />
        </div>
    )
}

export default SecretPhrase