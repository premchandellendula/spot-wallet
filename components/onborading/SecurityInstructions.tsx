import React, { useState } from 'react'
import ExclamationTrianlgeIcon from '../icons/ExclamationTrianlgeIcon'
import LockIcon from '../icons/LockIcon'
import WarningIcon from '../icons/WarningIcon'
import Button from '../ui/Button'
import Back from '../icons/Back'

const SecurityInstructions = ({next, back, handleGenerateWallet}: {next: () => void, back: () => void, handleGenerateWallet: () => void}) => {
    const [checked, setChecked] = useState(false)
    return (
        <div>
            <Back onClick={back} />
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Security Instructions</h2>
            <div className='w-[90%] md:w-[85%] mx-auto'>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-[0.8rem] text-center">
                    Your Secret Recovery Phrase is the key to your wallet. It’s the only way to restore your funds if you lose access.
                </p>

                <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-800 rounded px-2 py-2.5 md:p-3 mb-3">
                    <span className='text-xl'><WarningIcon /></span>
                    <p className="text-sm text-gray-900 dark:text-gray-400">
                    Never <span className='text-black font-semibold dark:text-white uppercase'>share</span> your secret phrase with anyone. Spot will never ask for it.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-1 bg-gray-200 dark:bg-gray-800 rounded px-2 py-2.5 md:p-3 mb-5">
                    <span className='text-xl'><LockIcon /></span>
                    <p className="text-sm text-gray-900 dark:text-gray-400">
                        Write it down and keep it <span className='text-black font-semibold dark:text-white uppercase'>safe</span>.  Anyone with your phrase can steal your assets.
                    </p>
                </div>

                <label className="flex items-start space-x-2 mb-4 mt-10">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="w-4 h-4 mt-1"
                    />
                    <span className="text-gray-700 dark:text-gray-200 text-[0.9rem] md:text-[1rem]">
                        I understand the risks and have saved my secret phrase.
                    </span>
                </label>

                <Button type='button' variant='primary' size='sm' width='full' text='Next' disabled={!checked} onClick={() => {
                    if (!checked) return;
                    next()
                    handleGenerateWallet()
                }} />
            </div>
        </div>
    )
}

export default SecurityInstructions