import { Link } from "react-router-dom";
import React from "react";
import './entrynavbar.css'
const EntryNavbar=()=>{
       const [toggleClicked,setToggleClicked]=React.useState(false)

const mobilenavbrtoggle=()=>{
       setToggleClicked(!toggleClicked)

       document.querySelector('.mobile-navbar-toggle').classList.toggle('mobile-navbar-toggle-active')
      

}
       return(
           <>
   <div className="flex flex-row entrynavbar">

       <div className="entrynavbar-logo">
<Link to='/'>
<img src='/image_with_black_bg_preserve_text_icon.png'></img>
</Link>
       </div>
<div className="entrynavbar-linkspc md:flex md:flex-row hidden">
<p>Les créateurs</p>
<p>Abonnements</p>
<p>Devenir créateur</p>
       </div>
       <div className="entrynavbar-lastsection flex flex-row">
<p className="md:block hidden">
<Link to='/login'>
Connexion
</Link>
</p>
<button>
<p>

<Link to='/register'>
Inscription
</Link>
</p>
</button>

<svg onClick={mobilenavbrtoggle} className="md:hidden" width="21" height="17" viewBox="0 0 31 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.900024" y="0.400146" width="30" height="2" rx="1" fill="white"/>
<rect x="0.900024" y="7.40015" width="30" height="2" rx="1" fill="white"/>
<rect x="0.900024" y="14.4001" width="30" height="2" rx="1" fill="white"/>
</svg>

       </div>
       
   </div>
<div className="mobile-navbar-toggle md:hidden flex flex-col justify-center items-center">
<p>Les créateurs</p>
<p>Abonnements</p>
<p>
Devenir créateur</p>
<p>Connexion</p>
           </div>
           </>
    )
}
export default EntryNavbar;