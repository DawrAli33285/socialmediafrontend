import React from 'react'
import Sidebar from '../../common/Sidebar/Sidebar';
import Navbar from'../../common/Navbar/Navbar'
import "./creatorprofile.css";
import CreatorProfilecontent from './CreatorProfilecontent';
const CreatorProfile=()=>{
    return(
        <div className="creatorProfile-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar pagename="creator"/>
 <CreatorProfilecontent/>
    </div>
        
        </div>
    )
}
export default CreatorProfile;