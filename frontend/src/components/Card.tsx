import {ShareIcon} from "../icons/ShareIcon"
import { Text } from "../icons/Text"
import { Delete } from "../icons/Delete"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Info } from "../icons/Info"
interface CardProps {
    title: string; // Title of the card, e.g., video or tweet title
    link: string; // Link to the content (YouTube or Twitter)
    type: "twitter" | "youtube"; // Type of the content
    contentId:string;
    refresh:()=>void
}



// The Card component represents a styled card that can display either a YouTube video or a Twitter embed based on the type prop.
export function Card({ title, link, type,contentId,refresh}: CardProps) {

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
                {/* Header Section max-w-72 border min-h-72 min-w-72*/}
                <div className="flex justify-between">
                    {/* Left Section: Title with Icon */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            {/* Share Icon preceding the title */}
                            <Text />
                        </div>
                        {title}
                    </div>
                    {/* Right Section: Links with Icons */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            {/* Clickable Share Icon that opens the link */}
                            <a href={link} target="_blank">
                                <Info />
                            </a>
                        </div>
                        <button className="text-gray-500 cursor-pointer" onClick={deleteit}>
                            {/* Placeholder for another Share Icon */}
                            <Delete />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="pt-4 h-[1400px] overflow-hidden">
                    {/* Render YouTube embed if type is "youtube" */}
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
                        </div>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}