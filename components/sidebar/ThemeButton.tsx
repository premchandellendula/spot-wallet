"use client"
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const ThemeButton = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return (
        <button className="relative h-10 w-10 flex items-center justify-center rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200/80 p-2"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="absolute h-6 w-6 text-yellow-500 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 text-gray-800 dark:text-gray-300 transition-all duration-300 rotate-90 scale-0 dark:-rotate-0 dark:scale-100" />
        </button>
    )
}

export default ThemeButton