import EntryNavbar from "../../common/EntryNavbar/EnterNavbar";
import React from "react";
import './css/landingpage.css'
import Sectionone from "./sections/Sectionone";
import Sectiontwo from "./sections/Sectiontwo";
import Sectionthree from "./sections/Sectionthree";
import Sectionfour from "./sections/Sectionfour";
import Sectionfive from "./sections/Sectionfive";
import Lastsection from "./sections/Lastsection";
import EntryMobileFooter from "../../common/EntryMobileFooter/EntryMobileFooter";
import EntryLaptopFooter from "../../common/EntryLaptopFooter/EntryLaptopFooter";
const LandingPage=()=>{
    return(
<div className="landing-page flex flex-col">
<EntryNavbar></EntryNavbar>
<div className="landingpage-content">
<Sectionone></Sectionone>
<Sectiontwo></Sectiontwo>
<Sectionthree></Sectionthree>
<Sectionfour></Sectionfour>
<Sectionfive></Sectionfive>
<Lastsection></Lastsection>
<EntryMobileFooter></EntryMobileFooter>
<EntryLaptopFooter></EntryLaptopFooter>
</div>
</div>
    )
}
export default LandingPage;