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
            <h2 className="text-3xl font-bold text-center mb-2">Security Instructions</h2>
            <div className='w-[85%] mx-auto'>
                <p className="text-gray-400 mb-4 text-[0.8rem] text-center">
                    Your Secret Recovery Phrase is the key to your wallet. It’s the only way to restore your funds if you lose access.
                </p>

                <div className="flex items-center gap-1 bg-gray-800 rounded p-3 mb-3">
                    <span className='text-xl'><WarningIcon /></span>
                    <p className="text-sm text-gray-400">
                    Never <span className='text-white uppercase'>share</span> your secret phrase with anyone. Spot will never ask for it.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-1 bg-gray-800 rounded p-3 mb-5">
                    <span className='text-xl'><LockIcon /></span>
                    <p className="text-sm text-gray-400">
                        Write it down and keep it <span className='text-white uppercase'>safe</span>.  Anyone with your phrase can steal your assets.
                    </p>
                </div>

                <label className="flex items-start space-x-2 mb-4">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="w-4 h-4 mt-1"
                    />
                    <span className="text-gray-200">
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