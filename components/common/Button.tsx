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
        <button className="button-default py-2.5 font-open-sans text-base font-semibold submit-btn" disabled={disabled} onClick={onClick}>
            {!loading ? text : <Loader className="spinner" />}
        </button>
    )
}

export default Button