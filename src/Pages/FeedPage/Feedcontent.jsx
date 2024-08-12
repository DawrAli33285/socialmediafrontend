import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import AudioPlayer from './AudioPlayer'
import { add_remove_favourites } from '../../redux/slices/postSlices'
import React from 'react'
import store from '../../redux/store/store'
import {Link,useNavigate} from 'react-router-dom'
import { getPost } from '../../redux/slices/postSlices'
import {useDispatch} from 'react-redux'
const Feedcontent=()=>{
    const dispatch=useDispatch();
    const [post,setPosts]=React.useState()
    const [subscriptions,setSubscriptions]=React.useState([])
    const navigate=useNavigate();
    const [showdotpopup,setShowDotPopup]=React.useState("")
const [user,setUser]=React.useState("")
    
React.useEffect(()=>{
getPosts();
setUser(store.getState().authenticationslices?.user?.user);

        // Subscribe to store changes
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authenticationslices?.user?.user);
        });

        // Unsubscribe from the store changes when the component unmounts
        return () => unsubscribe();
},[])
const getTimeSince = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const difference = now - postDate; // difference in milliseconds
    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days >= 1) {
        return `il y a ${Math.floor(days)} jour(s)`; // Display days if it's been one day or more
    } else if (hours >= 1) {
        return `il y a ${Math.floor(hours)} heure(s)`; // Display hours if it's been one hour or more
    } else if (minutes >= 1) {
        return `il y a ${Math.floor(minutes)} minute(s)`; // Display minutes if it's been one minute or more
    } else {
        return `il y a quelques secondes`; // Display seconds if less than a minute
    }
};



