"use client"
import React, { useEffect, useState } from 'react'
import Spot from '../icons/Spot'
import ThemeButton from './ThemeButton'
import LockOutline from '../icons/LockOutline'
import CopyIcon from '../icons/CopyIcon'
import { toast } from 'sonner'
import CrossIcon from '../icons/CrossIcon'

const Sidebar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [storedMnemonicWords, setStoredMnemonicWords] = useState<string[]>([])

    useEffect(() => {
        const wordsString = localStorage.getItem("mnemonics");
        if (wordsString) {
            const wordsArray = JSON.parse(wordsString) as string[];
            setStoredMnemonicWords(wordsArray);
        }
    }, [])

    const copyToClipboard = (content: string) => {
            navigator.clipboard.writeText(content);
            toast.success("Copied to clipboard!");
        };
    return (
        <div className='w-18 relative h-screen border-r border-gray-200 dark:border-gray-800 py-4.5 flex flex-col justify-between'>
            <div className='flex items-center justify-center'>
                <Spot size='38px' />
            </div>

            <div className='flex flex-col items-center'>
                <ThemeButton />
                <LockOutline onClick={() => {
                    setIsDialogOpen(true)
                    document.body.style.overflow = 'hidden'
                }} />
            </div>

            {isDialogOpen && 
                <div className='fixed inset-0 min-h-screen w-full flex justify-center items-center z-100 bg-black/80'>
                    <div className='bg-white dark:bg-zinc-900 w-[70%] mx-auto p-6 rounded-lg'>
                        <div className='flex justify-between mb-6'>
                            <h2 className='text-2xl md:text-3xl font-bold'>Your Secret Phrase</h2>
                            <CrossIcon onClick={() => {
                                setIsDialogOpen(false)
                                document.body.style.overflow = 'unset'
                            }} />
                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-6 transition-all duration-300'>
                            {storedMnemonicWords.map((word, idx) => (
                                <p
                                key={idx}
                                className="md:text-lg bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400/80 dark:hover:bg-zinc-800/80 transition-all duration-300 rounded-lg p-4 text-start"
                                >
                                    <span className='text-base text-zinc-600 dark:text-gray-400 mr-0.5'>{idx + 1}.</span> {word}
                                </p>
                            ))}
                        </div>

                        <button onClick={() => copyToClipboard(storedMnemonicWords.join(" "))} className='flex items-center gap-2 font-semibold dark:text-zinc-300'>
                            <CopyIcon />
                            Click to copy
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Sidebar