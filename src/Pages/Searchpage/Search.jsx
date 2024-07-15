import React from 'react'
import Sidebar from '../../common/Sidebar/Sidebar';
import Navbar from'../../common/Navbar/Navbar'
import "./search.css";
import Searchcontent from './Searchcontent';

const Search=()=>{
    const [searchfilter,setSearchFilter]=React.useState("Createur")
    return(
        <div className="feedPage-div flex md:flex-row flex-col">
    <Sidebar/>
 
    <div className="flex navbar-feedcontent-div flex-col items-center">
    <Navbar searchfilter={searchfilter} pagename="Recherche"/>
   <Searchcontent searchfilter={searchfilter}
   setSearchFilter={setSearchFilter}/>
    
    </div>
         
        </div>
    )
}
export default Search;