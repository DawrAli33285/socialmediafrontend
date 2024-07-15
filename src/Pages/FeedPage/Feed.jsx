import React from 'react'
import Sidebar from '../../common/Sidebar/Sidebar';
import Navbar from'../../common/Navbar/Navbar'
import "./feed.css";
import Feedcontent from './Feedcontent';
import AudioPlayer from './AudioPlayer';

const Feed=()=>{
    return(
        <div className="feedPage-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar/>
    <Feedcontent/>
    
    </div>
        
        </div>
    )
}
export default Feed;