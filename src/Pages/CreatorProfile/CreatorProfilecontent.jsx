import React from "react";
import AudioPlayer from "../FeedPage/AudioPlayer";
import CreatorAudio from "./CreatorAudio";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCreatorPost } from "../../redux/slices/postSlices";
import { addCreatorToFavourites } from "../../redux/slices/seachslice";
import { Link } from "react-router-dom";
import StarRating from "./Star";
const CreatorProfilecontent=()=>{
    const [socialSharePopup,setSocialSharePopup]=React.useState(false)
const [post,setPost]=React.useState([])
const [subscriptions,setSubscriptions]=React.useState([])
const dispatch=useDispatch();
const [rating,setRating]=React.useState(0)
const navigate=useNavigate();
const [showdotpopup,setShowDotPopup]=React.useState(false)
const location=useLocation();
const urlToShare ="https://gomovies.sx/"
React.useEffect(()=>{
    favourite_creator();
getPost();
},[])
React.useEffect(()=>{
if(socialSharePopup==true){
    document.body.style.overflow = 'hidden';
    window.scrollTo(0,0)
}else{
    document.body.style.overflow = 'auto';
}
return()=>{
    document.body.style.overflow = 'auto';
}
},[socialSharePopup])

const favourite_creator=async()=>{
    let search=location.search;
let params=new URLSearchParams(search)
let id=params.get('id')
let data={
    creatorId:id
}
let searchresult=await dispatch(addCreatorToFavourites(data))
if(addCreatorToFavourites.fulfilled.match(searchresult)){
console.log('res')
console.log(searchresult)
}
if(addCreatorToFavourites.rejected.match(searchresult)){
console.log('res')
console.log(searchresult)
}
}


const getPost=async()=>{
let search=location.search;
let params=new URLSearchParams(search)
let id=params.get('id')
let res=await dispatch(getCreatorPost(id))
if(getCreatorPost.rejected.match(res)){

}
if(getCreatorPost.fulfilled.match(res)){
   console.log("NEW")
   console.log(res)
    setPost(res.payload.data.finalposts)
    
    setSubscriptions(res.payload.data.subscriptions)
    setRating(res.payload.data.averageRating)
   
}
}



const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`;
    window.open(twitterUrl, '_blank');
};

const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookUrl, '_blank');
};

const shareOnLinkedIn = () => {
     const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`;
   window.open(linkedInUrl, '_blank');
};

