import React from 'react'
import Sidebar from '../../common/Sidebar/Sidebar';
import Navbar from'../../common/Navbar/Navbar'
import "./notifications.css"
import Notificationscontent from './Notificationscontent';

const Notifications=()=>{
    return(
        <div className="feedPage-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar pagename={"Notifications"}/>
    <Notificationscontent/>
    
    </div>
        
        </div>
    )
}
export default Notifications;