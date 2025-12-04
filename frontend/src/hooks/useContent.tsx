import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
interface contentsInterface{
    _id:string,
    type:string,
    link:string,
    title:string
}
export function useContent(){
    const [contents,setContents]=useState<contentsInterface[]>([]);

    // const refresh=useCallback(()=>{
    //     const token=localStorage.getItem("token")
    //     if(!token) return;
    //     axios.post(`${BACKEND_URL}/api/v1/getContent`,{},{
    //         headers:{
    //             Authorization:token
    //         }
    //     }).then(res=>setContents(res.data.content)).catch(err=>console.log("error in fe to fetch content",err))
    // },[])

    function refresh(){
       axios.post(`${BACKEND_URL}/api/v1/getContent`,{
       },{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
       }).then((response)=>{
        console.log("response of content apifrom fe",response.data.content);
        setContents(response.data.content);
       }).catch((error)=>{
        console.log("error in fetching content in fe",error)
       })
    }

    // useEffect(()=>{
    //     refresh()
    // },[])

    return {contents,refresh,setContents};
}
