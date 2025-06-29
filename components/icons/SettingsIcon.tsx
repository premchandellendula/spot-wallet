
import { Settings } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const SettingsIcon = () => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className='p-2 hover:dark:bg-gray-800 hover:bg-gray-200/80 rounded-md cursor-pointer'>
                        <Settings className='text-gray-600 dark:text-gray-300' />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white text-black rounded px-2 py-2 text-sm">
                    Settings
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default SettingsIcon