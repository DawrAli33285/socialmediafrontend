import React from 'react'
import Sidebar from '../../../common/Sidebar/Sidebar';
import Navbar from'../../../common/Navbar/Navbar'
import "./account.css";
import Accountcontent from './Accountcontent';
const Account=()=>{
    return(
        <div className="accountPage-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar pagename={"Mon compte"}/>
 
    <Accountcontent/>
    </div>
        
        </div>
    )
}
export default Account;