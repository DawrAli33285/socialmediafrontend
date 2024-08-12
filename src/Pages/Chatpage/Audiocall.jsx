import {store} from '../../redux/store/store'
import React from "react";
import {muteAudio} from '../../Webrtc/webrtc'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { getLocalPreviewAndInitRoomConnection,} from '../../Webrtc/webrtc';
import {userdisconnected,declineCall } from '../../Webrtc/wss'
import Review from './Review';
import { saveRating } from '../../redux/slices/reviewSlice';
const Audiocall=()=>{
   const [acceptCall,setAcceptCall]=React.useState(false)
   const [disconnectCall,setDisconnectCall]=React.useState(false)
   const [startTime,setStartTime]=React.useState("")
   const [rating,setRating]=React.useState()
   const [creator,setCreator]=React.useState("")
   const [elapsedTime, setElapsedTime] = React.useState({ minutes: 0, seconds: 0 });

   const [endTime,setEndTime]=React.useState("")
const [isMuted,setIsMuted]=React.useState(false)
   const location=useLocation();
   const navigate=useNavigate();
   const dispatch=useDispatch()
React.useEffect(()=>{
   let search=location.search;
   let params=new URLSearchParams(search)
   setCreator(params.get('creator'))
   let start_time=params.get('start_time')
   let end_time=params.get('end_time')
   
   setStartTime(start_time)
   setEndTime(end_time)
},[])

const calculateTimeDifferenceInMinutes = (start, end) => {
   const startTime = new Date(`01/01/2000 ${start}`);
   const endTime = new Date(`01/01/2000 ${end}`);
   return (endTime - startTime) / 60000; // Convert milliseconds to minutes
};

const setRedirectTimeout = (start_time, end_time, creatorid) => {
//    const diffInMinutes = calculateTimeDifferenceInMinutes(start_time, end_time);
//    const delayInMillis = diffInMinutes * 60000; // Convert minutes to milliseconds
// console.log('delay in millis')
// console.log(delayInMillis)
// console.log(diffInMinutes)
//    setTimeout(() => {
//       let search=location.search;
//       let params=new URLSearchParams(search)
//       let creatorid=params.get('creator')
//             // window.location.href=`/messenger`
//             // userdisconnected(creatorid);
      
//    }, delayInMillis);
    // Parse the end time into a Date object
    const endTime = new Date(`01/01/2000 ${end_time}`);
    // Get the current time
    const currentTime = new Date();

    // Ensure the end time is set for today
    endTime.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

    // Calculate the delay in milliseconds
    let delayInMillis = endTime.getTime() - currentTime.getTime();

    // If the end time has already passed or is now, execute immediately
    if (delayInMillis <= 0) {
      //   window.location.href = `/messenger`;
      //   userdisconnected(creatorid);
    } else {
        // Set the timeout to wait until the end time
        setTimeout(() => {
            // window.location.href = `/messenger`;
            // userdisconnected(creatorid);
        }, delayInMillis);
    }

};



const calculateTimeDifference = (start, end) => {
   const startDate = new Date(`01/01/2000 ${start}`);
   const endDate = new Date(`01/01/2000 ${end}`);
   return endDate - startDate;
};

const updateElapsedTime = (startTime, endTime) => {
   const diff = calculateTimeDifference(startTime, endTime);
   let elapsed = 0;

   const interval = setInterval(() => {
       elapsed += 1000;
       const minutesPassed = Math.floor(elapsed / 60000);
       const secondsPassed = Math.floor((elapsed % 60000) / 1000);
       setElapsedTime({ minutes: minutesPassed, seconds: secondsPassed });

       if (elapsed >= diff) clearInterval(interval);
   }, 1000);

   return () => clearInterval(interval);
};

   const acceptcall=()=>{
let search=location.search;
let params=new URLSearchParams(search)
let creatorid=params.get('creator')
let audio=params.get('audio_call')
let audiodata={
    user:store.getState().authenticationslices?.user?.user?._id,
    creator:creatorid
}

   if(audio){
      let search=location.search;
      let params=new URLSearchParams(search)
      let start_time=params.get('start_time')
      let end_time=params.get('end_time')
      let creatorid=params.get('creator')
      setRedirectTimeout(start_time, end_time, creatorid);
      setStartTime(start_time);
      setEndTime(end_time);
      const cancelInterval = updateElapsedTime(start_time, end_time);
   
    setTimeout(()=>{
      getLocalPreviewAndInitRoomConnection(audiodata)
    },7000)
   
   }

   }

   const muteunmute=()=>{
      setIsMuted(!isMuted)
      muteAudio(!isMuted)
   }
  
   const handledisconnection=()=>{
      let search=location.search;
let params=new URLSearchParams(search)
let creatorid=params.get('creator')
    
      userdisconnected(creatorid);
setDisconnectCall(true)

   }

const declinecall=()=>{
   let search=location.search;
   let params=new URLSearchParams(search)
   let creatorid=params.get('creator')
   window.location.href=`/chat?creator=${creatorid}`
   declineCall(creatorid)
}
const giverating=async()=>{
   let data={
      creator:creator,
      rating:rating
   }
   let ratingres=await dispatch(saveRating(data))
   if(saveRating.fulfilled.match(ratingres)){
      console.log('ratingres')
      console.log(ratingres)
      navigate('/messenger')
   }
   if(saveRating.rejected.match(ratingres)){
      console.log('ratingres')
      toastr.error(ratingres.payload.data.error)
      console.log(ratingres)
   }
}
   return(
        <div className="audio-call-div">
             <div className="audio-stream hidden">

</div>
        {disconnectCall?<div className="audio-call-review-div flex flex-col">
            <p>Comment s’est passé l’appel ?</p>
    <div className="flex flex-row">

<Review setRatingtwo={setRating} totalStars={5}/>

        </div>
        <button onClick={giverating}>
        Confirmer
        </button>
        </div>:<div className="audiocall">
<img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"/>
<p>Jade Be</p>
<p>Développement personnel</p>
<p>Heure de début : {startTime}</p>
<p>
Heure de fin :  {endTime}</p>
<p style={{width:'25rem',textAlign:'center',fontWeight:'bolder',color:'#CACBDB'}}>
{acceptCall ? (
    <p className='timepara'>
        Temps restant<span style={{color:'#CACBDB',fontWeight:'bolder'}} className="mx-1">:</span>
        {elapsedTime.minutes} minutes {elapsedTime.seconds} secondes
    </p>
) : ''}
</p>
<div className="audio-call-button-div flex flex-row">
   {acceptCall?<>
   <div className="mute-unmute-audio">
      {isMuted==true?<>
         <svg style={{width:'36px !important',height:'50px !important'}} onClick={muteunmute} width="36" height="36" fill="#ffffff" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M542.86 294.4L362.3 430a10.72 10.72 0 0 0-2.71 3.25H255.53v153.2h104.06a10.58 10.58 0 0 0 2.71 3.25l180.56 135.52a10.83 10.83 0 0 0 17.34-8.66v-413.5a10.83 10.83 0 0 0-17.34-8.66zM742.6 599.41L765 577l-67.2-67.2 67.2-67.2-22.4-22.4-67.2 67.2-67.2-67.2-22.4 22.4 67.2 67.2-67.2 67.2 22.4 22.4 67.2-67.2 67.2 67.2z"></path></g></svg>
      </>:<svg onClick={muteunmute} width="20" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8219 5.69366L6.55735 9.90531H2.3457V16.2228H6.55735L11.8219 20.4344V5.69366Z" stroke="#F0E6E6" stroke-width="2.10582" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.3193 5.61945C22.2932 7.59395 23.4021 10.2716 23.4021 13.0635C23.4021 15.8555 22.2932 18.5331 20.3193 20.5076M16.6025 9.33622C17.5895 10.3235 18.1439 11.6623 18.1439 13.0583C18.1439 14.4542 17.5895 15.7931 16.6025 16.7803" stroke="#F0E6E6" stroke-width="2.10582" stroke-linecap="round" stroke-linejoin="round"/>
</svg>}


   </div>
<div  className="disconnect-call">
<svg onClick={handledisconnection} width="28" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_93_1530)">
<path d="M7.04983 21.7811L4.82313 19.5544C4.61557 19.3486 4.45331 19.1016 4.34672 18.8294C4.24013 18.5572 4.19157 18.2657 4.20414 17.9736C4.21672 17.6816 4.29016 17.3953 4.41975 17.1333C4.54935 16.8712 4.73225 16.6391 4.95673 16.4519C7.48889 14.4161 10.4633 13.0026 13.6409 12.325C16.5738 11.6713 19.6148 11.6713 22.5477 12.325C25.7385 13.007 28.7237 14.431 31.2616 16.4816C31.4854 16.6683 31.6678 16.8995 31.7974 17.1606C31.9269 17.4217 32.0006 17.7069 32.0139 17.9981C32.0272 18.2892 31.9797 18.5799 31.8744 18.8517C31.7692 19.1235 31.6085 19.3704 31.4026 19.5767L29.1759 21.8034C28.8192 22.1672 28.3425 22.3888 27.8344 22.427C27.3264 22.4653 26.8219 22.3175 26.4148 22.0112C25.6082 21.3926 24.7342 20.8672 23.8095 20.4451C23.444 20.2793 23.1337 20.0122 22.9153 19.6754C22.6969 19.3387 22.5797 18.9463 22.5774 18.545L22.5774 16.6597C19.6626 15.8581 16.5854 15.8581 13.6706 16.6597L13.6706 18.545C13.6683 18.9464 13.5511 19.3387 13.3327 19.6754C13.1143 20.0122 12.804 20.2793 12.4385 20.4451C11.5138 20.8672 10.6398 21.3926 9.83322 22.0112C9.4218 22.3209 8.91091 22.4686 8.39771 22.4262C7.88452 22.3837 7.40481 22.1542 7.04983 21.7811Z" stroke="#F0E7E7" stroke-width="2.09936" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_93_1530">
<rect width="25.1923" height="25.1923" fill="white" transform="translate(35.9385 18.0104) rotate(135)"/>
</clipPath>
</defs>
</svg>

</div>
   </>:<>
   <button onClick={declinecall} className="flex flex-row">
    <svg width="27" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_93_1316)">
<path d="M6.48095 20.5006L4.36614 18.3858C4.16902 18.1902 4.0149 17.9557 3.91367 17.6972C3.81244 17.4386 3.76632 17.1618 3.77826 16.8844C3.79021 16.607 3.85996 16.3352 3.98304 16.0863C4.10612 15.8374 4.27983 15.617 4.49303 15.4391C6.89794 13.5056 9.72286 12.1632 12.7408 11.5197C15.5264 10.8987 18.4145 10.8987 21.2 11.5197C24.2304 12.1673 27.0657 13.5198 29.476 15.4673C29.6886 15.6446 29.8619 15.8643 29.9849 16.1122C30.1079 16.3602 30.1779 16.6311 30.1905 16.9076C30.2031 17.1841 30.158 17.4602 30.0581 17.7184C29.9581 17.9765 29.8055 18.211 29.6099 18.4069L27.4951 20.5217C27.1564 20.8672 26.7036 21.0777 26.2211 21.114C25.7386 21.1503 25.2594 21.01 24.8728 20.7191C24.1067 20.1316 23.2767 19.6326 22.3984 19.2317C22.0513 19.0742 21.7565 18.8205 21.5491 18.5007C21.3417 18.1808 21.2304 17.8082 21.2282 17.427L21.2282 15.6365C18.4599 14.8752 15.5374 14.8752 12.769 15.6365L12.769 17.427C12.7669 17.8082 12.6555 18.1808 12.4481 18.5007C12.2407 18.8205 11.946 19.0742 11.5988 19.2317C10.7206 19.6326 9.89051 20.1316 9.12447 20.7191C8.73372 21.0132 8.24851 21.1535 7.7611 21.1132C7.27369 21.0729 6.81809 20.8549 6.48095 20.5006Z" stroke="#F0E7E7" stroke-width="1.99386" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_93_1316">
<rect width="23.9264" height="23.9264" fill="white" transform="translate(33.918 16.9192) rotate(135)"/>
</clipPath>
</defs>
</svg>
<span>
Décliner 
</span>
    </button>

    <button onClick={()=>{setAcceptCall(true);acceptcall();}}  className="flex flex-row">
    <svg width="27" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_93_1316)">
<path d="M6.48095 20.5006L4.36614 18.3858C4.16902 18.1902 4.0149 17.9557 3.91367 17.6972C3.81244 17.4386 3.76632 17.1618 3.77826 16.8844C3.79021 16.607 3.85996 16.3352 3.98304 16.0863C4.10612 15.8374 4.27983 15.617 4.49303 15.4391C6.89794 13.5056 9.72286 12.1632 12.7408 11.5197C15.5264 10.8987 18.4145 10.8987 21.2 11.5197C24.2304 12.1673 27.0657 13.5198 29.476 15.4673C29.6886 15.6446 29.8619 15.8643 29.9849 16.1122C30.1079 16.3602 30.1779 16.6311 30.1905 16.9076C30.2031 17.1841 30.158 17.4602 30.0581 17.7184C29.9581 17.9765 29.8055 18.211 29.6099 18.4069L27.4951 20.5217C27.1564 20.8672 26.7036 21.0777 26.2211 21.114C25.7386 21.1503 25.2594 21.01 24.8728 20.7191C24.1067 20.1316 23.2767 19.6326 22.3984 19.2317C22.0513 19.0742 21.7565 18.8205 21.5491 18.5007C21.3417 18.1808 21.2304 17.8082 21.2282 17.427L21.2282 15.6365C18.4599 14.8752 15.5374 14.8752 12.769 15.6365L12.769 17.427C12.7669 17.8082 12.6555 18.1808 12.4481 18.5007C12.2407 18.8205 11.946 19.0742 11.5988 19.2317C10.7206 19.6326 9.89051 20.1316 9.12447 20.7191C8.73372 21.0132 8.24851 21.1535 7.7611 21.1132C7.27369 21.0729 6.81809 20.8549 6.48095 20.5006Z" stroke="#F0E7E7" stroke-width="1.99386" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_93_1316">
<rect width="23.9264" height="23.9264" fill="white" transform="translate(33.918 16.9192) rotate(135)"/>
</clipPath>
</defs>
</svg>
<span className='cursor-pointer'>
Accepter
</span>
    </button>
   </>}
</div>
        </div>}
        </div>
    )
}
export default Audiocall;