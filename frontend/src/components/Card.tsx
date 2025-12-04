
import { Text } from "../icons/Text"
import { Delete } from "../icons/Delete"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Info } from "../icons/Info"
import { Others } from "../icons/Others";

interface CardProps {
    title: string; // Title of the card, e.g., video or tweet title
    link: string; // Link to the content (YouTube or Twitter)
    type: string; // Type of the content
    contentId:string;
    refresh?:()=>void
}



// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
export function Card({ title, link, type,contentId,refresh}: CardProps) {


    // const [open,setOpen]=useState(false);

    function nthIndexOf(str:string,char:string,n:number):number{
        console.log(link," this is others link ");
        console.log("title is ",title);
        console.log(type," type is ")
        let index=-1;
        for(let i=0;i<n;i++){
            index=str.indexOf(char,index+1);
        }
       console.log("index ",index);
        return index;
       
    }

    async function updateit(){
        try{

            
        }
        catch(error){

        }
    }
    async function deleteit(){
       try{
         let response=await axios.post(`${BACKEND_URL}/api/v1/deleteContent`,{
            id:contentId
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        console.log(response); 
        refresh();

       }
       catch(error){
        console.log(error)
        alert("error in fe in deleteit fn")
       }

    }



    return (
        <div>
            {/* Card Container */}
            <div className="p-4 flex flex-col bg-white rounded-md border-gray-200 h-[350px] w-[300px]">
               
                <div className="flex justify-between">
                    {/* Left Section: Title with Icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2" onClick={updateit}>
                        
                            <Text />
                        </div>
                        {title}
                    </div>
                    {/* Right Section: Links with Icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            {/* Clickable Share Icon that opens the link */}
                            <a href={link}>
                                <Info />
                            </a>
                        </div>
                        <button className="text-gray-500 cursor-pointer" onClick={deleteit}>
                            {/* Placeholder for another Share Icon */}
                            <Delete />
                        </button>
                    </div>
                </div>

                {/* Content Section  href={link} target="_blank"*/}
                <div  className="pt-4 h-[1400px] overflow-hidden">
                    


                    {type === "youtube" && (
                        <div className="flex flex-col items-center text-xl">
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                        <div className="pt-4">{title}</div>
                        <div className="text-base text-gray-600 pt-2">
      
    </div>
                        </div>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                  {type === "github" && (() => {
  const url = link.trim();
  const parts = url.replace("https://github.com/", "").split("/");
  const username = parts[0];
  const repo = parts[1];

  const cardSrc = `https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}`;
  const fallbackImg = "https://cdn-icons-png.flaticon.com/512/25/25231.png"; // GitHub logo PNG

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img
        src={cardSrc}
        onError={(e) => (e.target.src = fallbackImg)}
        style={{
          width: "100%",
          maxWidth: "200px",
          border: "none",
          borderRadius: "10px",
          marginTop: "10px",
          display: "block"
        }}
        alt="GitHub Repository"
      />
    <div style={{ marginTop: "10px" }}>
      <strong>Owner:</strong> {username} <br />
      <strong>Repo:</strong> {repo}
    </div>
    </a>
  )
})()
    }

    {type==="others" &&(
        <div className="pl-3 pt-9"> 
        <Others websiteUrl={link.substring(0,nthIndexOf(link,"/",3))} />
       
        </div>
    )
    }
                </div>
            </div>
        </div>
    );
}