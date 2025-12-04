import { useParams } from "react-router-dom"
import {useEffect} from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import {Card} from "../components/Card"
import { Sidebar } from "../components/Sidebar";
import {useState} from "react"

export function Content(){
    const [content,setContent]=useState([]);
const [username,setUsername]=useState(null);
      const {hash}=useParams()
        console.log("hash is",hash);

        const [show,setShow]=useState("all");

    useEffect(()=> {
        async function getContent(){
            const response =await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
            console.log("response is",response);
        setContent(response.data.content);
        setUsername(response.data.username)
        }
        getContent()
    },[hash])
    console.log("content is",content);
  
  
    return(
        <div>
          <Sidebar show={show} setShow={setShow}></Sidebar>
            <div className="w-max mx-auto text-2xl italic pt-4 pb-6 font-bold">You are seeing  {username} 's brain</div>
        <div className="flex gap-4 flex-wrap ">
            {content
            .map(({ type, link, title, _id }) => (
              <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                contentId={_id}
              />
            ))
          }             
         </div>
         </div>
    )
} 