interface IButton {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg" | "xl";
    type: "submit" | "reset" | "button" | undefined,
    text: string,
    width: "auto" | "full",
    loading?: boolean,
    disabled?: boolean,
    onClick?: () => void
}

const variantStyles = {
    "primary": "bg-white text-black hover:bg-gray-200",
    "secondary": "bg-black text-white hover:bg-gray-950"
}

const sizeVariants = {
    "sm": "px-3.5 py-2",
    "md": "px-3.5 py-3",
    "lg": "md:px-4.5 px-3.5 md:py-3 py-2",
    "xl": "px-5 py-3",
}

const widthVariants = {
    "auto": "w-auto",
    "full": "w-full mt-4 m-auto"
}

const Button = ({ loading = false, ...props}: IButton) => {
    return (
        <button 
            onClick={props.onClick}
            type={props.type}
            className={`flex justify-center items-center gap-2 ${widthVariants[props.width]} ${sizeVariants[props.size]} ${variantStyles[props.variant]} bg- text-lg rounded-lg ${props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            { props.text }
        </button>
    )
}

export default Button