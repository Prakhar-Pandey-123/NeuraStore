import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function Home(){
    // a hook cannot be defined inside another hook ,like we cant do navigate=useNaviagte() inside useEffect
    console.log("home rendererd");
    let navigate=useNavigate()
    useEffect(()=>{

        const token=localStorage.getItem("token")?localStorage.getItem("token"):null;
                console.log(token)

        if(!token || token===null) navigate("/signin");
        else navigate("/dashboard")
    },[]);
    return(
         <div>
        </div>
    )
}