import type { ReactElement } from "react"

interface ButtonInterface{
    title:string,
    size:"lg" | "sm" | "md",
    startIcon?:ReactElement,
    endIcon?:ReactElement,// ? means its not necessary, reactElement means it can be an div or some element
    variant:"primary"| "secondary"
}
const sizeStyles={
    "lg":"px-8 py-4 text-xl rounded-xl",
    "sm":"px-4 py-2 text-sm rounded-sm",
    "md":"px-2 py-1 text-md rounded-md",
}
// sizeStyles.lg === sizeStyles["lg"]


const variantStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-400 text-purple-600"
}

export function Button(props:ButtonInterface){
    return (<button className={sizeStyles[props.size] +" " + variantStyles[props.variant]}   
    >
        <div className="flex items-center">
           
            {props.startIcon}
             <div className="pl-2 pr-2">
                  {props.title}
             </div>
      
        {props.endIcon}

        </div> 
        
    </button>)
}