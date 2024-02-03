import { MouseEventHandler } from 'react'
import { RiLoaderLine as Loader } from 'react-icons/ri'

interface ButtonProps {
    text: string | JSX.Element
    loading: boolean
    disabled: boolean
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({ text, loading = false, disabled, onClick }: ButtonProps) => {
    return (
        <button className="mt-4 text-white p-2 py-4 rounded-md cursor-pointer hover:bg-hover w-full text-center button-default bg-buttons font-semibold submit-btn" disabled={disabled} onClick={onClick}>
            {!loading ? text : <Loader className="spinner" />}
        </button>
    )
}

export default Button