
import { Lock } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

const LockOutline = ({onClick}: {onClick: () => void}) => {
    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button onClick={onClick} className='p-2 hover:dark:bg-gray-800 hover:bg-gray-200/80 rounded-md cursor-pointer'>
                        <Lock className='text-gray-600 dark:text-gray-300' />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="text-white bg-black dark:bg-white dark:text-black rounded px-2 py-2 text-sm">
                    Show Secret Phrase
                </TooltipContent>
            </Tooltip>
        </>
    )
}

export default LockOutline