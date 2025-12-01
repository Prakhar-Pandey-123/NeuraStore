import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Input } from "./Input";
import { Button } from "./Button";
import { CrossIcon } from "../icons/CrossIcon";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter",
    Github="github"
}

interface CreateContentModalProps{
    open:boolean,
    onClose:()=>void
}

export function CreateContentModal({open,onClose}:CreateContentModalProps){
    const titleRef=useRef<HTMLInputElement>(null)
    const linkRef=useRef<HTMLInputElement>(null);

    const [type,setType]=useState(ContentType.Youtube);
    async function addContent(){
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/createContent`,{
            link,title,type
        },{
            headers:{
                "Authorization":localStorage.getItem("token")|| ""
            }
        })
        onClose()
    }
    return(
        <div>
            {
                open && (
                    <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center ">
                    </div>
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center ">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed rounded-lg">
                                {/*close btn*/}
                            <div className="flex justify-center flex-end">
                                <div onClick={onClose} className="cursor-pointer ml-auto  ">
                                    <CrossIcon></CrossIcon>
                                </div>
                            </div>
                            {/*input fields*/}
                            <div>

                            <Input ref={titleRef} placeholder="Title"></Input>

                            <Input placeholder="Link" ref={linkRef}>
                            </Input>
                            </div>
                            <div>
                                <h1 className="font-semibold pl-1 pb-2 ">Type</h1>
                                <div className="flex gap-1 justify-center pb-2">
                                <Button text="Youtube"
                                    variant={type===ContentType.Youtube?"primary":"secondary"}
                                    onClick={()=>setType(ContentType.Youtube)}>
                                </Button>
                                
                                <Button 
                                text="Twitter"
                                variant={type===ContentType.Twitter?"primary":"secondary"}
                                onClick={()=>setType(ContentType.Twitter)}
                                >
                                </Button>
                                <Button text="Github" variant={type===ContentType.Github?"primary":"secondary"} onClick={()=>setType(ContentType.Github)}>

                                </Button>

                                </div>
                            </div>
                            {/*submit button */}
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant="primary" text="Submit"></Button>

                            </div>
                            </span>

                        </div>

                    </div>
                    </div>
                )
            }
        </div>
    )

}