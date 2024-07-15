import React from "react";
import "./accountnavbar.css"
import { Link } from "react-router-dom";
const Accountnavbar=({pagename})=>{
    return(
        <div className="flex flex-row py-7 px-14 hidden md:flex">
<div className="account-navbarlogo flex flex-row space-x-2">
{pagename!='Informations personnelles'?<img src="https://res.cloudinary.com/dbjwbveqn/image/upload/v1703879452/image_15-removebg-preview_1_ucf6sl.png"/>
:<>
<Link to='/account'>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L5 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</Link>
<p>Retour</p>
</>}


</div>
<div className="flex flex-row account-navbarlastdiv">
    <p className="account-navbarpagename">
{pagename}
    </p>

    <button className="become-btnnavbar">
Devenir créateur
</button>
<div className="flex flex-col">
<p>Jane Aniston</p>
<p style={{color:'#828282'}}>Utilisateur </p>
</div>
</div>
        </div>
    )
}


export default Accountnavbar;