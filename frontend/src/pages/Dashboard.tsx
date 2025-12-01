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
    const [show,setShow]=useState("all");
   
    const [modalOpen,setModalOpen]=useState(false);
    const {contents,refresh}=useContent()
    

    useEffect(()=>{
        refresh()
    },[modalOpen]);

           useEffect(() => {
            refresh()
}, [show]);

    return(
        <div>
            <Sidebar show ={show} setShow={setShow}></Sidebar>
           
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
                    const shareLink=`http://localhost:5173/brain/${response.data.hash}`
                    
                    alert(shareLink);
                }} variant="secondary" text="Share brain" startIcon={<ShareIcon/>}>
                </Button>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {contents
    .filter(item => show === "all" ? true : item.type === show)
    .map(({ type, link, title, _id }) => (
      <Card
        key={_id}
        type={type}
        link={link}
        title={title}
        contentId={_id}
        refresh={refresh}
      />
    ))
  }
                 
                </div>
              
                </div>
            </div>
       
    )

}