const getPosts=async()=>{
 let res=await dispatch(getPost())
if(getPost.rejected.match(res)){
    toastr.error(res.payload.error)
console.log(res)
}
if(getPost.fulfilled.match(res)){
setPosts(res.payload.posts)
setSubscriptions(res.payload.subscriptions)
    console.log(res)
}
}

  
const add_remove_reaction=async(postid,heart)=>{
let data={
    postid,
    user:user._id
}
    let res=await dispatch(add_remove_favourites(data))
    if(add_remove_favourites.rejected.match(res)){
        console.log(res)
        toastr.error(res.payload.error)
    }
    if(add_remove_favourites.fulfilled.match(res)){
if(heart==false){
        
    setPosts((prev)=>{
        let old=[...prev]
        let postindex=post.findIndex(u=>u._id.toString()==postid.toString())
        let firstpost={...old[postindex]}
       firstpost.favourites=[...firstpost.favourites,user._id]
    old.splice(postindex,1,firstpost)
    return old
    
    })
}else{
        
    setPosts((prev)=>{
        let old=[...prev]
        let postindex=post.findIndex(u=>u._id.toString()==postid.toString())
        let firstpost={...old[postindex]}
       let newarray={...firstpost,favourites:firstpost.favourites.filter(u=>u!=user._id)}
    old.splice(postindex,1,newarray) 
    return old
    
    })
}
    }

}


    return(
        <div className="feedcontent-div">
{post?.length>0?post?.map((val,i)=>{

    return <>
              
              <div  className="feed-post" key={i.toString()}>          
<div className="flex flex-row feedpost-profile-dots">
<div className="flex flex-row feed-post-profilecontent">
<div onClick={()=>navigate(`/post/${val?._id}`)} className="feed-content-avatar">
<img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"></img>

</div>
<div className="flex flex-col feed-post-profile-parent">
<h3  className="flex flex-row feed-post-profile-text">
{val?.creator?.name}
<svg onClick={()=>navigate(`/post/${val?._id}`)} width="20" height="18" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9703 13.7401C21.5995 13.2282 21.3998 12.6122 21.3998 11.9801C21.3998 11.348 21.5995 10.732 21.9703 10.2201L22.7303 9.17009C22.8232 9.04188 22.8844 8.89343 22.9087 8.73696C22.9331 8.58049 22.9199 8.42048 22.8703 8.27009C22.8202 8.12128 22.7364 7.98608 22.6253 7.87505C22.5143 7.76403 22.3791 7.68019 22.2303 7.63009L21.0003 7.23009C20.3978 7.03573 19.8726 6.65494 19.5005 6.14269C19.1284 5.63043 18.9288 5.01321 18.9303 4.38009V3.08009C18.9302 2.92226 18.8927 2.76669 18.8209 2.62612C18.7492 2.48554 18.6451 2.36395 18.5174 2.27129C18.3896 2.17863 18.2417 2.11753 18.0858 2.09299C17.9299 2.06845 17.7704 2.08116 17.6203 2.13009L16.3803 2.53009C15.7783 2.72489 15.1301 2.72437 14.5285 2.5286C13.9268 2.33283 13.4024 1.95184 13.0303 1.44009L12.2703 0.390093C12.1733 0.268401 12.05 0.170138 11.9098 0.102604C11.7696 0.0350698 11.6159 0 11.4603 0C11.3047 0 11.151 0.0350698 11.0108 0.102604C10.8705 0.170138 10.7473 0.268401 10.6503 0.390093L9.8903 1.44009C9.5182 1.95184 8.99382 2.33283 8.39214 2.5286C7.79046 2.72437 7.14229 2.72489 6.5403 2.53009L5.3003 2.13009C5.15024 2.08116 4.99073 2.06845 4.83481 2.09299C4.6789 2.11753 4.531 2.17863 4.40323 2.27129C4.27546 2.36395 4.17143 2.48554 4.09966 2.62612C4.02789 2.76669 3.99042 2.92226 3.9903 3.08009V4.38009C3.99183 5.01321 3.79216 5.63043 3.4201 6.14269C3.04804 6.65494 2.52284 7.03573 1.9203 7.23009L0.690299 7.63009C0.54149 7.68019 0.406287 7.76403 0.29526 7.87505C0.184234 7.98608 0.100395 8.12128 0.0502989 8.27009C0.000710461 8.42048 -0.0124558 8.58049 0.0118837 8.73696C0.0362232 8.89343 0.0973726 9.04188 0.190299 9.17009L0.950299 10.2201C1.32114 10.732 1.52081 11.348 1.52081 11.9801C1.52081 12.6122 1.32114 13.2282 0.950299 13.7401L0.190299 14.7901C0.0973726 14.9183 0.0362232 15.0668 0.0118837 15.2232C-0.0124558 15.3797 0.000710461 15.5397 0.0502989 15.6901C0.100395 15.8389 0.184234 15.9741 0.29526 16.0851C0.406287 16.1962 0.54149 16.28 0.690299 16.3301L1.9203 16.7301C2.52284 16.9245 3.04804 17.3052 3.4201 17.8175C3.79216 18.3298 3.99183 18.947 3.9903 19.5801V20.8801C3.99042 21.0379 4.02789 21.1935 4.09966 21.3341C4.17143 21.4746 4.27546 21.5962 4.40323 21.6889C4.531 21.7816 4.6789 21.8427 4.83481 21.8672C4.99073 21.8917 5.15024 21.879 5.3003 21.8301L6.5303 21.4301C7.13357 21.232 7.7842 21.2309 8.38817 21.4268C8.99215 21.6227 9.51819 22.0056 9.8903 22.5201L10.6503 23.5701C10.7437 23.6972 10.8656 23.8006 11.0064 23.8718C11.1471 23.9431 11.3026 23.9802 11.4603 23.9802C11.618 23.9802 11.7735 23.9431 11.9142 23.8718C12.055 23.8006 12.1769 23.6972 12.2703 23.5701L13.0303 22.5201C13.403 22.0063 13.9291 21.624 14.5329 21.4281C15.1366 21.2323 15.787 21.233 16.3903 21.4301L17.6203 21.8301C17.7704 21.879 17.9299 21.8917 18.0858 21.8672C18.2417 21.8427 18.3896 21.7816 18.5174 21.6889C18.6451 21.5962 18.7492 21.4746 18.8209 21.3341C18.8927 21.1935 18.9302 21.0379 18.9303 20.8801V19.5801C18.9288 18.947 19.1284 18.3298 19.5005 17.8175C19.8726 17.3052 20.3978 16.9245 21.0003 16.7301L22.2303 16.3301C22.3791 16.28 22.5143 16.1962 22.6253 16.0851C22.7364 15.9741 22.8202 15.8389 22.8703 15.6901C22.9199 15.5397 22.9331 15.3797 22.9087 15.2232C22.8844 15.0668 22.8232 14.9183 22.7303 14.7901L21.9703 13.7401ZM16.1703 10.6871L11.1703 15.6871C10.9828 15.8746 10.7285 15.9799 10.4633 15.9799C10.1981 15.9799 9.94383 15.8746 9.7563 15.6871L6.7563 12.6871C6.66079 12.5948 6.58461 12.4845 6.5322 12.3625C6.47979 12.2405 6.4522 12.1093 6.45105 11.9765C6.44989 11.8437 6.4752 11.712 6.52548 11.5891C6.57576 11.4662 6.65001 11.3546 6.7439 11.2607C6.8378 11.1668 6.94945 11.0926 7.07234 11.0423C7.19524 10.992 7.32692 10.9667 7.4597 10.9678C7.59248 10.969 7.7237 10.9966 7.8457 11.049C7.96771 11.1014 8.07805 11.1776 8.1703 11.2731L10.4603 13.5661L14.7533 9.27309C14.9419 9.09093 15.1945 8.99014 15.4567 8.99242C15.7189 8.9947 15.9697 9.09987 16.1551 9.28527C16.3405 9.47068 16.4457 9.7215 16.448 9.98369C16.4503 10.2459 16.3495 10.4985 16.1673 10.6871H16.1703Z" fill="#5991C6"/>
</svg>
<button onClick={()=>navigate(`/subinfo?name=${val?.creator?.name}&id=${val?.creator?._id}&price=50.99€`)} className="feed-subbtn">S'abonner</button>
</h3>
<h3 onClick={()=>navigate(`/post/${val?._id}`)} className="feed-content-profile-textonly">
    Titre
    <p onClick={()=>navigate(`/post/${val?._id}`)}>{val?.description}</p>
    <p>{getTimeSince(val?.createdAt)}</p>
</h3>

</div>


</div>
<div>
<div   data-key={1}  className="relative feedcontent-popup">
<svg  className="cursor-pointer" data-key={1} onClick={(e)=>setShowDotPopup((prev)=>{
    let old=prev
    if(old && val?._id.toString()==showdotpopup?.toString()){
return ''
    }else{
        return val._id
    }
})} width="25" height="20" viewBox="0 0 32 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 0C15.2968 0 14.6093 0.205272 14.0246 0.589857C13.4399 0.974441 12.9842 1.52107 12.7151 2.16061C12.446 2.80015 12.3756 3.50388 12.5128 4.18282C12.65 4.86175 12.9886 5.48539 13.4858 5.97487C13.9831 6.46436 14.6166 6.7977 15.3063 6.93275C15.9961 7.0678 16.711 6.99848 17.3607 6.73358C18.0103 6.46867 18.5656 6.02007 18.9563 5.44449C19.347 4.86892 19.5556 4.19223 19.5556 3.5C19.5556 2.57174 19.181 1.6815 18.5142 1.02513C17.8474 0.36875 16.943 0 16 0ZM3.55556 0C2.85233 0 2.1649 0.205272 1.5802 0.589857C0.995488 0.974441 0.539764 1.52107 0.270652 2.16061C0.00154055 2.80015 -0.0688713 3.50388 0.0683206 4.18282C0.205512 4.86175 0.544146 5.48539 1.0414 5.97487C1.53865 6.46436 2.17219 6.7977 2.8619 6.93275C3.55161 7.0678 4.26652 6.99848 4.91621 6.73358C5.5659 6.46867 6.1212 6.02007 6.51189 5.44449C6.90258 4.86892 7.11111 4.19223 7.11111 3.5C7.11111 2.57174 6.73651 1.6815 6.06972 1.02513C5.40292 0.36875 4.49855 0 3.55556 0ZM28.4444 0C27.7412 0 27.0538 0.205272 26.4691 0.589857C25.8844 0.974441 25.4287 1.52107 25.1595 2.16061C24.8904 2.80015 24.82 3.50388 24.9572 4.18282C25.0944 4.86175 25.433 5.48539 25.9303 5.97487C26.4275 6.46436 27.0611 6.7977 27.7508 6.93275C28.4405 7.0678 29.1554 6.99848 29.8051 6.73358C30.4548 6.46867 31.0101 6.02007 31.4008 5.44449C31.7915 4.86892 32 4.19223 32 3.5C32 2.57174 31.6254 1.6815 30.9586 1.02513C30.2918 0.36875 29.3874 0 28.4444 0Z" fill="white"/>
</svg>
{showdotpopup.toString()==val?._id?.toString()?<div data-key={1} className="flex flex-col feedcontent-popupdiv">
<p className="cursor-pointer" onClick={()=>navigator.clipboard.writeText(`http://localhost:3000/post/${val?._id}`)}>Partager</p>
<p  className="cursor-pointer"><Link to={`/report?creator=${val?.creator?._id}`}>Signaler</Link></p>
</div>:``}
</div>
</div>

</div>

<div className="flex flex-row feed-post-auidodiv space-x-3">
{val?.premium==false?<AudioPlayer prem={val?.premium} isSub={subscriptions?.find(u=>u?.creator?.toString()==val?.creator?._id?.toString())?true:false}  audioUrl={val?.audio}/>:<AudioPlayer creator={val?.creator} isSub={subscriptions?.find(u=>u?.creator?.toString()==val?.creator?._id?.toString())?true:false}  prem={true} audioUrl={val?.audio}/>}
<p>{val?.audiolength}</p>
{val?.favourites.find(u=>u==user.id)?<svg className="cursor-pointer" onClick={()=>add_remove_reaction(val?._id,true)} width="25" height="20" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 7.39905C0 -0.555782 11.4705 -3.50393 15 5.70484C18.5295 -3.50393 30 -0.555782 30 7.39905C30 16.0419 15 27 15 27C15 27 0 16.0419 0 7.39905Z" fill="#DD2E44"/>
</svg>
:<svg className="cursor-pointer" onClick={()=>add_remove_reaction(val?._id,false)} width="25" height="20" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.75 0C19.125 0 16.6501 1.17717 15 3.09002C13.3498 1.17717 10.875 0 8.25 0C3.59986 0 0 3.53116 0 8.09262C0 13.6836 5.09986 18.1718 12.8247 25.0867L15 27L17.1753 25.0867C24.9001 18.1717 30 13.6835 30 8.09262C30 3.53116 26.4001 0 21.75 0ZM15.9257 23.1509L15.6214 23.4232L15 23.9697L14.3787 23.4233L14.0748 23.1512C10.4388 19.897 7.29873 17.0865 5.22288 14.5735C3.20675 12.1328 2.30769 10.134 2.30769 8.09262C2.30769 6.48492 2.91505 5.00372 4.01791 3.92196C5.11709 2.84379 6.62005 2.25 8.25 2.25C10.1347 2.25 11.9978 3.10549 13.2339 4.53832L15 6.58554L16.766 4.53832C18.0022 3.10549 19.8653 2.25 21.75 2.25C23.38 2.25 24.8829 2.84379 25.9822 3.92189C27.085 5.00372 27.6923 6.48485 27.6923 8.09262C27.6923 10.134 26.7932 12.1327 24.7773 14.5734C22.7015 17.0864 19.5615 19.8967 15.9257 23.1509Z" fill="white"/>
</svg>}



</div>
      </div>
    </>
}):<p>
    No posts found
    </p>}
     

        </div>
    )
}
export default Feedcontent;