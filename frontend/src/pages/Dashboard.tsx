import {useState,useEffect} from "react"
import { useContent } from "../hooks/useContent";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModal } from "../components/CreateContentModal";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import axios from "axios"
import { BACKEND_URL } from "../config";
export function Dashboard(){
    const [modalOpen,setModalOpen]=useState(false);
    const {contents,refresh}=useContent()

    useEffect(()=>{
        refresh()
    },[modalOpen]);

    return(
        <div>
            <Sidebar></Sidebar>
            <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
                <CreateContentModal open={modalOpen} onClose={()=>setModalOpen(false)}></CreateContentModal>

                <div className="flex justify-end gap-4">
                {/* btn to open modal */}
                <Button onClick={()=>setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon/>}></Button>

                {/* btn to share the brain content*/}
                <Button onClick={async()=>{
                    const response =await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                        share:true
                    },{
                        headers:{
                            "Authorization":localStorage.getItem("token")
                        }
                    })
                    const shareUrl=`http://localhost:5173/share/${response.data.hash}`
                    alert(shareUrl)
                }} variant="secondary" text="Share brain" startIcon={<ShareIcon/>}>
                </Button>
                <div className="flex gap-4 flex-wrap">
                    {
                        contents.map(({type,link,title})=>(
                            <Card type={type}
                                link={link}
                                title={title}
                            >
                            </Card>
                        ))
                    }
                </div>
                </div>
            </div>
        </div>
    )

}