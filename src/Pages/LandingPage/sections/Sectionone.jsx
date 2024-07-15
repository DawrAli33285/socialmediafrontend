import React from "react";
import { Link,useNavigate } from "react-router-dom";
const Sectionone=()=>{
    const navigate=useNavigate();
    return(
        <div className="sectionone-contentone">
           
<div className="sectionone-div flex flex-col">
        <h2>Rapprochez vous de vos créateurs de contenus préférés</h2>
        <p className="text-center">Une opportunité unique d'établir des relations véritables avec les créateurs de contenu que vous aimez.</p>
       <div className="sectionone-buttons hidden md:flex flex-row">

<button onClick={()=>navigate('/register')}>S’inscrire</button>

<button onClick={()=>navigate('/login')}>Se connecter</button>
       </div>
        </div>
        <div className="sectionone-divtwo flex flex-row justify-center items-center">
            <img src="/Group 41.png"></img>
        </div>
        <div className="sectionone-mobilebuttons flex md:hidden flex-col">
<button>S’inscrire</button>
<button>Se connecter</button>
        </div>
        </div>
    )
}
export default Sectionone;