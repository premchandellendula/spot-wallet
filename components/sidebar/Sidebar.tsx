import React from 'react'
import Spot from '../icons/Spot'
import ThemeButton from './ThemeButton'
import SettingsIcon from '../icons/SettingsIcon'

const Sidebar = () => {
    return (
        <div className='w-18 h-screen border-r border-gray-200 dark:border-gray-800 py-4.5 flex flex-col justify-between'>
            <div className='flex items-center justify-center'>
                <Spot size='38px' />
            </div>

            <div className='flex flex-col items-center'>
                <ThemeButton />
                <SettingsIcon />
            </div>
        </div>
    )
}

export default Sidebar