import Navbar from "../../common/Navbar/Navbar";
import React from "react";
import Sidebar from "../../common/Sidebar/Sidebar";
import './chatpage.css'
import './audiocall.css'
import Chatcontent from "./Chatcontent";
import { useLocation } from "react-router-dom";
import Audiocall from "./Audiocall";
const Chatpage=()=>{
    
    const location=useLocation();
    React.useEffect(()=>{
const search=location.search
const params=new URLSearchParams(search)
const audio=params.get('audio_call')
if(audio){
    setIsAudioCall(true)
}
    },[])
    const [isAudioCall,setIsAudioCall]=React.useState(false)
    return(
        <div className="chatPage-div flex md:flex-row flex-col">
    {isAudioCall&&(
            <Audiocall setEndCall={isAudioCall}/>
    )}
        <Sidebar/>
     
        <div className="flex navbar-feedcontent-div flex-col items-center">
        <Navbar/>
        
    <Chatcontent isAudioCall={isAudioCall} setIsAudioCall={setIsAudioCall}/>
        </div>
            
            </div>
    )
}
export default Chatpage;