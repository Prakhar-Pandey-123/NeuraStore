import {useNavigate} from "react-router-dom"
import {useRef} from "react"
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import {BACKEND_URL} from "../config"


export function Signin(){

    const navigate=useNavigate()
const usernameRef=useRef<HTMLInputElement>(null)
const passwordRef=useRef<HTMLInputElement>(null);

    async function signin(){
        const username=usernameRef.current?.value;
        // console.log(username.current);
        const password=passwordRef.current?.value;
       const response =await axios.post(BACKEND_URL+'/api/v1/signin',{
        username,
        password
       })

       const jwt=response.data.token;
       localStorage.setItem("token",jwt);
       navigate("/signin");
       alert("you have signed up");
    }

    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                {/* input for username */}
                <Input reference={usernameRef}
                placeholder="Username"></Input>

                <Input reference={passwordRef} placeholder="Password"></Input>

                <div className="flex justify-center pt-4">

                    <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true}></Button>

                </div>
            </div>
        </div>
    )
}