import {forwardRef} from "react"

interface InputProps{
    placeholder:string,
    type?:string
}

export const Input=forwardRef<HTMLInputElement,InputProps>(({placeholder,type="text"},ref) =>{
    return(
        <div>
            <input 
                ref={ref}
                placeholder={placeholder}
                type={type}
                className="px-2 py-2 border rounded m-2 w-full"
            >
            </input>
            </div>
    )
})
Input.displayName="Input"


// import {forwardRef} from "react"

// interface InputProps{
//     placeholder:string,
//     reference?:any
// }
// export function Input({placeholder,reference}:InputProps){
//     return(
//         // reference=usernameRef,passwordRef
//         <div>
//             <input 
//                 ref={reference}
//                 placeholder={placeholder}
//                 type={"text"}
//                 className="px-2 py-2 border rounded m-2"
//             >
//             </input>
//         </div>
//     )
// }