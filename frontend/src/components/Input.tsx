interface InputProps{
    placeholder:string,
    reference?:any
}
export function Input({placeholder,reference}:InputProps){
    return(
        // reference=usernameRef,passwordRef
        <div>
            <input 
                ref={reference}
                placeholder={placeholder}
                type={"text"}
                className="px-2 py-2 border rounded m-2"
            >
            </input>
        </div>
    )
}