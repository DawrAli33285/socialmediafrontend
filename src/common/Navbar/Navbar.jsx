import "./navbar.css"
import React from 'react' 
import store from '../../redux/store/store'
import { useDispatch } from "react-redux"
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { searchByUsername,searchByTag } from "../../redux/slices/postSlices"
import { Link } from "react-router-dom"
const Navbar=({pagename,searchfilter})=>{
    const [user,setUser]=React.useState()
    const [search,setSearch]=React.useState("")
    const dispatch=useDispatch();
React.useEffect(()=>{
    setUser(store.getState().authenticationslices?.user?.user);

        // Subscribe to store changes
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authenticationslices?.user?.user);
        });

        // Unsubscribe from the store changes when the component unmounts
        return () => unsubscribe();
},[])

const fetchSearch=async()=>{
if(searchfilter=="Createur"){
    let res=await dispatch(searchByUsername(search))
if(searchByUsername.rejected.match(res)){

    toastr.error(res.payload.error)
}
if(searchByUsername.fulfilled.match(res)){
 
    setSearch('')
}
}else{
    let res=await dispatch(searchByTag(search))
if(searchByTag.rejected.match(res)){

    toastr.error(res.payload.error)
}
if(searchByTag.fulfilled.match(res)){
 
    setSearch('')
}
}
}

    return(
        <div  className={pagename=="Account" || pagename=="Choix de l’abonnement" || pagename=="Données de connexion" || pagename=="Historique d’achats" || pagename=="Preferences des notifications" || pagename=="Informations personnelles"?"hide-navbar-account navbar-div relative md:flex-row flex flex-col justify-center items-center":'navbar-div relative md:flex-row flex flex-col justify-center items-center'}>
      
    {pagename!='creator' ?<div style={pagename?.toString() === "Choix de l’abonnement" || pagename=="Informations personnelles" || pagename=="Preferences des notifications" || pagename=="Données de connexion" ? { display: 'none' } : {}} className="pagename-search relative">
<p className="hidden md:block">{pagename}</p>
       {pagename=='Mon compte'?'':<div style={{marginTop:'1rem',position:'absolute !important'}} className="navbarsearch-div md:flex md:flex-row hidden">
         <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Recherche">
         </input>
         <svg className="cursor-pointer" onClick={fetchSearch} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z" fill="white"/>
</svg>


        </div>}
    </div>:pagename!='creator'?<div className="navbarsearch-div md:flex md:flex-row hidden">
    <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Recherche">
         </input>
         <svg className="cursor-pointer" onClick={fetchSearch} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z" fill="white"/>
</svg>


        </div>:<div className="hidden md:flex flex-row space-x-3">
  <Link to='/search' className="flex flex-row space-x-3">
  <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66046 20.9999C9.41322 21.0007 9.16894 20.9512 8.94557 20.8552C8.72219 20.7591 8.52539 20.619 8.36964 20.4449L0.37647 11.4458C0.133064 11.1774 0 10.8408 0 10.4934C0 10.146 0.133064 9.80935 0.37647 9.54098L8.65097 0.541827C8.93187 0.235531 9.33552 0.0429128 9.77312 0.00634665C10.2107 -0.0302195 10.6464 0.0922618 10.9844 0.346846C11.3223 0.601429 11.5349 0.967262 11.5752 1.36386C11.6156 1.76047 11.4804 2.15535 11.1995 2.46165L3.80211 10.5009L10.9513 18.5401C11.1536 18.7603 11.2822 19.0284 11.3217 19.3127C11.3612 19.597 11.3101 19.8856 11.1743 20.1443C11.0385 20.4031 10.8237 20.6212 10.5555 20.7728C10.2872 20.9244 9.9766 21.0032 9.66046 20.9999Z" fill="white"/>
</svg>

<p>
Retour
</p>
  </Link>
            </div>}

      



        <div className="navbar-button-profile-div relative flex flex-row">
<div className="navbar-mobile-menu flex md:hidden">
    {pagename=='Informations personnelles'?<Link to='/account'>
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.14034 15.5217C6.9576 15.5222 6.77705 15.4857 6.61194 15.4147C6.44684 15.3437 6.30138 15.2401 6.18625 15.1115L0.27826 8.45994C0.0983519 8.26157 0 8.01276 0 7.75598C0 7.49921 0.0983519 7.25039 0.27826 7.05203L6.39419 0.400481C6.60182 0.174088 6.90017 0.0317181 7.22361 0.004691C7.54705 -0.0223361 7.86909 0.0681935 8.11889 0.256364C8.36868 0.444535 8.52577 0.714933 8.55559 1.00807C8.58541 1.30121 8.48552 1.59308 8.2779 1.81948L2.81026 7.76153L8.09442 13.7036C8.244 13.8663 8.33901 14.0644 8.36822 14.2746C8.39743 14.4847 8.35961 14.698 8.25924 14.8893C8.15887 15.0806 8.00015 15.2418 7.80186 15.3538C7.60357 15.4659 7.37401 15.5241 7.14034 15.5217Z" fill="white"/>
</svg>

    </Link>:<svg width="20" height="21" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="37" height="2.75" rx="1.375" fill="white"/>
<rect y="9.625" width="37" height="2.75" rx="1.375" fill="white"/>
<rect y="19.25" width="37" height="2.75" rx="1.375" fill="white"/>
</svg>}

</div>

<button className="become-btnnavbar">
Devenir créateur
</button>
<div className="navbar-profile flex flex-row">
{pagename=='Recherche' || pagename=='creator'?``:<div className="navbar-avatar">
<img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"></img>
</div>}
<div className="navbar-name flex-col">
<h3>{user?.username}</h3>
<span>Utilisateur</span>
</div>
</div>
        </div>
        
        {pagename=='creator' || pagename!="Mon compte"?<p className="block md:hidden mobile-titlenav" style={{fontSize:'1.5rem'}}>
        {pagename}
        </p>:<>
        {pagename=='Recherche' || pagename=='messagerie' || pagename=="Notifications"?<p style={{fontSize:'1.2rem'}} className="block md:hidden">
          {pagename}
        </p>:''}
        {pagename=='Données de connexion' || pagename!="Mon compte" || pagename=="Historique d’achats" || pagename=="Mon compte" || pagename=="Informations personnelles" || pagename=="Preferences des notifications"?<p className="md:hidden" style={{fontSize:'1.3rem'}}>{pagename}</p>:<div className="navbarsearch-div  md:hidden flex">
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Recherche">
         </input>
         <svg className="cursor-pointer" onClick={fetchSearch} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6714 18.5942L15.8949 14.8287C17.1134 13.2764 17.7745 11.3595 17.7721 9.38603C17.7721 7.62854 17.2509 5.91052 16.2745 4.44922C15.2981 2.98792 13.9103 1.84897 12.2866 1.17641C10.6629 0.50385 8.87617 0.327877 7.15245 0.670746C5.42873 1.01362 3.84539 1.85993 2.60266 3.10266C1.35993 4.34539 0.513616 5.92873 0.170746 7.65245C-0.172123 9.37617 0.00385015 11.1629 0.676412 12.7866C1.34897 14.4103 2.48792 15.7981 3.94922 16.7745C5.41052 17.7509 7.12854 18.2721 8.88603 18.2721C10.8595 18.2745 12.7764 17.6134 14.3287 16.3949L18.0942 20.1714C18.1974 20.2755 18.3203 20.3582 18.4556 20.4146C18.591 20.471 18.7362 20.5 18.8828 20.5C19.0294 20.5 19.1746 20.471 19.31 20.4146C19.4453 20.3582 19.5682 20.2755 19.6714 20.1714C19.7755 20.0682 19.8582 19.9453 19.9146 19.81C19.971 19.6746 20 19.5294 20 19.3828C20 19.2362 19.971 19.091 19.9146 18.9556C19.8582 18.8203 19.7755 18.6974 19.6714 18.5942ZM2.22151 9.38603C2.22151 8.06791 2.61238 6.7794 3.34468 5.68342C4.07699 4.58745 5.11785 3.73324 6.33563 3.22882C7.55341 2.72439 8.89342 2.59241 10.1862 2.84957C11.479 3.10672 12.6665 3.74145 13.5986 4.6735C14.5306 5.60555 15.1653 6.79306 15.4225 8.08585C15.6796 9.37864 15.5477 10.7186 15.0432 11.9364C14.5388 13.1542 13.6846 14.1951 12.5886 14.9274C11.4927 15.6597 10.2041 16.0505 8.88603 16.0505C7.11849 16.0505 5.42334 15.3484 4.1735 14.0986C2.92366 12.8487 2.22151 11.1536 2.22151 9.38603Z" fill="white"/>
</svg>

        </div>}
    
        </>
        }
        </div>
    )
}
export default Navbar;