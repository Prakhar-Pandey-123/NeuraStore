import { Dashboard } from "./Dashboard"
import { Signup } from "./Signup";
export function Home(){
    let token=localStorage.getItem("token");
    // localStorage.removeItem("token")
   
    return(
         <div>
       { token!==null ? <Dashboard></Dashboard>:<Signup></Signup>}
        </div>
    )
}