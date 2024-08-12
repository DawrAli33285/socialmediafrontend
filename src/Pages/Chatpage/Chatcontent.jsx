import React from "react";
import "./chatpage.css"
import socketContext from "../../context/Socketcontext";
import { useContext } from "react";
import {useDispatch} from 'react-redux'
import { getLocalPreviewAndInitRoomConnection, prepareConnection} from '../../Webrtc/webrtc'
import {store} from '../../redux/store/store'
import { Link, useLocation,useNavigate } from "react-router-dom";
import AudioPlayer from "../../common/AudioPlayer/AudioPlayer";
import { sendMessage,getMessages,seenMessages } from "../../redux/slices/messengerslice";
const Chatcontent=({isAudioCall,setIsAudioCall})=>{
    const navigate=useNavigate();
const [messages,setMessages]=React.useState()
const [message,setMessage]=React.useState("")
const [creator_data,setCreator_Data]=React.useState()
const [creator,setCreator]=React.useState("")
const location=useLocation();
const dispatch=useDispatch();
const socketcontext=useContext(socketContext);
React.useEffect(()=>{
fetchMessages();
socketMessage();
return () => {
    socketcontext?.current?.off('sendMessage');
  };
},[socketcontext?.current])

function formatTime(createdAt) {
    const date = new Date(createdAt);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}


React.useEffect(()=>{
    console.log('conn-init')
    console.log(socketcontext)
  
},[socketcontext?.current])

const socketMessage=()=>{


 socketcontext?.current?.on('sendMessage',(data)=>{
    console.log('socket send message data')
    console.log(data)
    const updatedData = {
        ...data,
        createdAt: new Date().toISOString(), // Add or update the 'createdAt' property
        seen: true // Add or update the 'seen' property
    };
    
    setMessages((prevMessages) => {
        if(prevMessages?.length>0){
         return   [...prevMessages, updatedData]
        }else{
            return [updatedData]
        }
    });
//     setMessages((prev)=>{
//         if(prev.length>0){
// let old=[...prev]
// old=[...old,data]
// return old
//         }else{
//             return data
//         }
//     })
 })

}

const fetchMessages=async()=>{
    let search=location.search
let params=new URLSearchParams(search)
let creatorid=params.get('creator')


setCreator(creatorid)
let data={
    creator:creatorid,
}
let res=await dispatch(getMessages(data))
if(getMessages.rejected.match(res)){
    console.log('getres')
    console.log(res)
}
if(getMessages.fulfilled.match(res)){
    console.log('getres')
    console.log(res)
    let search=location.search
let params=new URLSearchParams(search)
let creatorid=params.get('creator')
let creatorname=params.get('name')
    setMessages(res.payload.messages)
    setCreator_Data({
        _id:creatorid,
        name:creatorname
    })
}
}

const messageSend=async()=>{
let search=location.search
let params=new URLSearchParams(search)
let creatorid=params.get('creator')
let audio=params.get('audio_call')
if(audio){
    setIsAudioCall(true)
}
let data={
    creator:creatorid,
    text:message
}
let res=await dispatch(sendMessage(data))
if(sendMessage.rejected.match(res)){
    console.log('res')
    console.log(res)
}
if(sendMessage.fulfilled.match(res)){
    setMessage('')
    console.log('res')
    console.log(res)
    let socketData={
        user:store.getState().authenticationslices?.user?.user?._id,
        message:{
            audio:null,
            premium:false,
            text:data.text
        },
        createdAt: new Date().toISOString(),
        seen:true,
        creator:data.creator,
        sender:store.getState().authenticationslices?.user?.user?._id,
        reciever:data.creator
        
     }
    
     socketcontext?.current?.emit('sendMessage',socketData)
     
     socketcontext?.current?.on('seenMessages', async(data) => {
     
   let user={
    user:data.user
   }
        let seenres=await dispatch(seenMessages(user))
       if(seenMessages.rejected.match(seenres)){
        console.log('seenres')
        console.log(seenres)
       }
       if(seenMessages.fulfilled.match(seenres)){
        console.log('seenres')

        setMessages((prevMessages) => {
            if (!prevMessages || !Array.isArray(prevMessages)) {
                return [];
            }
    
            // Update the 'seen' property of each message to true
            return prevMessages.map(message => ({
                ...message,
                seen: true
            }));
        });
       }
    });
    console.log(socketcontext)
    setMessages((prev) => {
        // Ensure the previous state is an array, defaulting to an empty one if it's not
        let previousMessages = Array.isArray(prev) ? prev : [];
        let newmessage=res.payload.newresponse;
        // Return the new state by concatenating the new message
        return [...previousMessages, newmessage];
      });
}
}

    return(
        <div style={{paddingLeft:'0.5rem',paddingTop:'2rem',justifyContent:'flex-start',alignItems:'flex-start',overflow:'auto'}} className="chatcontent-div relative">
 <div className="flex flex-row chat-first-row">
    <div className="flex flex-row chat-firstrow-partone">
<div className="flex flex-row">
<Link to='/messenger'>
<svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66046 20.9999C9.41322 21.0007 9.16894 20.9512 8.94557 20.8552C8.72219 20.7591 8.52539 20.619 8.36964 20.4449L0.37647 11.4458C0.133064 11.1774 0 10.8408 0 10.4934C0 10.146 0.133064 9.80935 0.37647 9.54098L8.65097 0.541827C8.93187 0.235531 9.33552 0.0429128 9.77312 0.00634665C10.2107 -0.0302195 10.6464 0.0922618 10.9844 0.346846C11.3223 0.601429 11.5349 0.967262 11.5752 1.36386C11.6156 1.76047 11.4804 2.15535 11.1995 2.46165L3.80211 10.5009L10.9513 18.5401C11.1536 18.7603 11.2822 19.0284 11.3217 19.3127C11.3612 19.597 11.3101 19.8856 11.1743 20.1443C11.0385 20.4031 10.8237 20.6212 10.5555 20.7728C10.2872 20.9244 9.9766 21.0032 9.66046 20.9999Z" fill="white"/>
</svg>
</Link>
<p>Retour</p>
</div>
<div className="flex flex-row space-x-2">
    <p>{creator_data?.name}</p>
    <svg style={{marginTop:'3%'}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3366 9.16763C15.0778 8.82608 14.9384 8.41509 14.9384 7.99333C14.9384 7.57157 15.0778 7.16058 15.3366 6.81903L15.8672 6.11845C15.932 6.0329 15.9747 5.93385 15.9917 5.82945C16.0087 5.72506 15.9995 5.61829 15.9649 5.51795C15.9299 5.41867 15.8714 5.32845 15.7939 5.25438C15.7164 5.1803 15.622 5.12436 15.5181 5.09093L14.6595 4.82405C14.2389 4.69436 13.8723 4.4403 13.6126 4.09851C13.3528 3.75672 13.2135 3.3449 13.2145 2.92248V2.05509C13.2144 1.94978 13.1883 1.84599 13.1382 1.75219C13.0881 1.6584 13.0155 1.57727 12.9263 1.51545C12.8371 1.45362 12.7338 1.41286 12.625 1.39648C12.5162 1.38011 12.4048 1.38859 12.3001 1.42124L11.4345 1.68812C11.0142 1.8181 10.5618 1.81775 10.1418 1.68713C9.72176 1.55651 9.35571 1.3023 9.09596 0.960856L8.56543 0.260277C8.49769 0.179082 8.41168 0.113519 8.31379 0.0684593C8.2159 0.0233992 8.10865 0 8 0C7.89135 0 7.7841 0.0233992 7.68621 0.0684593C7.58832 0.113519 7.50231 0.179082 7.43457 0.260277L6.90404 0.960856C6.64429 1.3023 6.27824 1.55651 5.85824 1.68713C5.43823 1.81775 4.98576 1.8181 4.56553 1.68812L3.69994 1.42124C3.59519 1.38859 3.48384 1.38011 3.375 1.39648C3.26616 1.41286 3.16292 1.45362 3.07373 1.51545C2.98453 1.57727 2.91192 1.6584 2.86182 1.75219C2.81172 1.84599 2.78556 1.94978 2.78548 2.05509V2.92248C2.78655 3.3449 2.64716 3.75672 2.38744 4.09851C2.12772 4.4403 1.7611 4.69436 1.34049 4.82405L0.481872 5.09093C0.377994 5.12436 0.283613 5.1803 0.20611 5.25438C0.128607 5.32845 0.0700819 5.41867 0.0351118 5.51795C0.000495946 5.61829 -0.00869493 5.72506 0.00829554 5.82945C0.025286 5.93385 0.0679721 6.0329 0.13284 6.11845L0.663368 6.81903C0.92224 7.16058 1.06162 7.57157 1.06162 7.99333C1.06162 8.41509 0.92224 8.82608 0.663368 9.16763L0.13284 9.86821C0.0679721 9.95376 0.025286 10.0528 0.00829554 10.1572C-0.00869493 10.2616 0.000495946 10.3684 0.0351118 10.4687C0.0700819 10.568 0.128607 10.6582 0.20611 10.7323C0.283613 10.8064 0.377994 10.8623 0.481872 10.8957L1.34049 11.1626C1.7611 11.2923 2.12772 11.5464 2.38744 11.8882C2.64716 12.2299 2.78655 12.6418 2.78548 13.0642V13.9316C2.78556 14.0369 2.81172 14.1407 2.86182 14.2345C2.91192 14.3283 2.98453 14.4094 3.07373 14.4712C3.16292 14.533 3.26616 14.5738 3.375 14.5902C3.48384 14.6066 3.59519 14.5981 3.69994 14.5654L4.55855 14.2985C4.97968 14.1664 5.43385 14.1656 5.85546 14.2963C6.27708 14.4271 6.64429 14.6825 6.90404 15.0258L7.43457 15.7264C7.49974 15.8112 7.58489 15.8802 7.68312 15.9277C7.78135 15.9752 7.8899 16 8 16C8.1101 16 8.21865 15.9752 8.31688 15.9277C8.41511 15.8802 8.50026 15.8112 8.56543 15.7264L9.09596 15.0258C9.35614 14.683 9.72338 14.4279 10.1448 14.2972C10.5663 14.1666 11.0203 14.167 11.4414 14.2985L12.3001 14.5654C12.4048 14.5981 12.5162 14.6066 12.625 14.5902C12.7338 14.5738 12.8371 14.533 12.9263 14.4712C13.0155 14.4094 13.0881 14.3283 13.1382 14.2345C13.1883 14.1407 13.2144 14.0369 13.2145 13.9316V13.0642C13.2135 12.6418 13.3528 12.2299 13.6126 11.8882C13.8723 11.5464 14.2389 11.2923 14.6595 11.1626L15.5181 10.8957C15.622 10.8623 15.7164 10.8064 15.7939 10.7323C15.8714 10.6582 15.9299 10.568 15.9649 10.4687C15.9995 10.3684 16.0087 10.2616 15.9917 10.1572C15.9747 10.0528 15.932 9.95376 15.8672 9.86821L15.3366 9.16763ZM11.2879 7.13062L7.79756 10.4667C7.66666 10.5918 7.48913 10.6621 7.30403 10.6621C7.11893 10.6621 6.94141 10.5918 6.8105 10.4667L4.71632 8.46505C4.64964 8.40351 4.59646 8.32988 4.55988 8.24848C4.52329 8.16708 4.50404 8.07952 4.50323 7.99093C4.50243 7.90234 4.52009 7.81448 4.55519 7.73248C4.59029 7.65048 4.64212 7.57598 4.70766 7.51334C4.77321 7.45069 4.85115 7.40115 4.93694 7.3676C5.02272 7.33405 5.11465 7.31717 5.20733 7.31794C5.30002 7.31871 5.39162 7.33712 5.47679 7.37208C5.56195 7.40705 5.63898 7.45788 5.70338 7.52161L7.30194 9.05154L10.2987 6.18717C10.4304 6.06563 10.6067 5.99838 10.7897 5.9999C10.9728 6.00142 11.1478 6.07159 11.2773 6.1953C11.4067 6.31901 11.4801 6.48635 11.4817 6.6613C11.4833 6.83624 11.4129 7.00478 11.2858 7.13062H11.2879Z" fill="#5991C6"/>
</svg>

</div>
    </div>
    <div className="flex flex-row chat-audioicon">
<button onClick={()=>navigate(`/schedule?id=${creator_data?._id}&name=${creator_data?.name}`)} className="chat-call">
Réserver un appel
</button>
    </div>
 </div>
 
   <p style={{width:'98%',display:'flex',justifyContent:'center',alignItems:'center'}}>6 September 2023</p>
{messages?.map((m,i)=>{

  return m.sender.toString()==creator.toString()?m?.message?.audio?<div className="chat-creator-messagediv flex">
  <div className="chat-creator-avatar">
  <img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"/>
  </div>
  <div className="creator-audio-message flex flex-col relative">
  <div className="flex time-seen flex-row absolute space-x-2 justify-center items-center" style={{width:'82%',marginTop:'12%',justifyContent:'flex-end',alignItems:'flex-end'}}>
  <p>{formatTime(m.createdAt)}</p>
  {m?.seen==false?<svg width="30" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.03033 11.4697C4.73744 11.1768 4.26256 11.1768 3.96967 11.4697C3.67678 11.7626 3.67678 12.2374 3.96967 12.5303L5.03033 11.4697ZM8.5 16L7.96967 16.5303C8.26256 16.8232 8.73744 16.8232 9.03033 16.5303L8.5 16ZM17.0303 8.53033C17.3232 8.23744 17.3232 7.76256 17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967L17.0303 8.53033ZM9.03033 11.4697C8.73744 11.1768 8.26256 11.1768 7.96967 11.4697C7.67678 11.7626 7.67678 12.2374 7.96967 12.5303L9.03033 11.4697ZM12.5 16L11.9697 16.5303C12.2626 16.8232 12.7374 16.8232 13.0303 16.5303L12.5 16ZM21.0303 8.53033C21.3232 8.23744 21.3232 7.76256 21.0303 7.46967C20.7374 7.17678 20.2626 7.17678 19.9697 7.46967L21.0303 8.53033ZM3.96967 12.5303L7.96967 16.5303L9.03033 15.4697L5.03033 11.4697L3.96967 12.5303ZM9.03033 16.5303L17.0303 8.53033L15.9697 7.46967L7.96967 15.4697L9.03033 16.5303ZM7.96967 12.5303L11.9697 16.5303L13.0303 15.4697L9.03033 11.4697L7.96967 12.5303ZM13.0303 16.5303L21.0303 8.53033L19.9697 7.46967L11.9697 15.4697L13.0303 16.5303Z" fill="#646262"></path> </g></svg>:<svg width="17" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5303 0.784459C15.8232 1.10384 15.8232 1.62166 15.5303 1.94104L5.53033 12.8454C5.38968 12.9988 5.19891 13.0849 5 13.0849C4.80109 13.0849 4.61032 12.9988 4.46967 12.8454L0.469668 8.48361C0.176777 8.16423 0.176777 7.64649 0.469668 7.3271C0.762558 7.00771 1.23744 7.00771 1.53033 7.3271L5 11.1105L14.4697 0.784459C14.7626 0.465082 15.2374 0.465082 15.5303 0.784459ZM21.5303 0.784448C21.8232 1.10381 21.8232 1.62164 21.5303 1.94103L11.5308 12.8454C11.2379 13.1647 10.7631 13.1647 10.4702 12.8455L8.96975 11.2098C8.67681 10.8905 8.67674 10.3727 8.96959 10.0532C9.2624 9.7338 9.7373 9.73369 10.0303 10.0531L11.0004 11.1106L20.4697 0.78447C20.7625 0.465082 21.2374 0.465071 21.5303 0.784448Z" fill="#5E94FF"/>
  </svg>}

  </div>
  <AudioPlayer text={m.message.text} prem={m.message.premium} audioUrl={m?.message?.audio}/>
 {m.message.premium==true? <div className="flex flex-col space-y-3">
  <p style={{color:'#5991C6'}}>6,00€</p>
  <div className="flex chat-prem-audi-buttons flex-row">
  
  <button>Accepter</button>
  <button>Non</button>
  </div>
  </div>:''}
  </div>
  <div>
      
  </div>
  </div>:<div className="chat-creator-messagediv flex">
  <div className="chat-creator-avatar">
  <img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"/>
  </div>
  <div className="creator-message relative">
  <div className="flex time-seen flex-row absolute space-x-2 justify-center items-center" style={{width:'98%',justifyContent:'flex-end',alignItems:'flex-end'}}>
  <p>{formatTime(m.createdAt)}</p>
  {m?.seen==false?<svg width="30" height="20" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.03033 11.4697C4.73744 11.1768 4.26256 11.1768 3.96967 11.4697C3.67678 11.7626 3.67678 12.2374 3.96967 12.5303L5.03033 11.4697ZM8.5 16L7.96967 16.5303C8.26256 16.8232 8.73744 16.8232 9.03033 16.5303L8.5 16ZM17.0303 8.53033C17.3232 8.23744 17.3232 7.76256 17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967L17.0303 8.53033ZM9.03033 11.4697C8.73744 11.1768 8.26256 11.1768 7.96967 11.4697C7.67678 11.7626 7.67678 12.2374 7.96967 12.5303L9.03033 11.4697ZM12.5 16L11.9697 16.5303C12.2626 16.8232 12.7374 16.8232 13.0303 16.5303L12.5 16ZM21.0303 8.53033C21.3232 8.23744 21.3232 7.76256 21.0303 7.46967C20.7374 7.17678 20.2626 7.17678 19.9697 7.46967L21.0303 8.53033ZM3.96967 12.5303L7.96967 16.5303L9.03033 15.4697L5.03033 11.4697L3.96967 12.5303ZM9.03033 16.5303L17.0303 8.53033L15.9697 7.46967L7.96967 15.4697L9.03033 16.5303ZM7.96967 12.5303L11.9697 16.5303L13.0303 15.4697L9.03033 11.4697L7.96967 12.5303ZM13.0303 16.5303L21.0303 8.53033L19.9697 7.46967L11.9697 15.4697L13.0303 16.5303Z" fill="#646262"></path> </g></svg>:<svg width="17" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5303 0.784459C15.8232 1.10384 15.8232 1.62166 15.5303 1.94104L5.53033 12.8454C5.38968 12.9988 5.19891 13.0849 5 13.0849C4.80109 13.0849 4.61032 12.9988 4.46967 12.8454L0.469668 8.48361C0.176777 8.16423 0.176777 7.64649 0.469668 7.3271C0.762558 7.00771 1.23744 7.00771 1.53033 7.3271L5 11.1105L14.4697 0.784459C14.7626 0.465082 15.2374 0.465082 15.5303 0.784459ZM21.5303 0.784448C21.8232 1.10381 21.8232 1.62164 21.5303 1.94103L11.5308 12.8454C11.2379 13.1647 10.7631 13.1647 10.4702 12.8455L8.96975 11.2098C8.67681 10.8905 8.67674 10.3727 8.96959 10.0532C9.2624 9.7338 9.7373 9.73369 10.0303 10.0531L11.0004 11.1106L20.4697 0.78447C20.7625 0.465082 21.2374 0.465071 21.5303 0.784448Z" fill="#5E94FF"/>
  </svg>}
  </div>
  <p>
  {m.message.text}
  </p>
  
  </div>
  </div>
  :<div key={i.toString()} className="chat-user-message" style={{width:'100%'}}>

  <div className="flex flex-row userchat-message-avatar-div">
      <div className="userchat-message flex flex-col relative">
  <div className="flex time-seen flex-row absolute space-x-2 justify-center items-center" style={{width:'98%',justifyContent:'flex-end',alignItems:'flex-end'}}>
  <p>{formatTime(m.createdAt)}</p>
  {m?.seen==false?<svg width="30" height="20"  viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5.03033 11.4697C4.73744 11.1768 4.26256 11.1768 3.96967 11.4697C3.67678 11.7626 3.67678 12.2374 3.96967 12.5303L5.03033 11.4697ZM8.5 16L7.96967 16.5303C8.26256 16.8232 8.73744 16.8232 9.03033 16.5303L8.5 16ZM17.0303 8.53033C17.3232 8.23744 17.3232 7.76256 17.0303 7.46967C16.7374 7.17678 16.2626 7.17678 15.9697 7.46967L17.0303 8.53033ZM9.03033 11.4697C8.73744 11.1768 8.26256 11.1768 7.96967 11.4697C7.67678 11.7626 7.67678 12.2374 7.96967 12.5303L9.03033 11.4697ZM12.5 16L11.9697 16.5303C12.2626 16.8232 12.7374 16.8232 13.0303 16.5303L12.5 16ZM21.0303 8.53033C21.3232 8.23744 21.3232 7.76256 21.0303 7.46967C20.7374 7.17678 20.2626 7.17678 19.9697 7.46967L21.0303 8.53033ZM3.96967 12.5303L7.96967 16.5303L9.03033 15.4697L5.03033 11.4697L3.96967 12.5303ZM9.03033 16.5303L17.0303 8.53033L15.9697 7.46967L7.96967 15.4697L9.03033 16.5303ZM7.96967 12.5303L11.9697 16.5303L13.0303 15.4697L9.03033 11.4697L7.96967 12.5303ZM13.0303 16.5303L21.0303 8.53033L19.9697 7.46967L11.9697 15.4697L13.0303 16.5303Z" fill="#646262"></path> </g></svg>:<svg width="17" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5303 0.784459C15.8232 1.10384 15.8232 1.62166 15.5303 1.94104L5.53033 12.8454C5.38968 12.9988 5.19891 13.0849 5 13.0849C4.80109 13.0849 4.61032 12.9988 4.46967 12.8454L0.469668 8.48361C0.176777 8.16423 0.176777 7.64649 0.469668 7.3271C0.762558 7.00771 1.23744 7.00771 1.53033 7.3271L5 11.1105L14.4697 0.784459C14.7626 0.465082 15.2374 0.465082 15.5303 0.784459ZM21.5303 0.784448C21.8232 1.10381 21.8232 1.62164 21.5303 1.94103L11.5308 12.8454C11.2379 13.1647 10.7631 13.1647 10.4702 12.8455L8.96975 11.2098C8.67681 10.8905 8.67674 10.3727 8.96959 10.0532C9.2624 9.7338 9.7373 9.73369 10.0303 10.0531L11.0004 11.1106L20.4697 0.78447C20.7625 0.465082 21.2374 0.465071 21.5303 0.784448Z" fill="#5E94FF"/>
  </svg>}
  </div>
  <p>{m?.message?.text}</p>
      </div>
      <div className="chat-user-avatar">
  <img src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"/>
      </div>
  </div>
  
  </div>
})}




<div className="chat-enter-message relative">
<input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="Écrire un message..."></input>
<button onClick={messageSend} className="chat-send-message-button">
<svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_810_5508)">
<path d="M34.9429 19.0595L17.4722 19.0595" stroke="white" stroke-width="1.68459" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M34.9416 19.0591L13.5002 29.3827L17.4708 19.0591L13.5002 8.73551L34.9416 19.0591Z" stroke="white" stroke-width="1.68459" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_810_5508">
<rect width="26.9535" height="26.9535" fill="white" transform="translate(19.0591) rotate(45)"/>
</clipPath>
</defs>
</svg>

</button>
</div>
    </div>
    )
}
export default Chatcontent;