return(
        <div className="creatorprofile-div">
{socialSharePopup==true?            <div className="creator-profile-sharepopup">
<div style={{border:'1px solid #8CC8FF',background:'#11142E'}} className="creator-profile-sharepopupdiv text-center">
<div className="creator-profile-popupcandiv">
<svg onClick={()=>setSocialSharePopup(false)} width="17" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 4.47754L6 16.4775" stroke="#F6EFEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 4.47754L18 16.4775" stroke="#F6EFEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<p>Partager le profil du Créateur</p>
<div className="craetor-profile-popupsocial">
<div>
<svg className="cursor-pointer" onClick={shareOnTwitter} width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8018 2.18603C20.0664 2.51208 19.2762 2.73248 18.4465 2.83138C19.2931 2.32387 19.9436 1.52016 20.2494 0.563033C19.4571 1.0329 18.5792 1.37453 17.6454 1.55781C16.8975 0.761364 15.8316 0.262939 14.652 0.262939C12.3873 0.262939 10.5509 2.0988 10.5509 4.36404C10.5509 4.68516 10.5872 4.99849 10.6573 5.29885C7.24882 5.12777 4.22712 3.49491 2.20435 1.01343C1.8513 1.61933 1.64907 2.32413 1.64907 3.0754C1.64907 4.49825 2.37309 5.75314 3.47352 6.48883C2.80142 6.46729 2.16904 6.28272 1.6161 5.97587C1.61558 5.99301 1.61558 6.00988 1.61558 6.02753C1.61558 8.01396 3.02909 9.67148 4.90493 10.0487C4.56096 10.1419 4.19883 10.1922 3.82475 10.1922C3.56022 10.1922 3.30348 10.1668 3.05297 10.1188C3.57476 11.7477 5.08924 12.9338 6.88383 12.9671C5.48019 14.0667 3.71208 14.7227 1.79055 14.7227C1.45957 14.7227 1.13325 14.7035 0.812134 14.6653C2.62697 15.8288 4.78266 16.5074 7.09852 16.5074C14.6419 16.5074 18.7669 10.2587 18.7669 4.83988C18.7669 4.66232 18.7627 4.48501 18.7549 4.30875C19.5568 3.73089 20.2523 3.00843 20.8018 2.18603Z" fill="white"/>
</svg>
</div>
<div>
<svg className="cursor-pointer" onClick={()=>navigator.clipboard.writeText(window.location.href.toString())} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.01755 6.94162C7.81811 5.74227 5.87353 5.74227 4.67414 6.94162L2.50245 9.11337C1.30306 10.3127 1.30306 12.2574 2.50245 13.4567C3.70184 14.6561 5.64643 14.6561 6.8458 13.4567L7.93167 12.3709M6.8458 9.11337C8.04524 10.3127 9.98979 10.3127 11.1892 9.11337L13.3609 6.94162C14.5603 5.74226 14.5603 3.79767 13.3609 2.59827C12.1615 1.39888 10.2169 1.39888 9.01755 2.59827L7.93167 3.68412" stroke="white" stroke-width="2.30137" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<div>
<svg className="cursor-pointer" onClick={shareOnLinkedIn} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.55991 18.6573H0.742837V6.36524H4.55991V18.6573ZM2.64932 4.68849C1.42874 4.68849 0.438721 3.67751 0.438721 2.45694C0.438721 1.87065 0.671622 1.30837 1.08619 0.893807C1.50076 0.479239 2.06303 0.246338 2.64932 0.246338C3.2356 0.246338 3.79788 0.479239 4.21245 0.893807C4.62701 1.30837 4.85991 1.87065 4.85991 2.45694C4.85991 3.67751 3.86948 4.68849 2.64932 4.68849ZM18.846 18.6573H15.0371V12.6736C15.0371 11.2475 15.0084 9.41874 13.0526 9.41874C11.068 9.41874 10.7639 10.9681 10.7639 12.5709V18.6573H6.95092V6.36524H10.6118V8.04199H10.6652C11.1748 7.07622 12.4197 6.05702 14.2768 6.05702C18.1399 6.05702 18.8501 8.60091 18.8501 11.9051V18.6573H18.846Z" fill="white"/>
</svg>
</div>
<div>
<svg className="cursor-pointer" onClick={shareOnFacebook} width="11" height="21" viewBox="0 0 11 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.98359 11.6998L10.5378 8.08835H7.0725V5.74474C7.0725 4.75671 7.55658 3.79362 9.10859 3.79362H10.684V0.718841C10.684 0.718841 9.25436 0.474854 7.88748 0.474854C5.03369 0.474854 3.16832 2.20459 3.16832 5.33589V8.08835H-0.00390625V11.6998H3.16832V20.4304H7.0725V11.6998H9.98359Z" fill="white"/>
</svg>
</div>
</div>
</div>
            </div>:''}
<div className="creatorprofile-firstdiv flex flex-col space-y-3 items-center justify-center text-center">
{post.length>0&&(
    <div  className="flex flex-col space-y-5">
    <div className="flex flex-row space-x-3 items-center justify-center relative creator-info-svg">
      <div className="flex flex-row items-center justify-center space-x-3">
      <p>{post[0]?.creator?.name}</p>
        <svg width="18" height="19" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9703 13.7401C21.5995 13.2282 21.3998 12.6122 21.3998 11.9801C21.3998 11.348 21.5995 10.732 21.9703 10.2201L22.7303 9.17009C22.8232 9.04188 22.8844 8.89343 22.9087 8.73696C22.9331 8.58049 22.9199 8.42048 22.8703 8.27009C22.8202 8.12128 22.7364 7.98608 22.6253 7.87505C22.5143 7.76403 22.3791 7.68019 22.2303 7.63009L21.0003 7.23009C20.3978 7.03573 19.8726 6.65494 19.5005 6.14269C19.1284 5.63043 18.9288 5.01321 18.9303 4.38009V3.08009C18.9302 2.92226 18.8927 2.76669 18.8209 2.62612C18.7492 2.48554 18.6451 2.36395 18.5174 2.27129C18.3896 2.17863 18.2417 2.11753 18.0858 2.09299C17.9299 2.06845 17.7704 2.08116 17.6203 2.13009L16.3803 2.53009C15.7783 2.72489 15.1301 2.72437 14.5285 2.5286C13.9268 2.33283 13.4024 1.95184 13.0303 1.44009L12.2703 0.390093C12.1733 0.268401 12.05 0.170138 11.9098 0.102604C11.7696 0.0350698 11.6159 0 11.4603 0C11.3047 0 11.151 0.0350698 11.0108 0.102604C10.8705 0.170138 10.7473 0.268401 10.6503 0.390093L9.8903 1.44009C9.5182 1.95184 8.99382 2.33283 8.39214 2.5286C7.79046 2.72437 7.14229 2.72489 6.5403 2.53009L5.3003 2.13009C5.15024 2.08116 4.99073 2.06845 4.83481 2.09299C4.6789 2.11753 4.531 2.17863 4.40323 2.27129C4.27546 2.36395 4.17143 2.48554 4.09966 2.62612C4.02789 2.76669 3.99042 2.92226 3.9903 3.08009V4.38009C3.99183 5.01321 3.79216 5.63043 3.4201 6.14269C3.04804 6.65494 2.52284 7.03573 1.9203 7.23009L0.690299 7.63009C0.54149 7.68019 0.406287 7.76403 0.29526 7.87505C0.184234 7.98608 0.100395 8.12128 0.0502989 8.27009C0.000710461 8.42048 -0.0124558 8.58049 0.0118837 8.73696C0.0362232 8.89343 0.0973726 9.04188 0.190299 9.17009L0.950299 10.2201C1.32114 10.732 1.52081 11.348 1.52081 11.9801C1.52081 12.6122 1.32114 13.2282 0.950299 13.7401L0.190299 14.7901C0.0973726 14.9183 0.0362232 15.0668 0.0118837 15.2232C-0.0124558 15.3797 0.000710461 15.5397 0.0502989 15.6901C0.100395 15.8389 0.184234 15.9741 0.29526 16.0851C0.406287 16.1962 0.54149 16.28 0.690299 16.3301L1.9203 16.7301C2.52284 16.9245 3.04804 17.3052 3.4201 17.8175C3.79216 18.3298 3.99183 18.947 3.9903 19.5801V20.8801C3.99042 21.0379 4.02789 21.1935 4.09966 21.3341C4.17143 21.4746 4.27546 21.5962 4.40323 21.6889C4.531 21.7816 4.6789 21.8427 4.83481 21.8672C4.99073 21.8917 5.15024 21.879 5.3003 21.8301L6.5303 21.4301C7.13357 21.232 7.7842 21.2309 8.38817 21.4268C8.99215 21.6227 9.51819 22.0056 9.8903 22.5201L10.6503 23.5701C10.7437 23.6972 10.8656 23.8006 11.0064 23.8718C11.1471 23.9431 11.3026 23.9802 11.4603 23.9802C11.618 23.9802 11.7735 23.9431 11.9142 23.8718C12.055 23.8006 12.1769 23.6972 12.2703 23.5701L13.0303 22.5201C13.403 22.0063 13.9291 21.624 14.5329 21.4281C15.1366 21.2323 15.787 21.233 16.3903 21.4301L17.6203 21.8301C17.7704 21.879 17.9299 21.8917 18.0858 21.8672C18.2417 21.8427 18.3896 21.7816 18.5174 21.6889C18.6451 21.5962 18.7492 21.4746 18.8209 21.3341C18.8927 21.1935 18.9302 21.0379 18.9303 20.8801V19.5801C18.9288 18.947 19.1284 18.3298 19.5005 17.8175C19.8726 17.3052 20.3978 16.9245 21.0003 16.7301L22.2303 16.3301C22.3791 16.28 22.5143 16.1962 22.6253 16.0851C22.7364 15.9741 22.8202 15.8389 22.8703 15.6901C22.9199 15.5397 22.9331 15.3797 22.9087 15.2232C22.8844 15.0668 22.8232 14.9183 22.7303 14.7901L21.9703 13.7401ZM16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09093 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="#5991C6"/>
    </svg>
    
      </div>
   
    <div >
        <div  onClick={(e)=>setShowDotPopup(!showdotpopup)}  className="relative cursor-pointer creatorprofile-threedotsparent" style={{border:'1.5px solid #22779C',width:'30px',height:'30px',borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
    
    <svg className="threedots-svgprofile" width="17" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.33333 3C5.33333 2.40666 5.17694 1.82664 4.88392 1.33329C4.5909 0.839943 4.17443 0.455425 3.68716 0.228362C3.19989 0.00129972 2.66371 -0.0581104 2.14643 0.0576452C1.62914 0.173401 1.15399 0.459124 0.781049 0.878681C0.408109 1.29824 0.154134 1.83279 0.0512403 2.41473C-0.0516536 2.99667 0.00115531 3.59987 0.202989 4.14805C0.404823 4.69623 0.746616 5.16476 1.18515 5.49441C1.62368 5.82405 2.13925 6 2.66667 6C3.37391 6 4.05219 5.68393 4.55229 5.12132C5.05238 4.55871 5.33333 3.79565 5.33333 3ZM18.6667 3C18.6667 3.59334 18.8231 4.17336 19.1161 4.66671C19.4091 5.16006 19.8256 5.54457 20.3128 5.77164C20.8001 5.9987 21.3363 6.05811 21.8536 5.94235C22.3709 5.8266 22.846 5.54087 23.2189 5.12132C23.5919 4.70176 23.8459 4.16721 23.9488 3.58527C24.0517 3.00333 23.9988 2.40013 23.797 1.85195C23.5952 1.30377 23.2534 0.835236 22.8149 0.505592C22.3763 0.175948 21.8607 9.51785e-07 21.3333 9.74839e-07C20.6261 1.00575e-06 19.9478 0.316072 19.4477 0.87868C18.9476 1.44129 18.6667 2.20435 18.6667 3ZM9.33333 3C9.33333 3.59334 9.48973 4.17336 9.78275 4.66671C10.0758 5.16006 10.4922 5.54457 10.9795 5.77164C11.4668 5.9987 12.003 6.05811 12.5202 5.94235C13.0375 5.8266 13.5127 5.54088 13.8856 5.12132C14.2586 4.70176 14.5125 4.16721 14.6154 3.58527C14.7183 3.00333 14.6655 2.40013 14.4637 1.85195C14.2618 1.30377 13.9201 0.835236 13.4815 0.505592C13.043 0.175948 12.5274 1.35976e-06 12 1.38281e-06C11.2928 1.41373e-06 10.6145 0.316072 10.1144 0.878681C9.61429 1.44129 9.33333 2.20435 9.33333 3Z" fill="white"/>
    </svg>
    {showdotpopup==true?<div id="creatorprofile-threedots" data-key={1}  className="flex py-2 px-2 flex-col justify-between">
<div style={{width:'100%',height:'3rem',borderBottom:'1px solid #5991C6'}} className="flex flex-row">
<p className="cursor-pointer" onClick={()=>setSocialSharePopup(true)}>Partager</p>
<div className="creatorprofile-threedotssvgdiv items-center justify-center">
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f7f7f7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#fafafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

    </div>
    </div>
<p  style={{height:'3rem',width:'100%',gap:'56%',borderBottom:'1px solid #5991C6'}}  className="cursor-pointer flex flex-row py-2 items-center">
    <span onClick={()=>navigate(`/report?creator=${post[0]?.creator?._id}`)}>
    Rapport
    </span>

<span style={{height:'fit-content'}} className="creator-profilesecondsvg flex items-center my-2 justify-center">
<svg width="18" height="19" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 16.9999C5 16.9999 6 15.9999 9 15.9999C12 15.9999 14 17.9999 17 17.9999C20 17.9999 21 16.9999 21 16.9999V4.99994C21 4.99994 20 5.99994 17 5.99994C14 5.99994 12 3.99994 9 3.99994C7.1531 3.99994 6.06421 4.37894 5.5 4.6703C5.14774 4.8522 5 1.5 5 1.5V16.9999Z" fill="#FF2F2F" stroke="#FF2F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 24V17" stroke="#FF2F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</span>
</p>
</div>:``}
        </div>
    
    </div>
    </div>
    <div className="flex items-center justify-center">
    <StarRating totalStars={5} value={rating}/>
        </div>
    <p>Développement personnel</p>
    <div className="flex flex-row justify-center items-center">
  <div className="flex md:flex-row flex-col creator-profile-buttonsdiv  items-center justify-center">
  <button style={subscriptions.length>0?{background:'none',boxShadow:'none',border:'1px solid #8CC8FF'}:{}} onClick={()=>navigate(`/subinfo?id=${post[0]?.creator?._id}&name=${post[0]?.creator?.name}&price=50.99€`)} className="creator-profile-btn">
   {subscriptions.length>0?<p style={{gap:'0.5rem',width:'8rem'}}  className="flex flex-row items-center justify-center"><svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.21283 7.60175C6.89833 7.60173 7.56842 7.40093 8.13838 7.02476C8.70833 6.64858 9.15255 6.11391 9.41487 5.48837C9.67718 4.86283 9.7458 4.17451 9.61205 3.51045C9.47831 2.84638 9.1482 2.23641 8.66348 1.75765C8.17875 1.27889 7.56118 0.952861 6.88886 0.820778C6.21653 0.688695 5.51965 0.756495 4.88634 1.01561C4.25303 1.27472 3.71173 1.7135 3.3309 2.27647C2.95006 2.83943 2.74679 3.5013 2.74679 4.17838C2.74779 5.08603 3.11329 5.95621 3.76309 6.59801C4.41288 7.2398 5.2939 7.60078 6.21283 7.60175ZM6.21283 1.82934C6.6832 1.82936 7.143 1.96715 7.53409 2.22528C7.92517 2.48341 8.22998 2.85028 8.40997 3.27952C8.58996 3.70875 8.63704 4.18106 8.54526 4.63672C8.45348 5.09238 8.22697 5.51093 7.89436 5.83944C7.56175 6.16794 7.13799 6.39166 6.67666 6.48229C6.21533 6.57291 5.73715 6.52639 5.30259 6.34859C4.86802 6.1708 4.4966 5.86972 4.23528 5.48342C3.97396 5.09713 3.83448 4.64297 3.83448 4.17838C3.83523 3.55558 4.08605 2.95851 4.53192 2.51814C4.97779 2.07776 5.5823 1.83005 6.21283 1.82934ZM7.8335 9.7515H4.59184C3.87092 9.75235 3.17978 10.0356 2.67001 10.5391C2.16024 11.0426 1.87347 11.7253 1.87261 12.4373V14.7042C1.87261 14.8467 1.81531 14.9833 1.71332 15.084C1.61133 15.1848 1.473 15.2414 1.32876 15.2414C1.18452 15.2414 1.04619 15.1848 0.944201 15.084C0.84221 14.9833 0.784912 14.8467 0.784912 14.7042V12.4374C0.786121 11.4405 1.1876 10.4848 1.90127 9.77992C2.61495 9.075 3.58255 8.67846 4.59184 8.67727H7.83317C8.57192 8.67773 9.29467 8.88984 9.91381 9.28789C10.533 9.68593 11.0219 10.2528 11.3214 10.9198C11.3519 10.9845 11.369 11.0546 11.3718 11.1259C11.3746 11.1972 11.363 11.2684 11.3376 11.3352C11.3122 11.402 11.2736 11.4632 11.224 11.5151C11.1744 11.567 11.1149 11.6087 11.0488 11.6376C10.9828 11.6665 10.9115 11.6822 10.8393 11.6836C10.7671 11.685 10.6953 11.6722 10.6281 11.646C10.5609 11.6197 10.4997 11.5804 10.448 11.5305C10.3964 11.4806 10.3553 11.421 10.3273 11.3553C10.1132 10.8783 9.76358 10.4729 9.32089 10.1883C8.87819 9.90362 8.36173 9.75183 7.8335 9.7515ZM13.1217 12.5764L11.7501 14.6076C11.6214 14.7978 11.4485 14.9549 11.246 15.0658C11.0434 15.1766 10.8169 15.2381 10.5854 15.245H10.5434C10.3192 15.2449 10.0981 15.1935 9.89742 15.0948C9.69673 14.9961 9.52189 14.8529 9.38662 14.6764L8.70137 13.7825C8.65595 13.7265 8.62235 13.6621 8.60255 13.593C8.58276 13.5239 8.57719 13.4517 8.58615 13.3804C8.59511 13.3092 8.61843 13.2405 8.65473 13.1783C8.69104 13.1162 8.73958 13.0618 8.79751 13.0185C8.85544 12.9751 8.92157 12.9437 8.99199 12.9261C9.06242 12.9084 9.13572 12.9048 9.20756 12.9156C9.27939 12.9264 9.34831 12.9513 9.41025 12.9888C9.47218 13.0264 9.52588 13.0758 9.56816 13.1341L10.2534 14.0285C10.2897 14.0726 10.3353 14.1081 10.3871 14.1327C10.4389 14.1573 10.4955 14.1702 10.553 14.1707C10.611 14.1692 10.6677 14.1539 10.7185 14.1262C10.7693 14.0984 10.8125 14.059 10.8446 14.0112L12.2158 11.9796C12.2551 11.9202 12.3059 11.869 12.3654 11.8292C12.4248 11.7893 12.4916 11.7614 12.562 11.7472C12.6324 11.733 12.7049 11.7326 12.7754 11.7462C12.8459 11.7599 12.913 11.7871 12.9728 11.8265C13.0325 11.8659 13.0838 11.9165 13.1236 11.9756C13.1635 12.0346 13.1911 12.1009 13.2048 12.1705C13.2186 12.2402 13.2183 12.3118 13.2038 12.3813C13.1894 12.4508 13.1612 12.5168 13.1208 12.5755L13.1217 12.5764Z" fill="white"/>
</svg>
Abonné</p>:<p>S'abonner</p>}
 
    </button>
 <div className="bookcall-creatorprofile flex items-center justify-center">
{subscriptions.length>0?<button onClick={(e)=>navigate(`/schedule?id=${post[0]?.creator?._id}&name=${post[0]?.creator?.name}`)} style={{background:'#3EC69F',width:'12rem'}} className="creator-profile-btn">
    Réserver un appel
    </button>:``}
    </div>
    </div>
    </div>
    <div   className="flex justify-center items-center flex-col text-center">
    <p style={{textAlign:'center'}} className="creator-profile-exp">
   {post[0]?.creator?.introduction}
    </p>
    </div>
    <div className="flex flex-row justify-center items-center space-x-6">
{post[0]?.creator?.tags?.map((tag,j)=>{
    return <p style={{color:'#FFFFFF',fontWeight:'normal'}}>#{tag}</p>
   
})}
    </div>
    </div>
)}
<div style={{border: '1.5px solid #5991C6',width:'90%',marginTop:'2rem'}}>

</div>
<div className="creator-divtwo">
<p>
{post[0]?.audio?post?.length:`0`} Audios
</p>
</div>
<div className="creatorprofile-audiogrid">
{post[0]?.audio?.length>0?post.map((audio,a)=>{
    console.log('audio')
    console.log(audio)
    return <div className="creatorprofile-audiodiv">
 
    <CreatorAudio isSub={subscriptions?.length>0?true:false}  title={audio.title} page="creatorprofile" prem={audio.premium}   audioUrl={audio?.audio}></CreatorAudio>
    </div>
}):``}

</div>
</div>

        </div>
    )
}

export default CreatorProfilecontent;