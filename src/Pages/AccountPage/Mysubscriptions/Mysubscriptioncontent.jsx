import React from "react";
import { getSubscriptions } from "../../../redux/slices/subscription";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Mysubscriptioncontent=()=>{
    const dispatch=useDispatch();
const [subscription,setSubscriptions]=React.useState([])

React.useEffect(()=>{
fetchSubscriptions()
},[])
const getDate = (fulldate) => {
    // Convert the input date string to a Date object
    let startDate = new Date(fulldate);
    let currentDate = new Date();

    // Calculate the difference in milliseconds
    let differenceInTime = currentDate.getTime() - startDate.getTime();

    // Convert the difference in milliseconds to days
    let differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    // Return the difference in days followed by 'j'
    return differenceInDays + 'j';
}
const isDatePast = (fulldate) => {
    let passedDate = new Date(fulldate);
    let currentDate = new Date();

    // Debugging: Log the dates to see if they are correct
    console.log("Passed Date: ", passedDate);
    console.log("Current Date: ", currentDate);

    passedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return passedDate < currentDate;
}
const fetchSubscriptions=async()=>{
    let subres=await dispatch(getSubscriptions())

    if(getSubscriptions.rejected.match(subres)){
        console.log('subres')
        console.log(subres)
        
    }   
    if(getSubscriptions.fulfilled.match(subres)){
    console.log('subres')
    console.log(subres)
    setSubscriptions(subres.payload.data.response)
    
    }
}

    return(
<div className="mysubscriptionscontent-div">
<div className="flex flex-row space-x-2">
<Link to="/account">
<svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.66046 20.9999C9.41322 21.0007 9.16894 20.9512 8.94557 20.8552C8.72219 20.7591 8.52539 20.619 8.36964 20.4449L0.37647 11.4458C0.133064 11.1774 0 10.8408 0 10.4934C0 10.146 0.133064 9.80935 0.37647 9.54098L8.65097 0.541827C8.93187 0.235531 9.33552 0.0429128 9.77312 0.00634665C10.2107 -0.0302195 10.6464 0.0922618 10.9844 0.346846C11.3223 0.601429 11.5349 0.967262 11.5752 1.36386C11.6156 1.76047 11.4804 2.15535 11.1995 2.46165L3.80211 10.5009L10.9513 18.5401C11.1536 18.7603 11.2822 19.0284 11.3217 19.3127C11.3612 19.597 11.3101 19.8856 11.1743 20.1443C11.0385 20.4031 10.8237 20.6212 10.5555 20.7728C10.2872 20.9244 9.9766 21.0032 9.66046 20.9999Z" fill="white"/>
</svg>

</Link>
<p>
Retour
</p>
</div>
<p style={{color:'#8CC8FF',marginTop:'1rem'}}>{subscription?.length} abonnements trouvés</p>
{subscription?.map((sub,i)=>{
    return <div key={i.toString()} style={{marginTop:'1rem'}} className="flex flex-col mysubscriptions-record space-y-1">
    <div className="flex flex-row space-x-1">
    <p>{sub?.creator?.name}</p>
    <svg width="17" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1708 11.4595C18.8472 11.0326 18.673 10.5189 18.673 9.99166C18.673 9.46446 18.8472 8.95073 19.1708 8.52378L19.8339 7.64806C19.915 7.54113 19.9684 7.41731 19.9896 7.28682C20.0109 7.15632 19.9994 7.02287 19.9561 6.89744C19.9124 6.77333 19.8392 6.66057 19.7424 6.56797C19.6455 6.47537 19.5275 6.40545 19.3977 6.36367L18.3244 6.03006C17.7986 5.86796 17.3403 5.55037 17.0157 5.12314C16.691 4.6959 16.5168 4.18112 16.5182 3.6531V2.56887C16.5181 2.43723 16.4854 2.30748 16.4227 2.19024C16.3601 2.073 16.2693 1.97159 16.1578 1.89431C16.0463 1.81703 15.9173 1.76607 15.7812 1.7456C15.6452 1.72513 15.506 1.73574 15.3751 1.77654L14.2931 2.11015C13.7678 2.27262 13.2022 2.27219 12.6772 2.10891C12.1522 1.94563 11.6946 1.62788 11.3699 1.20107L10.7068 0.325346C10.6221 0.223853 10.5146 0.141899 10.3922 0.0855741C10.2699 0.029249 10.1358 0 10 0C9.86419 0 9.73012 0.029249 9.60776 0.0855741C9.4854 0.141899 9.37788 0.223853 9.29321 0.325346L8.63005 1.20107C8.30536 1.62788 7.84781 1.94563 7.32279 2.10891C6.79778 2.27219 6.2322 2.27262 5.70692 2.11015L4.62492 1.77654C4.49398 1.73574 4.3548 1.72513 4.21875 1.7456C4.0827 1.76607 3.95365 1.81703 3.84216 1.89431C3.73067 1.97159 3.6399 2.073 3.57727 2.19024C3.51465 2.30748 3.48195 2.43723 3.48185 2.56887V3.6531C3.48318 4.18112 3.30895 4.6959 2.9843 5.12314C2.65965 5.55037 2.20137 5.86796 1.67561 6.03006L0.602339 6.36367C0.472492 6.40545 0.354517 6.47537 0.257638 6.56797C0.160759 6.66057 0.0876024 6.77333 0.0438897 6.89744C0.000619933 7.02287 -0.0108687 7.15632 0.0103694 7.28682C0.0316075 7.41731 0.0849651 7.54113 0.166051 7.64806L0.82921 8.52378C1.1528 8.95073 1.32703 9.46446 1.32703 9.99166C1.32703 10.5189 1.1528 11.0326 0.82921 11.4595L0.166051 12.3353C0.0849651 12.4422 0.0316075 12.566 0.0103694 12.6965C-0.0108687 12.827 0.000619933 12.9605 0.0438897 13.0859C0.0876024 13.21 0.160759 13.3228 0.257638 13.4154C0.354517 13.508 0.472492 13.5779 0.602339 13.6197L1.67561 13.9533C2.20137 14.1154 2.65965 14.433 2.9843 14.8602C3.30895 15.2874 3.48318 15.8022 3.48185 16.3302V17.4145C3.48195 17.5461 3.51465 17.6758 3.57727 17.7931C3.6399 17.9103 3.73067 18.0117 3.84216 18.089C3.95365 18.1663 4.0827 18.2173 4.21875 18.2377C4.3548 18.2582 4.49398 18.2476 4.62492 18.2068L5.69819 17.8732C6.22459 17.708 6.79232 17.707 7.31933 17.8704C7.84634 18.0338 8.30536 18.3532 8.63005 18.7823L9.29321 19.658C9.37468 19.764 9.48111 19.8502 9.6039 19.9096C9.72668 19.969 9.86237 20 10 20C10.1376 20 10.2733 19.969 10.3961 19.9096C10.5189 19.8502 10.6253 19.764 10.7068 19.658L11.3699 18.7823C11.6952 18.3538 12.1542 18.0349 12.6811 17.8715C13.2079 17.7082 13.7753 17.7088 14.3018 17.8732L15.3751 18.2068C15.506 18.2476 15.6452 18.2582 15.7812 18.2377C15.9173 18.2173 16.0463 18.1663 16.1578 18.089C16.2693 18.0117 16.3601 17.9103 16.4227 17.7931C16.4854 17.6758 16.5181 17.5461 16.5182 17.4145V16.3302C16.5168 15.8022 16.691 15.2874 17.0157 14.8602C17.3403 14.433 17.7986 14.1154 18.3244 13.9533L19.3977 13.6197C19.5275 13.5779 19.6455 13.508 19.7424 13.4154C19.8392 13.3228 19.9124 13.21 19.9561 13.0859C19.9994 12.9605 20.0109 12.827 19.9896 12.6965C19.9684 12.566 19.915 12.4422 19.8339 12.3353L19.1708 11.4595ZM14.1098 8.91327L9.74695 13.0834C9.58332 13.2397 9.36142 13.3276 9.13004 13.3276C8.89866 13.3276 8.67676 13.2397 8.51313 13.0834L5.89539 10.5813C5.81205 10.5044 5.74558 10.4124 5.69985 10.3106C5.65412 10.2088 5.63005 10.0994 5.62904 9.98866C5.62803 9.87792 5.65011 9.7681 5.69398 9.6656C5.73786 9.5631 5.80265 9.46998 5.88458 9.39167C5.96651 9.31336 6.06393 9.25144 6.17117 9.2095C6.27841 9.16756 6.39331 9.14646 6.50917 9.14742C6.62503 9.14839 6.73953 9.17139 6.84598 9.2151C6.95244 9.25881 7.04873 9.32235 7.12922 9.40201L9.12742 11.3144L12.8734 7.73397C13.038 7.58204 13.2584 7.49798 13.4872 7.49988C13.716 7.50178 13.9348 7.58949 14.0966 7.74413C14.2584 7.89876 14.3501 8.10794 14.3521 8.32662C14.3541 8.5453 14.2662 8.75597 14.1072 8.91327H14.1098Z" fill="#5991C6"/>
    </svg>
    
    </div>
    <div className="flex flex-row">
    <div className="flex flex-row">
    <p>Renouvellement:</p>
    <p style={{color:'#5991C6'}}>Désactive</p>
    </div>
    <div style={{width:'100%',justifyContent:'flex-end'}} className="flex flex-row items-center space-x-3 items-center">
    <svg width="32" height="7" viewBox="0 0 32 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C15.2968 0 14.6093 0.205272 14.0246 0.589857C13.4399 0.974441 12.9842 1.52107 12.7151 2.16061C12.446 2.80015 12.3756 3.50388 12.5128 4.18282C12.65 4.86175 12.9886 5.48539 13.4858 5.97487C13.9831 6.46436 14.6166 6.7977 15.3063 6.93275C15.9961 7.0678 16.711 6.99848 17.3607 6.73358C18.0103 6.46867 18.5656 6.02007 18.9563 5.44449C19.347 4.86892 19.5556 4.19223 19.5556 3.5C19.5556 2.57174 19.181 1.6815 18.5142 1.02513C17.8474 0.36875 16.943 0 16 0ZM3.55556 0C2.85233 0 2.1649 0.205272 1.5802 0.589857C0.995488 0.974441 0.539764 1.52107 0.270652 2.16061C0.00154055 2.80015 -0.0688713 3.50388 0.0683206 4.18282C0.205512 4.86175 0.544146 5.48539 1.0414 5.97487C1.53865 6.46436 2.17219 6.7977 2.8619 6.93275C3.55161 7.0678 4.26652 6.99848 4.91621 6.73358C5.5659 6.46867 6.1212 6.02007 6.51189 5.44449C6.90258 4.86892 7.11111 4.19223 7.11111 3.5C7.11111 2.57174 6.73651 1.6815 6.06972 1.02513C5.40292 0.36875 4.49855 0 3.55556 0ZM28.4444 0C27.7412 0 27.0538 0.205272 26.4691 0.589857C25.8844 0.974441 25.4287 1.52107 25.1595 2.16061C24.8904 2.80015 24.82 3.50388 24.9572 4.18282C25.0944 4.86175 25.433 5.48539 25.9303 5.97487C26.4275 6.46436 27.0611 6.7977 27.7508 6.93275C28.4405 7.0678 29.1554 6.99848 29.8051 6.73358C30.4548 6.46867 31.0101 6.02007 31.4008 5.44449C31.7915 4.86892 32 4.19223 32 3.5C32 2.57174 31.6254 1.6815 30.9586 1.02513C30.2918 0.36875 29.3874 0 28.4444 0Z" fill="white"/>
    </svg>
    <p style={{color:'#8CC8FF'}}>{getDate(sub?.createdAt)}</p>
    </div>
    </div>
    <p style={{color:'#3BCC08'}}>{isDatePast(sub?.expiray) ? 'expiré' : 'En cours'}</p>

    </div>
})}

</div>

    )
}

export default Mysubscriptioncontent;