import React from 'react'
import Navbar from '../../common/Navbar/Navbar';
import Sidebar from '../../common/Sidebar/Sidebar';
import "./messenger.css"
import Messengercontent from './Messengercontent';
const Messenger=()=>{
return(
    <div className="feedPage-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar pagename="Messagerie"/>
   <Messengercontent/>
    
    </div>
        
        </div>
)


}

export default Messenger;