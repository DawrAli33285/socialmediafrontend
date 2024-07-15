import React from "react";

import Accountnavbar from "../../../common/Accountnavbar/Accountnavbar";

import Navbar from "../../../common/Navbar/Navbar";

import Reportcontent from "./Reportcontent";

const Report=()=>{
    return(
        <div className="connectiondataPage-div flex md:flex-row flex-col">
        
     
        <div className="flex navbar-feedcontent-div flex-col">
    
     {/* <Accountnavbar pagename={"Données de connexion"}/>
    
     
    <Navbar pagename={"Données de connexion"}/> */}
    <div style={{width:'100%',height:'100%',marginTop:'5rem'}} className="flex justify-center">
 <Reportcontent/>
    </div>
 
        </div>
            
            </div>
    )
}
export default Report;