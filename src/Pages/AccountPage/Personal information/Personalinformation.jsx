import React from "react";
import Accountnavbar from "../../../common/Accountnavbar/Accountnavbar";
import Navbar from "../../../common/Navbar/Navbar";
import "./personalinformation.css"
import Personalinformationcontent from "./Personalinformationcontent";
const Personalinformation=()=>{
    return(
        <div className="personalinformationPage-div flex md:flex-row flex-col">
    <div className="flex navbar-feedcontent-div flex-col">
    
    <Accountnavbar pagename={"Informations personnelles"}/>
   
    
   <Navbar pagename={"Informations personnelles"}/>
   <div style={{width:'100%',height:'100%'}} className="flex justify-center">
  <Personalinformationcontent/>
   </div>

       </div>
        </div>
    )
}
export default Personalinformation