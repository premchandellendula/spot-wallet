interface IButton {
    variant: "primary" | "secondary" | "special",
    size: "xs" | "sm" | "md" | "lg" | "xl";
    type: "submit" | "reset" | "button" | undefined,
    text: string,
    width: "auto" | "full",
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void
}

const variantStyles = {
    "primary": "dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-950",
    "secondary": "text-black bg-gray-200 border border-gray-300 dark:border-gray-900 dark:text-white dark:bg-black dark:hover:bg-gray-950 hover:bg-gray-300/70",
    "special": "bg-red-600 text-white hover:bg-red-500"
}

const sizeVariants = {
    "xs": "px-3 py-1.5 text-sm",
    "sm": "px-3.5 py-2",
    "md": "px-3.5 py-3",
    "lg": "md:px-4.5 px-3.5 md:py-3 py-2",
    "xl": "px-5 py-3",
}

const widthVariants = {
    "auto": "w-auto",
    "full": "w-full mt-2 m-auto"
}

const Button = ({ loading = false, ...props}: IButton) => {
    return (
        <button 
            onClick={props.onClick}
            type={props.type}
            className={`flex justify-center items-center gap-2 ${widthVariants[props.width]} ${sizeVariants[props.size]} ${variantStyles[props.variant]} text-lg rounded-lg ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            { props.text }
        </button>
    )
}

export default Button