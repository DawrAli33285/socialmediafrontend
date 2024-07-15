import React from "react";
import "./connectiondata.css"
import Accountnavbar from "../../../common/Accountnavbar/Accountnavbar";

import Navbar from "../../../common/Navbar/Navbar";
import Connectiondatacontent from "./Connectiondatacontent";

const Connectiondata=()=>{
    return(
        <div className="connectiondataPage-div flex md:flex-row flex-col">
        
     
        <div className="flex navbar-feedcontent-div flex-col">
    
     <Accountnavbar pagename={"Données de connexion"}/>
    
     
    <Navbar pagename={"Données de connexion"}/>
    <div style={{width:'100%',height:'100%'}} className="flex justify-center">
  <Connectiondatacontent/>
    </div>
 
        </div>
            
            </div>
    )
}
export default Connectiondata;