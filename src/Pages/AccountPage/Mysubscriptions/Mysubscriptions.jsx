import React from "react";
import "./mysubscriptions.css"
import Sidebar from '../../../common/Sidebar/Sidebar';
import Navbar from'../../../common/Navbar/Navbar'
import Mysubscriptioncontent from "./Mysubscriptioncontent";

const Mysubscriptions=()=>{
    return(
        <div className="mysubscriptionsPage-div flex md:flex-row flex-col">
        <Sidebar/>
     
        <div className="flex navbar-feedcontent-div flex-col items-center">
        <Navbar pagename={"Mon compte"}/>
    <Mysubscriptioncontent/>
        </div>
            
            </div>
    )
}
export default Mysubscriptions;