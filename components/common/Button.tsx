import { Button as Btn } from '@radix-ui/themes'
import { MouseEventHandler } from 'react'
import { RiLoaderLine as Loader } from 'react-icons/ri'

interface ButtonProps {
    text: string | JSX.Element
    icon: JSX.Element | null
    loading: boolean
    disabled: boolean
    onClick: MouseEventHandler<HTMLButtonElement> | undefined
}

const Button = ({ text, loading = false, disabled, onClick }: ButtonProps) => {
    return (
        <Btn className="mt-4 text-white p-2 py-4 rounded-md cursor-pointer hover:bg-hover w-full text-center button-default bg-black font-semibold submit-btn" disabled={disabled} onClick={onClick}>
            {!loading ? text : <Loader className="spinner" />}
        </Btn>
    )
}

export default Button