import React from 'react'
import Sidebar from '../../common/Sidebar/Sidebar';
import Navbar from'../../common/Navbar/Navbar'
import "./post.css"
import Postcontent from './Postcontent';
const Post=()=>{
    return(
        <div className="feedPage-div flex md:flex-row flex-col">
        <Sidebar/>
     
        <div className="flex navbar-feedcontent-div flex-col items-center">
        <Navbar/>
        <Postcontent/>
        
        </div>
            
            </div>
    )
}
export default Post;