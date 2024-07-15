import React from "react";
import "./purchasehistory.css"
import Accountnavbar from "../../../common/Accountnavbar/Accountnavbar";
import Purcasehistorycontent from "./Purchasehistorycontent";
import Navbar from "../../../common/Navbar/Navbar";
const Purcasehistory=()=>{
    return(
        <div className="purchasehistoryPage-div flex md:flex-row flex-col">
        
     
        <div className="flex navbar-feedcontent-div flex-col">
    
     <Accountnavbar pagename={"Historique d’achats"}/>
    
     
    <Navbar pagename={"Historique d’achats"}/>
    <div style={{width:'100%',height:'100%'}} className="flex justify-center">
    <Purcasehistorycontent/>
    </div>
 
        </div>
            
            </div>
    )
}
export default Purcasehistory;