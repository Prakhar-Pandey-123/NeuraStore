import type { ReactElement } from "react"

interface ButtonProps{
    text:string,
    variant:string,
    startIcon?:ReactElement,
    onClick?:()=>void,
    loading?:boolean,
    fullWidth?:boolean,
}
const variantClasses:any={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const defaultStyles=" px-4 py-2 rounded-md font-ligt flex items-center cursor-pointer"

export function Button({text,variant,startIcon,onClick,loading,fullWidth}:ButtonProps){
    return(
        <button onClick={onClick} className={variantClasses[variant] + " "+defaultStyles+ `${loading ? "opacity-45" :""}`+`${fullWidth?" w-full flex justify-center items-center":" "}`} disabled={loading}>

            <div className="pr-2">
            {startIcon}</div>
            {text}

        </button>
    )

}