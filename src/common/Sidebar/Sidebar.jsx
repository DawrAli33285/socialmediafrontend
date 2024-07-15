import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./sidebar.css"
const Sidebar=()=>{
  React.useEffect(()=>{
toggleSidebar();
  },[])
const navigate=useNavigate();

  const toggleSidebar = () => {
    let sidebarul = document.querySelector('.sidebar-ul');
    let sidebarli = sidebarul.children;
  let currentUrl=window.location.toString();
if(currentUrl.includes('feed')){
sidebarli[0].classList.add('sidebar-div-active')
}else if(currentUrl.includes('chat') || currentUrl.includes('messenger')){
  sidebarli[1].classList.add('sidebar-div-active')
}else if(currentUrl.includes('notifications')){
  sidebarli[4].classList.add('sidebar-div-active')
}else if(currentUrl.includes('search') || currentUrl.includes('creator')){
  sidebarli[2].classList.add('sidebar-div-active')
}else if(currentUrl.includes('account')){
  sidebarli[5].classList.add('sidebar-div-active')
}
  
 
  }
    return(
        <div className="sidebar-div hidden md:flex md:flex-col items-center p-5">
    <img className="sidebar-logo" src="https://res.cloudinary.com/dbjwbveqn/image/upload/v1703879452/image_15-removebg-preview_1_ucf6sl.png"></img>
       <ul className="sidebar-ul">
<li>

<span>
<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.8 19V12.2941H13.2V19H18.7V10.0588H22L11 0L0 10.0588H3.3V19H8.8Z" fill="white"/>
</svg>
<Link to='/feed'>
Accueil
</Link>
</span>

</li>
<li>
    <span>
    <svg width="22" height="19" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 7.55143L22.9545 0.514286C22.5141 0.183955 21.9793 0.00368662 21.4288 0H2.57161C2.0211 0.00368662 1.48631 0.183955 1.0459 0.514286L12.0002 7.55143Z" fill="white" fill-opacity="0.85"/>
<path d="M12.4629 9.29142L12.3171 9.35999H12.2486C12.1696 9.39525 12.0858 9.41837 12 9.42856C11.9289 9.43753 11.8569 9.43753 11.7857 9.42856H11.7171L11.5714 9.35999L0.0857142 1.93713C0.0308384 2.14417 0.00204403 2.35725 0 2.57142V14.5714C0 15.2534 0.270918 15.9075 0.753154 16.3897C1.23539 16.8719 1.88944 17.1428 2.57143 17.1428H21.4286C22.1106 17.1428 22.7646 16.8719 23.2468 16.3897C23.7291 15.9075 24 15.2534 24 14.5714V2.57142C23.998 2.35725 23.9692 2.14417 23.9143 1.93713L12.4629 9.29142Z" fill="white" fill-opacity="0.85"/>
</svg>

<Link to='/messenger'>
Messagerie
</Link>
    </span>


</li>

<li>
<span>
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.6714 18.0942L15.8949 14.3287C17.1134 12.7764 17.7745 10.8595 17.7721 8.88603C17.7721 7.12854 17.2509 5.41052 16.2745 3.94922C15.2981 2.48792 13.9103 1.34897 12.2866 0.676412C10.6629 0.00385015 8.87617 -0.172123 7.15245 0.170746C5.42873 0.513616 3.84539 1.35993 2.60266 2.60266C1.35993 3.84539 0.513616 5.42873 0.170746 7.15245C-0.172123 8.87617 0.00385015 10.6629 0.676412 12.2866C1.34897 13.9103 2.48792 15.2981 3.94922 16.2745C5.41052 17.2509 7.12854 17.7721 8.88603 17.7721C10.8595 17.7745 12.7764 17.1134 14.3287 15.8949L18.0942 19.6714C18.1974 19.7755 18.3203 19.8582 18.4556 19.9146C18.591 19.971 18.7362 20 18.8828 20C19.0294 20 19.1746 19.971 19.31 19.9146C19.4453 19.8582 19.5682 19.7755 19.6714 19.6714C19.7755 19.5682 19.8582 19.4453 19.9146 19.31C19.971 19.1746 20 19.0294 20 18.8828C20 18.7362 19.971 18.591 19.9146 18.4556C19.8582 18.3203 19.7755 18.1974 19.6714 18.0942ZM2.22151 8.88603C2.22151 7.56791 2.61238 6.2794 3.34468 5.18342C4.07699 4.08745 5.11785 3.23324 6.33563 2.72882C7.55341 2.22439 8.89342 2.09241 10.1862 2.34957C11.479 2.60672 12.6665 3.24145 13.5986 4.1735C14.5306 5.10555 15.1653 6.29306 15.4225 7.58585C15.6796 8.87864 15.5477 10.2186 15.0432 11.4364C14.5388 12.6542 13.6846 13.6951 12.5886 14.4274C11.4927 15.1597 10.2041 15.5505 8.88603 15.5505C7.11849 15.5505 5.42334 14.8484 4.1735 13.5986C2.92366 12.3487 2.22151 10.6536 2.22151 8.88603Z" fill="white" fill-opacity="0.85"/>
</svg>

<Link to='/search'>
Recherche
</Link>
</span>
</li>

<li>
<span>
<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.8 19V12.2941H13.2V19H18.7V10.0588H22L11 0L0 10.0588H3.3V19H8.8Z" fill="white"/>
</svg>

Favoris
</span>

</li>

<li>
<span>
<svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.0013 20C9.16145 20 10.1107 19.0769 10.1107 17.9487H5.89194C5.89194 19.0769 6.83061 20 8.0013 20ZM14.3294 13.8462V8.71795C14.3294 5.56923 12.5997 2.93333 9.58332 2.2359V1.53846C9.58332 0.68718 8.87668 0 8.0013 0C7.12592 0 6.41928 0.68718 6.41928 1.53846V2.2359C3.39235 2.93333 1.67322 5.55897 1.67322 8.71795V13.8462L0.312688 15.1692C-0.35176 15.8154 0.112299 16.9231 1.05096 16.9231H14.9411C15.8798 16.9231 16.3544 15.8154 15.6899 15.1692L14.3294 13.8462Z" fill="white" fill-opacity="0.85"/>
</svg>

<Link to='/notifications'>
Notifications
</Link>

</span>
</li>

<li>
<span>
<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 8.88889C10.1935 8.88889 11.3381 8.42064 12.182 7.58714C13.0259 6.75365 13.5 5.62318 13.5 4.44444C13.5 3.2657 13.0259 2.13524 12.182 1.30175C11.3381 0.468252 10.1935 0 9 0C7.80653 0 6.66193 0.468252 5.81802 1.30175C4.97411 2.13524 4.5 3.2657 4.5 4.44444C4.5 5.62318 4.97411 6.75365 5.81802 7.58714C6.66193 8.42064 7.80653 8.88889 9 8.88889ZM9 11.1111C7.25326 11.1098 5.53029 11.5109 3.96795 12.2824C2.40562 13.0539 1.04699 14.1746 0 15.5556C1.04699 16.9365 2.40562 18.0572 3.96795 18.8287C5.53029 19.6003 7.25326 20.0013 9 20C10.7467 20.0013 12.4697 19.6003 14.032 18.8287C15.5944 18.0572 16.953 16.9365 18 15.5556C16.953 14.1746 15.5944 13.0539 14.032 12.2824C12.4697 11.5109 10.7467 11.1098 9 11.1111Z" fill="white" fill-opacity="0.85"/>
</svg>

<Link to='/account'>
Mon compte
</Link>
</span>

</li>


       </ul>
       
       
        </div>
    )
}
export default Sidebar;