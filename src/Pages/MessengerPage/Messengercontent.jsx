import React from "react";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import {useDispatch} from 'react-redux'
import { Link,useNavigate } from "react-router-dom";
import { getConversation } from "../../redux/slices/messengerslice";
const Messengercontent=()=>{
    const dispatch=useDispatch();
    const [creators,setCreators]=React.useState()
    const [messages,setMessages]=React.useState()
    React.useEffect(() => {
        console.log("useEffect called");
        fetchconversation();
    }, []);
const fetchconversation=async()=>{
let res=await dispatch(getConversation())
if(getConversation.rejected.match(res)){
    console.log('res')
console.log(res)
toastr.error(res.error)
}
if (getConversation.fulfilled.match(res)) {
    if (res.payload.creators) {
   
      const filteredCreators = res.payload.creators.filter(creator => creator !== null);
      console.log('messengerres');
      console.log(res);
      if (filteredCreators.length > 0) {
        setCreators(filteredCreators);
        setMessages(res.payload.messages);
      
      }
    }
  }
  
}

    const navigate=useNavigate();

    const getTimeSinceLastMessage = (creatorId) => {
        const lastMessage = messages?.filter(msg => msg?.creator === creatorId).pop();
        if (lastMessage) {
            const timeSent = new Date(lastMessage?.createdAt); // assuming createdAt is the timestamp of the message
            const timeNow = new Date();
            const differenceInMs = timeNow - timeSent;
            const differenceInHours = differenceInMs / (1000 * 60 * 60);
            if (differenceInHours < 24) {
                return `il y a ${differenceInHours.toFixed()} heures`;
            } else {
                const differenceInDays = differenceInHours / 24;
                return `il y a ${differenceInDays.toFixed()} jours`;
            }
        }
        return "Aucun message";
    };

    const checkExpiry = (record) => {
        console.log('Checking expiry for:', record);
    
        if (record?.expiray) {
            const expiryDate = new Date(record.expiray);
            const currentDate = new Date();
            
            console.log('Expiry Date:', expiryDate);
            console.log('Current Date:', currentDate);
    
            // Check if the current date is greater than or equal to the expiry date
            const isExpired = currentDate >= expiryDate;
            console.log('Is Expired:', isExpired);
    
            return isExpired;
        }
    
        // Assume not expired if there is no expiry date
        return true;
    };
    
    
    return(
        <div style={{justifyContent:'flex-start',alignItems:'center',overflow:'auto'}} className="messengercontent-div">
         
           {creators?.map((creator,i)=>{
             const hasExpiry = creator.expiray ? checkExpiry(creator) : true;
             
          console.log('messenger creator')
          console.log(creator)
            return  <div  className="messenger-profile flex flex-row items-center relative">
                {
                    !hasExpiry ? (
                        // Render if expiry exists
                    ''
                    ) : (
                        // Render if no expiry
                        <div onClick={(e)=>navigate(`/subinfo?id=${creator?.creator?._id}&name=${creator?.creator?.name}&price=50.99€`)} className="messenger-lock cursor-pointer">
                  <div className="messenger-locksvg-div cursor-pointer">
                  <svg className="cursor-pointer" width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7192 6.6981V4.8113C12.7192 2.16979 10.6438 0.0943222 8.00225 0.0943222C5.36074 0.0943222 3.28527 2.16979 3.28527 4.8113V6.6981C1.68149 6.6981 0.455078 7.92451 0.455078 9.52828V16.1321C0.455078 17.7358 1.68149 18.9622 3.28527 18.9622H12.7192C14.323 18.9622 15.5494 17.7358 15.5494 16.1321V9.52828C15.5494 7.92451 14.323 6.6981 12.7192 6.6981ZM5.17206 4.8113C5.17206 3.20753 6.39847 1.98111 8.00225 1.98111C9.60602 1.98111 10.8324 3.20753 10.8324 4.8113V6.6981H5.17206V4.8113ZM8.94564 14.2453C8.94564 14.8113 8.56829 15.1887 8.00225 15.1887C7.43621 15.1887 7.05885 14.8113 7.05885 14.2453V11.4151C7.05885 10.849 7.43621 10.4717 8.00225 10.4717C8.56829 10.4717 8.94564 10.849 8.94564 11.4151V14.2453Z" fill="#0C0E1C"/>
</svg>

                    </div>


                </div>
                    )
                }
            <img src="https://cdn.pixabay.com/photo/2023/11/29/12/29/kid-8419485_1280.jpg" alt=""></img>
            <div  className="flex flex-col justify-center messenger-textdiv">
        <p style={{width:'fit-content'}} className="flex flex-row space-x-1 items-center">
            <span>
            {creator?.name?creator?.name:creator?.creator?.name}
            </span>
            <svg className="verifiedicon-messenger" width="18" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1708 11.4595C18.8472 11.0326 18.673 10.5189 18.673 9.99166C18.673 9.46446 18.8472 8.95073 19.1708 8.52378L19.8339 7.64806C19.915 7.54113 19.9684 7.41731 19.9896 7.28682C20.0109 7.15632 19.9994 7.02287 19.9561 6.89744C19.9124 6.77333 19.8392 6.66057 19.7424 6.56797C19.6455 6.47537 19.5275 6.40545 19.3977 6.36367L18.3244 6.03006C17.7986 5.86796 17.3403 5.55037 17.0157 5.12314C16.691 4.6959 16.5168 4.18112 16.5182 3.6531V2.56887C16.5181 2.43723 16.4854 2.30748 16.4227 2.19024C16.3601 2.073 16.2693 1.97159 16.1578 1.89431C16.0463 1.81703 15.9173 1.76607 15.7812 1.7456C15.6452 1.72513 15.506 1.73574 15.3751 1.77654L14.2931 2.11015C13.7678 2.27262 13.2022 2.27219 12.6772 2.10891C12.1522 1.94563 11.6946 1.62788 11.3699 1.20107L10.7068 0.325346C10.6221 0.223853 10.5146 0.141899 10.3922 0.0855741C10.2699 0.029249 10.1358 0 10 0C9.86419 0 9.73012 0.029249 9.60776 0.0855741C9.4854 0.141899 9.37788 0.223853 9.29321 0.325346L8.63005 1.20107C8.30536 1.62788 7.84781 1.94563 7.32279 2.10891C6.79778 2.27219 6.2322 2.27262 5.70692 2.11015L4.62492 1.77654C4.49398 1.73574 4.3548 1.72513 4.21875 1.7456C4.0827 1.76607 3.95365 1.81703 3.84216 1.89431C3.73067 1.97159 3.6399 2.073 3.57727 2.19024C3.51465 2.30748 3.48195 2.43723 3.48185 2.56887V3.6531C3.48318 4.18112 3.30895 4.6959 2.9843 5.12314C2.65965 5.55037 2.20137 5.86796 1.67561 6.03006L0.602339 6.36367C0.472492 6.40545 0.354517 6.47537 0.257638 6.56797C0.160759 6.66057 0.0876024 6.77333 0.0438897 6.89744C0.000619933 7.02287 -0.0108687 7.15632 0.0103694 7.28682C0.0316075 7.41731 0.0849651 7.54113 0.166051 7.64806L0.82921 8.52378C1.1528 8.95073 1.32703 9.46446 1.32703 9.99166C1.32703 10.5189 1.1528 11.0326 0.82921 11.4595L0.166051 12.3353C0.0849651 12.4422 0.0316075 12.566 0.0103694 12.6965C-0.0108687 12.827 0.000619933 12.9605 0.0438897 13.0859C0.0876024 13.21 0.160759 13.3228 0.257638 13.4154C0.354517 13.508 0.472492 13.5779 0.602339 13.6197L1.67561 13.9533C2.20137 14.1154 2.65965 14.433 2.9843 14.8602C3.30895 15.2874 3.48318 15.8022 3.48185 16.3302V17.4145C3.48195 17.5461 3.51465 17.6758 3.57727 17.7931C3.6399 17.9103 3.73067 18.0117 3.84216 18.089C3.95365 18.1663 4.0827 18.2173 4.21875 18.2377C4.3548 18.2582 4.49398 18.2476 4.62492 18.2068L5.69819 17.8732C6.22459 17.708 6.79232 17.707 7.31933 17.8704C7.84634 18.0338 8.30536 18.3532 8.63005 18.7823L9.29321 19.658C9.37468 19.764 9.48111 19.8502 9.6039 19.9096C9.72668 19.969 9.86237 20 10 20C10.1376 20 10.2733 19.969 10.3961 19.9096C10.5189 19.8502 10.6253 19.764 10.7068 19.658L11.3699 18.7823C11.6952 18.3538 12.1542 18.0349 12.6811 17.8715C13.2079 17.7082 13.7753 17.7088 14.3018 17.8732L15.3751 18.2068C15.506 18.2476 15.6452 18.2582 15.7812 18.2377C15.9173 18.2173 16.0463 18.1663 16.1578 18.089C16.2693 18.0117 16.3601 17.9103 16.4227 17.7931C16.4854 17.6758 16.5181 17.5461 16.5182 17.4145V16.3302C16.5168 15.8022 16.691 15.2874 17.0157 14.8602C17.3403 14.433 17.7986 14.1154 18.3244 13.9533L19.3977 13.6197C19.5275 13.5779 19.6455 13.508 19.7424 13.4154C19.8392 13.3228 19.9124 13.21 19.9561 13.0859C19.9994 12.9605 20.0109 12.827 19.9896 12.6965C19.9684 12.566 19.915 12.4422 19.8339 12.3353L19.1708 11.4595ZM14.1098 8.91327L9.74695 13.0834C9.58332 13.2397 9.36142 13.3276 9.13004 13.3276C8.89866 13.3276 8.67676 13.2397 8.51313 13.0834L5.89539 10.5813C5.81205 10.5044 5.74558 10.4124 5.69985 10.3106C5.65412 10.2088 5.63005 10.0994 5.62904 9.98866C5.62803 9.87792 5.65011 9.7681 5.69398 9.6656C5.73786 9.5631 5.80265 9.46998 5.88458 9.39167C5.96651 9.31336 6.06393 9.25144 6.17117 9.2095C6.27841 9.16756 6.39331 9.14646 6.50917 9.14742C6.62503 9.14839 6.73953 9.17139 6.84598 9.2151C6.95244 9.25881 7.04873 9.32235 7.12922 9.40201L9.12742 11.3144L12.8734 7.73397C13.038 7.58204 13.2584 7.49798 13.4872 7.49988C13.716 7.50178 13.9348 7.58949 14.0966 7.74413C14.2584 7.89876 14.3501 8.10794 14.3521 8.32662C14.3541 8.5453 14.2662 8.75597 14.1072 8.91327H14.1098Z" fill="#5991C6"/>
</svg>
            </p>
        
            <p>{getTimeSinceLastMessage(creator?.creator?._id)}</p>
            </div>

<div className="messenger-icons">
<div className="message-unseen flex flex-row relative">
<svg width="27" height="23" viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7629 11.2627L32.0647 1.43269C31.4495 0.971256 30.7025 0.719444 29.9335 0.714294H3.59241C2.82342 0.719444 2.07637 0.971256 1.46118 1.43269L16.7629 11.2627Z" fill="white"/>
<path d="M17.409 13.6933L17.2055 13.7891H17.1097C16.9995 13.8383 16.8824 13.8706 16.7625 13.8848C16.6631 13.8974 16.5625 13.8974 16.4632 13.8848H16.3674L16.1638 13.7891L0.119732 3.42026C0.0430773 3.70946 0.00285526 4.0071 0 4.30627V21.0688C0 22.0214 0.378438 22.935 1.05206 23.6087C1.72569 24.2823 2.63932 24.6607 3.59196 24.6607H29.933C30.8857 24.6607 31.7993 24.2823 32.4729 23.6087C33.1466 22.935 33.525 22.0214 33.525 21.0688V4.30627C33.5221 4.0071 33.4819 3.70946 33.4053 3.42026L17.409 13.6933Z" fill="white"/>
</svg>

{
    messages?.filter(u => u?.creator === creator?.creator?._id && u.seen==false && u?.sender==creator?.creator?._id).length > 0 &&
    <p style={{position:'absolute',width:'15px',left:'60%',top:'40%',height:'15px',background:'red',borderRadius:'50%'}} className="text-center">

{    messages.filter(u => u?.creator === creator?.creator?._id && u.seen==false && u?.sender==creator?.creator?._id).length}
    </p>
}


</div>

<svg className="cursor-pointer" onClick={()=>navigate(`/chat?creator=${creator?.creator?._id.toString()}&name=${creator?.creator?.name}`)} width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.92182 20.9999C2.16905 21.0007 2.41333 20.9512 2.63671 20.8552C2.86009 20.7591 3.05688 20.619 3.21264 20.4449L11.2058 11.4458C11.4492 11.1774 11.5823 10.8408 11.5823 10.4934C11.5823 10.146 11.4492 9.80935 11.2058 9.54098L2.93131 0.541827C2.65041 0.235531 2.24676 0.0429128 1.80916 0.00634665C1.37156 -0.0302195 0.935856 0.0922618 0.597898 0.346846C0.259939 0.601429 0.047411 0.967262 0.00706482 1.36386C-0.0332813 1.76047 0.10186 2.15535 0.382761 2.46165L7.78016 10.5009L0.630997 18.5401C0.42863 18.7603 0.300082 19.0284 0.260564 19.3127C0.221045 19.597 0.27221 19.8856 0.408005 20.1443C0.543798 20.4031 0.758538 20.6212 1.02681 20.7728C1.29509 20.9244 1.60568 21.0032 1.92182 20.9999Z" fill="white"/>
</svg>

</div>
            </div>
           })}
        </div>
    )
}
export default Messengercontent