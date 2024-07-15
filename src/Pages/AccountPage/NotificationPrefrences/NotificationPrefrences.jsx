import React from "react";
import Accountnavbar from "../../../common/Accountnavbar/Accountnavbar";
import Navbar from "../../../common/Navbar/Navbar";
import "./notificationprefrences.css"
import NotificationPrefrencescontent from "./NotificationPrefrencescontent";
const NotificationPrefrences=()=>{
    return(
        <div className="notificationprefrencesPage-div flex md:flex-row flex-col">
        
     
        <div className="flex navbar-feedcontent-div flex-col">
    
     <Accountnavbar pagename={"Preferences des notifications"}/>
    
     
    <Navbar pagename={"Preferences des notifications"}/>
    <div style={{width:'100%',height:'100%'}} className="flex justify-center">
   <NotificationPrefrencescontent/>
    </div>
 
        </div>
            
            </div>
    )
}

export default NotificationPrefrences;