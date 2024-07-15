import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { getNotificationOptions, updateNotificationOptions } from "../../../redux/slices/accountSlice";
const NotificationPrefrencescontent=()=>{
  const dispatch=useDispatch();
  const [info,setInfo]=React.useState({
    call_slot_avaiability:true,
    newposts:true,
    news_letter:true,
    email:'',
    offer:''
  })
React.useEffect(()=>{
fetchnotification_options();
},[])

const fetchnotification_options=async()=>{

let notification_options_res=await dispatch(getNotificationOptions())

if(getNotificationOptions.rejected.match(notification_options_res)){
  console.log('notification_options_res')
  console.log(notification_options_res)
}
if(getNotificationOptions.fulfilled.match(notification_options_res)){
  console.log('notification_options_res')
  console.log(notification_options_res.payload.data.notificationoptionsres)

 setInfo({
  call_slot_avaiability:notification_options_res.payload.data.notificationoptionsres?.call_slot_avaiability,
    newposts:notification_options_res.payload.data.notificationoptionsres?.newposts,
    news_letter:notification_options_res.payload.data.notificationoptionsres?.news_letter,
    email:notification_options_res.payload.data.notificationoptionsres?.userid.email,
    offer:notification_options_res.payload.data.notificationoptionsres?.offer
 }) 
}

}


const updatenotification=async()=>{
let updatenotificationres=await dispatch(updateNotificationOptions(info))
if(updateNotificationOptions.rejected.match(updatenotificationres)){
  console.log('updatenotificationres')
  console.log(updatenotificationres)
}
if(updateNotificationOptions.fulfilled.match(updatenotificationres)){
  console.log('updatenotificationres')
  console.log(updatenotificationres)
  toastr.success('notification mise à jour avec succès')
setTimeout(()=>{
  window.location.reload(true)
},1000)
}
}

    return(
        <div className="notificationprefrencescontent-div">
<div className="flex flex-row space-x-2 items-center">
<Link to='/account'>
<svg width="15" height="20" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5112 28C12.191 28.0009 11.8746 27.9369 11.5853 27.8125C11.296 27.6882 11.0411 27.5066 10.8394 27.2813L0.487562 15.6266C0.17233 15.279 0 14.843 0 14.3931C0 13.9432 0.17233 13.5072 0.487562 13.1596L11.2038 1.50494C11.5676 1.10826 12.0903 0.858799 12.6571 0.811442C13.2238 0.764086 13.7881 0.92271 14.2257 1.25242C14.6634 1.58213 14.9387 2.05591 14.9909 2.56955C15.0432 3.08318 14.8682 3.59459 14.5044 3.99127L4.92407 14.4028L14.1829 24.8143C14.445 25.0995 14.6114 25.4467 14.6626 25.8149C14.7138 26.183 14.6475 26.5568 14.4717 26.8919C14.2958 27.2271 14.0177 27.5095 13.6703 27.7059C13.3228 27.9022 12.9206 28.0043 12.5112 28Z" fill="white"/>
</svg>
</Link>

<p>Retour</p>
</div>
<div className="my-3">
<p>
Gestion des preferences emails
</p>
<p>
Tu peux ici gerer et modifier tes preferences pour nos communications
</p>
</div>
<div className="my-3">
<p>
Pour rappel, ton email renseigne est
</p>
<p style={{color:'#8CC8FF'}}>
{info?.email}
</p>
</div>
<div className="flex flex-row items-center space-x-3">
<div className="notificationprefrences-icondiv flex">
<svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.3127 6.56104L14.0472 9.99531C13.24 10.6282 12.1084 10.6282 11.3012 9.99531L6.99915 6.56104" stroke="#22779C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.84594 1H18.1218C19.7476 1.01692 21.2951 1.65486 22.4038 2.76523C23.5124 3.8756 24.0856 5.36148 23.9896 6.87682V14.1232C24.0856 15.6385 23.5124 17.1244 22.4038 18.2348C21.2951 19.3451 19.7476 19.9831 18.1218 20H6.84594C3.3537 20 1 17.3631 1 14.1232V6.87682C1 3.6369 3.3537 1 6.84594 1Z" stroke="#22779C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
<p>
Notifications de nouveaux messages de mes createurs
</p>
</div>


<div className="my-5 flex flex-col space-y-2">
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Recapitulatif quotidien</span>
</label>
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Recapitulatif hebdomadaire</span>
</label>

<label class="relative inline-flex items-center cursor-pointer">
  <input checked={info.newposts} onChange={(e)=>{
    setInfo({
      ...info,
      newposts:e.target.checked
    })
  }} value={info.newposts} type="checkbox"  class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Tous les messages en temps reel</span>
</label>
</div>

<div className="flex flex-row items-center space-x-3">
<div className="notificationprefrences-icondiv flex">
<svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3237 10.2656C23.3237 9.96734 23.0924 9.81819 22.6296 9.81819H8.38135C8.03213 9.81819 7.6589 9.90981 7.26165 10.093C6.86442 10.2763 6.55231 10.5 6.32531 10.7642L2.47511 15.4048C2.31797 15.6094 2.2394 15.7798 2.2394 15.9162C2.2394 16.2145 2.47075 16.3636 2.93347 16.3636H17.1818C17.531 16.3636 17.9064 16.2699 18.308 16.0824C18.7096 15.8949 19.0196 15.669 19.2378 15.4048L23.088 10.7642C23.2452 10.5767 23.3237 10.4105 23.3237 10.2656L23.3237 10.2656ZM8.38135 8.18183H18.439V6.13637C18.439 5.79545 18.3167 5.50568 18.0723 5.26704C17.8278 5.02841 17.531 4.9091 17.1818 4.9091H9.63856C9.28933 4.9091 8.99249 4.78978 8.74803 4.55115C8.50358 4.31251 8.38135 4.02273 8.38135 3.68182V2.86364C8.38135 2.52273 8.25912 2.23295 8.01466 1.99432C7.77021 1.75568 7.47337 1.63637 7.12416 1.63638H2.93347C2.58425 1.63638 2.28741 1.75569 2.04295 1.99433C1.7985 2.23297 1.67627 2.52274 1.67627 2.86366V13.7685L5.02881 9.74149C5.41295 9.28979 5.91932 8.91692 6.54792 8.62288C7.17653 8.32885 7.78767 8.18183 8.38135 8.18183ZM25 10.2656C25 10.794 24.7992 11.3054 24.3976 11.7997L20.5343 16.4403C20.1589 16.892 19.6525 17.2649 19.0152 17.5589C18.3779 17.853 17.7667 18 17.1818 18H2.93347C2.13026 18 1.44055 17.7187 0.864328 17.1562C0.288109 16.5937 0 15.9205 0 15.1364V2.86364C0 2.07955 0.288109 1.40625 0.864328 0.84375C1.44055 0.28125 2.13026 0 2.93347 0H7.12416C7.92737 0 8.61709 0.28125 9.1933 0.84375C9.76952 1.40625 10.0576 2.07955 10.0576 2.86364V3.27274H17.1818C17.985 3.27274 18.6747 3.55398 19.2509 4.11648C19.8272 4.67898 20.1153 5.35227 20.1153 6.13637V8.18183H22.6297C23.1011 8.18183 23.5333 8.28623 23.9262 8.49503C24.319 8.70384 24.6115 9.00427 24.8036 9.39632C24.9345 9.66903 25 9.9588 25 10.2656Z" fill="#22779C"/>
</svg>

</div>
<p>
Notifications de nouveaux posts de mes createurs
</p>
</div>


<div className="my-5 flex flex-col space-y-2">
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Recapitulatif tous les trois jours</span>
</label>
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Recapitulatif hebdomadaire</span>
</label>


</div>

<div className="flex flex-row items-center space-x-3">
<div className="notificationprefrences-icondiv flex">
<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4957 6.11682C11.7885 6.11682 11.1102 6.39041 10.6102 6.87741C10.1101 7.3644 9.82916 8.0249 9.82916 8.71361C9.82916 9.40232 10.1101 10.0628 10.6102 10.5498C11.1102 11.0368 11.7885 11.3104 12.4957 11.3104C13.2029 11.3104 13.8812 11.0368 14.3812 10.5498C14.8813 10.0628 15.1622 9.40232 15.1622 8.71361C15.1622 8.0249 14.8813 7.3644 14.3812 6.87741C13.8812 6.39041 13.2029 6.11682 12.4957 6.11682ZM8.4959 8.71361C8.4959 7.68055 8.9173 6.68979 9.66741 5.9593C10.4175 5.22881 11.4349 4.81843 12.4957 4.81843C13.5565 4.81843 14.5739 5.22881 15.324 5.9593C16.0741 6.68979 16.4955 7.68055 16.4955 8.71361C16.4955 9.74668 16.0741 10.7374 15.324 11.4679C14.5739 12.1984 13.5565 12.6088 12.4957 12.6088C11.4349 12.6088 10.4175 12.1984 9.66741 11.4679C8.9173 10.7374 8.4959 9.74668 8.4959 8.71361ZM7.78927 3.97317C5.17606 6.58944 5.17606 10.8378 7.78927 13.4541L6.83198 14.3603C3.71747 11.239 3.71747 6.18824 6.83198 3.06689L7.78793 3.97317H7.78927ZM17.2021 13.4541C19.8153 10.8378 19.8153 6.58944 17.2021 3.97317L18.1594 3.06689C21.2739 6.18824 21.2739 11.239 18.1594 14.3603L17.2035 13.4541H17.2021Z" fill="#22779C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9577 1.38264C3.96763 2.34449 3.18212 3.48709 2.64616 4.74502C2.1102 6.00294 1.83432 7.35147 1.83432 8.71338C1.83432 10.0753 2.1102 11.4238 2.64616 12.6817C3.18212 13.9397 3.96763 15.0823 4.9577 16.0441L4.01508 16.9634C2.90085 15.8809 2.01683 14.595 1.41365 13.1794C0.810478 11.7637 0.5 10.2461 0.5 8.71338C0.5 7.18069 0.810478 5.66305 1.41365 4.24738C2.01683 2.83172 2.90085 1.54584 4.01508 0.463379L4.9577 1.38264ZM20.0423 16.0441C21.0324 15.0823 21.8179 13.9397 22.3538 12.6817C22.8898 11.4238 23.1657 10.0753 23.1657 8.71338C23.1657 7.35147 22.8898 6.00294 22.3538 4.74502C21.8179 3.48709 21.0324 2.34449 20.0423 1.38264L20.9849 0.463379C22.0992 1.54584 22.9832 2.83172 23.5863 4.24738C24.1895 5.66305 24.5 7.18069 24.5 8.71338C24.5 10.2461 24.1895 11.7637 23.5863 13.1794C22.9832 14.595 22.0992 15.8809 20.9849 16.9634L20.0423 16.0441Z" fill="#22779C"/>
</svg>

</div>
<p>
Notifications de nouveaux lives de mes createurs
</p>
</div>


<div className="my-5 flex flex-col space-y-2">
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Toutes les alertes en temps reel</span>
</label>

</div>


<div className="flex flex-row items-center space-x-3">
<div className="notificationprefrences-icondiv flex">
<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.9762 0H7.30952C7.1706 0 7.03737 0.0574673 6.93914 0.15976C6.8409 0.262052 6.78571 0.400791 6.78571 0.545455V20.1818C6.78571 20.9051 6.50978 21.5988 6.01861 22.1103C5.52745 22.6218 4.86128 22.9091 4.16667 22.9091C3.47205 22.9091 2.80589 22.6218 2.31472 22.1103C1.82355 21.5988 1.54762 20.9051 1.54762 20.1818V10.3636H2.07143V9.27273H1.02381C0.884887 9.27273 0.751654 9.33019 0.65342 9.43249C0.555187 9.53478 0.5 9.67352 0.5 9.81818V20.1818C0.5 21.1945 0.886308 22.1656 1.57394 22.8817C2.26158 23.5977 3.19421 24 4.16667 24H18.8333C19.8058 24 20.7384 23.5977 21.4261 22.8817C22.1137 22.1656 22.5 21.1945 22.5 20.1818V0.545455C22.5 0.400791 22.4448 0.262052 22.3466 0.15976C22.2483 0.0574673 22.1151 0 21.9762 0ZM21.4524 20.1818C21.4524 20.9051 21.1764 21.5988 20.6853 22.1103C20.1941 22.6218 19.5279 22.9091 18.8333 22.9091H6.7281C7.07738 22.554 7.35506 22.1299 7.54485 21.6615C7.73464 21.1932 7.83272 20.6901 7.83333 20.1818V1.09091H21.4524V20.1818ZM2.59524 20.1818V8.18182C2.59524 8.03716 2.65043 7.89842 2.74866 7.79612C2.84689 7.69383 2.98012 7.63636 3.11905 7.63636H4.16667V8.72727H3.64286V20.1818C3.64286 20.3265 3.69804 20.4652 3.79628 20.5675C3.89451 20.6698 4.02774 20.7273 4.16667 20.7273C4.30559 20.7273 4.43882 20.6698 4.53706 20.5675C4.63529 20.4652 4.69048 20.3265 4.69048 20.1818V6C4.69048 5.85534 4.74566 5.7166 4.8439 5.61431C4.94213 5.51201 5.07536 5.45455 5.21429 5.45455H6.26191V6.54545H5.7381V20.1818C5.7381 20.6158 5.57254 21.032 5.27783 21.3389C4.98313 21.6458 4.58344 21.8182 4.16667 21.8182C3.7499 21.8182 3.3502 21.6458 3.0555 21.3389C2.7608 21.032 2.59524 20.6158 2.59524 20.1818ZM10.4524 7.63636H18.8333C18.9723 7.63636 19.1055 7.5789 19.2037 7.4766C19.302 7.37431 19.3571 7.23557 19.3571 7.09091V3.81818C19.3571 3.67352 19.302 3.53478 19.2037 3.43249C19.1055 3.33019 18.9723 3.27273 18.8333 3.27273H10.4524C10.3135 3.27273 10.1802 3.33019 10.082 3.43249C9.98376 3.53478 9.92857 3.67352 9.92857 3.81818V7.09091C9.92857 7.23557 9.98376 7.37431 10.082 7.4766C10.1802 7.5789 10.3135 7.63636 10.4524 7.63636ZM10.9762 4.36364H18.3095V6.54545H10.9762V4.36364ZM12.5476 13.0909V12.5455H10.9762C10.8373 12.5455 10.704 12.488 10.6058 12.3857C10.5076 12.2834 10.4524 12.1447 10.4524 12V10.3636C10.4524 10.219 10.5076 10.0802 10.6058 9.97794C10.704 9.87565 10.8373 9.81818 10.9762 9.81818H11.5V9.27273H12.5476V9.81818H13.5952V10.9091H11.5V11.4545H13.0714C13.2104 11.4545 13.3436 11.512 13.4418 11.6143C13.5401 11.7166 13.5952 11.8553 13.5952 12V13.6364C13.5952 13.781 13.5401 13.9198 13.4418 14.0221C13.3436 14.1244 13.2104 14.1818 13.0714 14.1818H12.5476V14.7273H11.5V14.1818H10.4524V13.0909H12.5476ZM14.6429 9.81818H19.3571V10.9091H14.6429V9.81818ZM14.6429 13.0909H19.3571V14.1818H14.6429V13.0909ZM10.4524 16.3636H19.3571V17.4545H10.4524V16.3636ZM10.4524 19.6364H19.3571V20.7273H10.4524V19.6364Z" fill="#22779C"/>
</svg>

</div>
<p>
Newsletters Carmen
</p>
</div>

<div className="my-5 flex flex-col space-y-2">
<label class="relative inline-flex items-center cursor-pointer">
  <input checked={info.news_letter} onChange={(e)=>{
    setInfo({
      ...info,
      news_letter:e.target.checked
    })
  }} value={info.news_letter}  type="checkbox"  class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Je souhaite recevoir les newsletters de Carmen</span>
</label>

</div>



<div className="flex flex-row items-center space-x-3">
<div className="notificationprefrences-icondiv flex">
<svg width="25" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5724 4.68057L21.1157 6.36863C21.2741 6.90301 21.6013 7.36672 22.0447 7.68531L23.4192 8.64188C23.8806 8.96266 24.2219 9.43763 24.386 9.98754C24.5501 10.5375 24.5272 11.129 24.321 11.6635L23.7777 13.0308C23.5412 13.6353 23.5412 14.3114 23.7777 14.9158L24.321 16.2494C24.5267 16.7731 24.556 17.3534 24.4042 17.8965C24.2524 18.4396 23.9284 18.9139 23.4844 19.2429L22.262 20.1488C21.814 20.4786 21.4881 20.9571 21.3384 21.5049L20.8984 23.1029C20.7452 23.6639 20.4081 24.1522 19.9452 24.4838C19.4822 24.8155 18.9222 24.9698 18.3613 24.9204L17.0411 24.8078C16.4164 24.7541 15.7961 24.9561 15.3135 25.3705L14.0423 26.434C13.6088 26.8001 13.0667 27 12.5075 27C11.9483 27 11.4062 26.8001 10.9728 26.434L9.8862 25.5112C9.45066 25.1436 8.9051 24.9447 8.3433 24.9485H6.43641C5.88765 24.95 5.35469 24.758 4.92523 24.4042C4.49572 24.0504 4.19524 23.5557 4.07316 23.0016L3.72547 21.4711C3.58954 20.8536 3.23223 20.3125 2.72584 19.9575L1.5578 19.0684C1.11568 18.757 0.785785 18.3025 0.619657 17.7761C0.453524 17.2497 0.460565 16.6812 0.639666 16.1594L1.18294 14.6176C1.38395 14.0568 1.38395 13.4398 1.18294 12.8789L0.693994 11.5285C0.498475 10.9921 0.48618 10.4025 0.659154 9.8579C0.832127 9.31327 1.17995 8.84641 1.64472 8.53497L2.93229 7.67406C3.43009 7.34061 3.79327 6.83037 3.95364 6.23921L4.33393 4.82124C4.48632 4.25664 4.82429 3.76497 5.28955 3.43102C5.75476 3.09712 6.31797 2.94204 6.88189 2.99251L8.09883 3.09942C8.72495 3.15052 9.34591 2.94891 9.83187 2.53674L10.989 1.56894C11.4237 1.201 11.9679 1 12.5292 1C13.0906 1 13.6347 1.201 14.0694 1.56894L15.0799 2.44671C15.5659 2.86293 16.1901 3.06499 16.8184 3.0094L18.0951 2.91374C18.6396 2.87716 19.1802 3.03157 19.6297 3.35213C20.0791 3.67263 20.4112 4.14062 20.5724 4.68057Z" stroke="#22779C" stroke-miterlimit="10"/>
<path d="M17.7855 8.48449L6.99609 19.6651M9.48978 11.6694C10.6209 11.6694 11.5379 10.7196 11.5379 9.54808C11.5379 8.37646 10.6209 7.42676 9.48978 7.42676C8.35863 7.42676 7.44163 8.37646 7.44163 9.54808C7.44163 10.7196 8.35863 11.6694 9.48978 11.6694ZM15.7374 20.5822C16.8686 20.5822 17.7856 19.6325 17.7856 18.4609C17.7856 17.2893 16.8686 16.3396 15.7374 16.3396C14.6063 16.3396 13.6893 17.2893 13.6893 18.4609C13.6893 19.6325 14.6063 20.5822 15.7374 20.5822Z" stroke="#22779C" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
<p>
Offres Carmen
</p>
</div>

<div className="my-5 flex flex-col space-y-2">
<label class="relative inline-flex items-center cursor-pointer">
  <input  type="checkbox" checked={info.offer} onChange={(e)=>{
    setInfo({
      ...info,
    offer:e.target.checked
    })
  }} value={info.offer}  class="sr-only peer"/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="mx-2">Je souhaite recevoir les codes promos, reductions et autres offres commerciales de Carmen</span>
</label>

</div>



<div className="notificationprefrences-buttondiv flex items-center justify-center">
<button onClick={updatenotification}>
Enregister
</button>
</div>
        </div>
    )
}
export default NotificationPrefrencescontent;