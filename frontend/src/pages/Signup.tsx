import {useNavigate} from "react-router-dom"
import {useRef} from "react"
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import {BACKEND_URL} from "../config"


export function Signup(){

    const navigate=useNavigate()
const usernameRef=useRef<HTMLInputElement>(null)
const passwordRef=useRef<HTMLInputElement>(null);

    async function signup(){
        const username=usernameRef.current?.value;
        // console.log(username.current);
        const password=passwordRef.current?.value;
        try{
             await axios.post(BACKEND_URL+'/api/v1/signup',{
        username,
        password
       })
       navigate("/signin");
       alert("you have signed up");

        }
        catch(error:any){
            console.log(error)
            alert(error)
        }
    }

    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                {/* input for username */}
                <Input ref={usernameRef}
                placeholder="Username"></Input>

                <Input ref={passwordRef} placeholder="Password"></Input>

                <div className="flex justify-center pt-4">

                    <Button onClick={signup} loading={false} variant="primary" text="Signup" fullWidth={true}></Button>

                </div>
            </div>
        </div>
    )

}