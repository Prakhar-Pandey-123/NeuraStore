import { Logo } from "../icons/Logo"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { Button } from "./Button"
import { SidebarItem } from "./SidebarItem"
import { useNavigate } from "react-router-dom"
import { useContent } from "../hooks/useContent"
import { Github } from "../icons/Github"

interface SidebarProps{
    show:string
    setShow:(value:string)=>void
}

export function Sidebar({show,setShow}:SidebarProps){

    
    
    const {refresh}=useContent()
    const navigate=useNavigate()
        function logout(){
            localStorage.getItem("token")?localStorage.removeItem("token"):""
            navigate("/signin")
        }

        function clicked(item:string){
            if(show===item)
                 setShow("all")
            else setShow(item);
            refresh()
            // window.location.reload()
        }
//            useEffect(() => {
//     refresh();  
// }, [show]); 
    return(
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 flex flex-col gap-2">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-4 text-purple-600 pl-2">
                    <Logo></Logo>
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4 flex flex-col">
               <button onClick={()=>clicked("twitter") } className={`${show==="twitter"?"bg-gray-200 w-[192px] rounded-md":""} cursor-pointer` } >
                 <SidebarItem text="Twitter" icon={<TwitterIcon/>}></SidebarItem>
               
               </button>

               <button onClick={()=>clicked("youtube")} className={`${show==="youtube"?"bg-gray-200 w-[192px] rounded-md":""} cursor-pointer` }>
                <SidebarItem text="Youtube" icon={<YoutubeIcon/>}></SidebarItem>

               </button>

               <button onClick={()=>clicked("github")} className={`${
                show==="github"?"bg-gray-200 w-[192px] rounded-md":"" 
               }cursor-pointer` }>
                <SidebarItem text="Github" icon={<Github/>}>
                </SidebarItem>

               </button>
                

            </div><div className="pl-2 pt-4">
               <Button onClick={logout} variant="primary" text="Log Out">

               </Button>
            </div>
        </div>
    )
}