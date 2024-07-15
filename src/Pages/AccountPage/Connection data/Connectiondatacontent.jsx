import React from "react";
import { useDispatch,useSelector } from "react-redux";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { changeCredentials, deleteAccount } from "../../../redux/slices/accountSlice";
import { Link } from "react-router-dom";
import {persistor} from '../../../redux/store/store'
import { updateUserState } from "../../../redux/slices/authenticationslices";
const Connectiondatacontent=()=>{
    const [currentUser,setCurrentUser]=React.useState()
const [showUpdateEmailPopup,setShowUpdateEmailPopup]=React.useState(false)
const [showUpdatePasswordPopup,setShowUpdatePasswordPopup]=React.useState(false)
const [showDeletePopup,setShowDeletePopup]=React.useState(false)
const [showPasswords,setShowPasswords]=React.useState({
    password:false,
    old_password:false,
    confirm_password:false
})
    const [state,setState]=React.useState({
        email:'',
        password:'',
        old_password:'',
        confirm_password:''

})
const selector=useSelector(u=>u.authenticationslices?.user?.user)
React.useEffect(()=>{
setCurrentUser(selector)
},[selector])

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
 
React.useEffect(()=>{
if(showUpdateEmailPopup || showUpdatePasswordPopup || showDeletePopup){
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}else{
    document.body.style.overflow = 'auto';
}
},[showUpdateEmailPopup,showUpdatePasswordPopup,showDeletePopup])

const dispatch=useDispatch()
const updateCredentials=async()=>{
    if (!passwordRegex.test(state.password)){
        toastr.error("Le mot de passe ne répond pas aux exigences");
    }else if(state.password.length==0){
toastr.error('veuillez entrer le mot de passe')
    }else if(state.confirm_password.length==0){
        toastr.error('confirmer que le champ du mot de passe est vide')
    }else if(state.password!=state.confirm_password){
        toastr.error('les champs du mot de passe ne correspondent pas')
    }else{
      let changeCredentialsres=await dispatch(changeCredentials(state))
    if(changeCredentials.rejected.match(changeCredentialsres)){
console.log('change credentialsres')
console.log(changeCredentialsres)
toastr.error(changeCredentialsres.payload.data.error)
    }
    if(changeCredentials.fulfilled.match(changeCredentialsres)){
        console.log('change credentialsres')
        setShowUpdatePasswordPopup(false)
        dispatch(updateUserState(changeCredentialsres?.payload?.data?.response))
        console.log(changeCredentialsres)
        setState({
email:'',
password:'',
old_password:'',
confirm_password:''
         })
    toastr.success("les informations d'identification ont été modifiées avec succès")
    }
    }   
}

const accountTerminal=async()=>{
let accountres=await dispatch(deleteAccount())
if(deleteAccount.rejected.match(accountres)){
toastr.error(accountres?.payload?.data?.error)
}
if(deleteAccount.fulfilled.match(accountres)){
    toastr.success("Account deleted sucessfully")
purge();
  

}
}
const purge=async()=>{
    await  persistor.purge();
}
const updateEmail=async()=>{
if(state.email.length==0){
    toastr.error("champ email vide")
}
let emailupdateres=await dispatch(changeCredentials(state))
if(changeCredentials.rejected.match(emailupdateres)){
    console.log('change credentialsres')
    console.log(emailupdateres)
    toastr.error(emailupdateres.payload?.data?.error)
        }
        if(changeCredentials.fulfilled.match(emailupdateres)){
            console.log('change credentialsres')
            setShowUpdateEmailPopup(false)
            console.log(emailupdateres)
            dispatch(updateUserState(emailupdateres?.payload?.data?.response))
            setState({
    email:'',
    password:'',
    old_password:'',
    confirm_password:''
             })
        toastr.success("les informations d'identification ont été modifiées avec succès")
        }
}
    return(
        <div className="connectiondatacontent-div">
        {showUpdateEmailPopup?<div className="email-update-popup flex flex-col justify-center items-center">
          <div>
          <p>Email modifié</p>
           <p style={{fontSize:'0.8rem'}}>Un email vient d’être envoyé à {selector?.email} pour valider le changement de votre adresse email. </p>
          <p style={{marginTop:'5%',fontSize:'0.8rem'}}>Vous ne l’avez pas reçu ?  </p>
          <button onClick={updateEmail}>Renvoyer</button>
            </div>
            </div>:''}

            {showDeletePopup?<div className="email-update-popup flex flex-col justify-center items-center">
          <div>
          <p style={{fontSize:'1rem'}}>Êtes vous sûr de vouloir supprimer votre compte ? Attention, Cette action est irréversible. </p>
          
          <div  className="flex delete-account-buttondiv">
          <button style={{background:'#E8EDF1',color:'black'}} className="cancel-account" onClick={(e)=>setShowDeletePopup(false)}>Retour</button>
          <button style={{background:'#D21C1C'}} className="delete-account"  onClick={accountTerminal}>Supprimer</button>
            </div>
            </div>
            </div>:''}

            {showUpdatePasswordPopup?<div className="email-update-popup flex flex-col justify-center items-center">
          <div>
          <p>Mot de passe changé</p>
           <p style={{fontSize:'0.8rem'}}> Votre mot de passe a été changé avec succès.</p>

          <button onClick={updateCredentials}>Renvoyer</button>
            </div>
            </div>:''}
<div className="flex flex-row space-x-2">
<Link to='/account'>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L5 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</Link>
<p>Retour</p>
</div>
<div className="connectiondata-inputtext">
    <p>Email</p>
<div className="connectiondata-input relative">
<input value={state.email}  name="email" onChange={(e)=>setState({
    ...state,
    [e.target.name]:e.target.value
})} placeholder={currentUser?.email}></input>
<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_623_5000)">
<path d="M14.168 8.3335H8.33464C7.89261 8.3335 7.46868 8.50909 7.15612 8.82165C6.84356 9.13421 6.66797 9.55814 6.66797 10.0002V21.6668C6.66797 22.1089 6.84356 22.5328 7.15612 22.8453C7.46868 23.1579 7.89261 23.3335 8.33464 23.3335H20.0013C20.4433 23.3335 20.8673 23.1579 21.1798 22.8453C21.4924 22.5328 21.668 22.1089 21.668 21.6668V15.8335" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.418 7.08368C20.7495 6.75216 21.1991 6.56592 21.668 6.56592C22.1368 6.56592 22.5864 6.75216 22.918 7.08368C23.2495 7.41521 23.4357 7.86484 23.4357 8.33368C23.4357 8.80253 23.2495 9.25216 22.918 9.58368L15.0013 17.5004L11.668 18.3337L12.5013 15.0004L20.418 7.08368Z" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_623_5000">
<rect width="20" height="20" fill="white" transform="translate(5 5)"/>
</clipPath>
</defs>
</svg>

</div>
</div>
<div className="connectiondata-save">
<button onClick={(e)=>setShowUpdateEmailPopup(true)}>
Enregistrer
</button>
</div>
<div className="connectiondata-border">
    
</div>
<div className="connectiondata-inputtext">
    <p>Mot de passe actuel</p>
<div className="connectiondata-input relative">
{showPasswords?.old_password === true ? (
  <input 
    type="text"
    name="old_password"
    value={state.old_password}
    placeholder={selector?.password}
  />
) : (
    <input 
    type="password"
    name="old_password"
    value={state.old_password}
    placeholder={selector?.password}
  />
)}

{showPasswords?.old_password==true?<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
    old_password:false
})} className="cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2838 11.5615C13.2838 11.1722 13.4267 10.8173 13.6584 10.5413C13.5352 10.5216 13.4119 10.5117 13.2838 10.5117C11.8643 10.5117 10.7061 11.6897 10.7061 13.1388C10.7061 14.5878 11.8643 15.7658 13.2838 15.7658C14.7033 15.7658 15.8615 14.5878 15.8615 13.1388C15.8615 13.0254 15.8517 12.912 15.8418 12.7987C15.5707 13.0106 15.2356 13.1388 14.8659 13.1388C13.9886 13.1388 13.2838 12.4339 13.2838 11.5615Z" fill="white"/>
<path d="M13.3349 6.87744C9.29821 6.87744 6.15366 9.28268 2.29443 13.1863C5.61642 16.523 8.40611 19.4951 13.3349 19.4951C18.2587 19.4951 21.8814 15.7295 24.3753 13.2553C21.8222 10.3572 18.2045 6.87744 13.3349 6.87744ZM13.3349 17.6862C10.9001 17.6862 8.9187 15.6654 8.9187 13.1863C8.9187 10.7022 10.9001 8.6863 13.3349 8.6863C15.7697 8.6863 17.7511 10.7071 17.7511 13.1863C17.7511 15.6704 15.7697 17.6862 13.3349 17.6862Z" fill="white"/>
</svg>:<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
    old_password:true
})} className="cursor-pointer"  width="26" height="26"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}

</div>
</div>
<div className="connectiondata-inputtext">
    <p>Nouveau mot de passe</p>
<div className="connectiondata-input relative">
<input value={state.password
} onChange={(e)=>setState({
    ...state,
    [e.target.name]:e.target.value
})} name="password" type={showPasswords?.password==true?'text':'password'} placeholder="Entre 8 et 64 caractères"></input>
{showPasswords?.password==true?<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
    password:false
})} className="cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2838 11.5615C13.2838 11.1722 13.4267 10.8173 13.6584 10.5413C13.5352 10.5216 13.4119 10.5117 13.2838 10.5117C11.8643 10.5117 10.7061 11.6897 10.7061 13.1388C10.7061 14.5878 11.8643 15.7658 13.2838 15.7658C14.7033 15.7658 15.8615 14.5878 15.8615 13.1388C15.8615 13.0254 15.8517 12.912 15.8418 12.7987C15.5707 13.0106 15.2356 13.1388 14.8659 13.1388C13.9886 13.1388 13.2838 12.4339 13.2838 11.5615Z" fill="white"/>
<path d="M13.3349 6.87744C9.29821 6.87744 6.15366 9.28268 2.29443 13.1863C5.61642 16.523 8.40611 19.4951 13.3349 19.4951C18.2587 19.4951 21.8814 15.7295 24.3753 13.2553C21.8222 10.3572 18.2045 6.87744 13.3349 6.87744ZM13.3349 17.6862C10.9001 17.6862 8.9187 15.6654 8.9187 13.1863C8.9187 10.7022 10.9001 8.6863 13.3349 8.6863C15.7697 8.6863 17.7511 10.7071 17.7511 13.1863C17.7511 15.6704 15.7697 17.6862 13.3349 17.6862Z" fill="white"/>
</svg>:<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
password:true
})} className="cursor-pointer"  width="26" height="26"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}

</div>
</div>
<p style={{marginTop:'1.5rem'}}>Niveau de sécurité</p>
<div className="flex flex-row relative">
<svg width="932" height="14" viewBox="0 0 932 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="932" height="14" rx="7" fill="#252B5C"/>
</svg>
<svg className="absolute" width="461" height="14" viewBox="0 0 461 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="461" height="14" rx="7" fill="url(#paint0_linear_623_5023)"/>
<defs>
<linearGradient id="paint0_linear_623_5023" x1="-2.71018e-06" y1="7.0002" x2="492.575" y2="7.00011" gradientUnits="userSpaceOnUse">
<stop stop-color="#E6243D"/>
<stop offset="1" stop-color="#12D866"/>
</linearGradient>
</defs>
</svg>
</div>
<div style={{marginTop:'1rem'}} className="connectiondata-passwordrules flex flex-col">
<div className="flex flex-row space-x-3">
<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#14BD1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#14BD1A" stroke-width="2"></circle> </g></svg>

<p style={{color:'#14BD1A'}}>
Pré-requis pour un mot de passe sécurisé
</p>
</div>
<div className="flex flex-row space-x-3">
<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#14BD1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#14BD1A" stroke-width="2"></circle> </g></svg>

<p style={{color:'#14BD1A'}}>Comporte une minuscule et une majuscule</p>
</div>
<div className="flex flex-row space-x-3">
<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#14BD1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#14BD1A" stroke-width="2"></circle> </g></svg>

<p style={{color:'#14BD1A'}}>Comporte un chiffre</p>
</div>
<div className="flex flex-row space-x-3">
<svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#14BD1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <circle cx="12" cy="12" r="10" stroke="#14BD1A" stroke-width="2"></circle> </g></svg>

<p style={{color:'#14BD1A'}}>Comporte un caractère spécial</p>
</div>

</div>
<div className="connectiondata-inputtext">
    <p>Confirmer le nouveau mot de passe</p>
<div className="connectiondata-input relative">
<input onChange={(e)=>setState({
    ...state,
    [e.target.name]:e.target.value
})} type={showPasswords.confirm_password==true?`text`:'password'} value={state.confirm_password} name="confirm_password" placeholder="Confirmer"></input>
{showPasswords?.confirm_password==true?<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
    confirm_password:false
})} className="cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2838 11.5615C13.2838 11.1722 13.4267 10.8173 13.6584 10.5413C13.5352 10.5216 13.4119 10.5117 13.2838 10.5117C11.8643 10.5117 10.7061 11.6897 10.7061 13.1388C10.7061 14.5878 11.8643 15.7658 13.2838 15.7658C14.7033 15.7658 15.8615 14.5878 15.8615 13.1388C15.8615 13.0254 15.8517 12.912 15.8418 12.7987C15.5707 13.0106 15.2356 13.1388 14.8659 13.1388C13.9886 13.1388 13.2838 12.4339 13.2838 11.5615Z" fill="white"/>
<path d="M13.3349 6.87744C9.29821 6.87744 6.15366 9.28268 2.29443 13.1863C5.61642 16.523 8.40611 19.4951 13.3349 19.4951C18.2587 19.4951 21.8814 15.7295 24.3753 13.2553C21.8222 10.3572 18.2045 6.87744 13.3349 6.87744ZM13.3349 17.6862C10.9001 17.6862 8.9187 15.6654 8.9187 13.1863C8.9187 10.7022 10.9001 8.6863 13.3349 8.6863C15.7697 8.6863 17.7511 10.7071 17.7511 13.1863C17.7511 15.6704 15.7697 17.6862 13.3349 17.6862Z" fill="white"/>
</svg>:<svg onClick={(e)=>setShowPasswords({
    ...showPasswords,
    confirm_password:true
})} className="cursor-pointer"  width="26" height="26"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}


</div>
</div>
<div style={{marginTop:'1rem'}} className="connectiondata-save">
<button onClick={(e)=>setShowUpdatePasswordPopup(true)}>
Enregistrer
</button>
</div>
<div>
    <div style={{marginTop:'1rem'}} className="connectioncontent-socialswitches flex flex-col">
<p>Comptes liés pour la connexion</p>
<div style={{width:'100%'}} className="flex flex-row justify-between">
    <div className="flex flex-row items-center space-x-2">
    <svg width="20" height="19" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.1405 26C20.3202 26 26.1405 20.1797 26.1405 13C26.1405 5.8203 20.3202 0 13.1405 0C5.9608 0 0.140503 5.8203 0.140503 13C0.140503 20.1797 5.9608 26 13.1405 26Z" fill="#3C5A9A"/>
<path d="M17.367 3.99023H14.4872C12.7782 3.99023 10.8773 4.70901 10.8773 7.18625C10.8857 8.04941 10.8773 8.87607 10.8773 9.80642H8.90027V12.9525H10.9385V22.0096H14.6839V12.8927H17.156L17.3796 9.79759H14.6193C14.6193 9.79759 14.6255 8.42074 14.6193 8.0209C14.6193 7.04195 15.638 7.09801 15.6992 7.09801C16.184 7.09801 17.1265 7.09942 17.3684 7.09801V3.99023H17.367Z" fill="white"/>
</svg>
        <p>Facebook</p>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"   checked={selector?.facebook === true}
  disabled={selector?.facebook !== true}/>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span>
</label>
</div>
<div style={{width:'100%'}} className="flex flex-row justify-between">
    <div className="flex flex-row items-center space-x-2">
    <svg width="20" height="19" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.1413 13.5555C25.1413 12.5278 25.0562 11.7778 24.872 11H12.8964V15.6388H19.9258C19.7841 16.7916 19.0188 18.5278 17.3181 19.6944L17.2943 19.8497L21.0807 22.7243L21.3431 22.75C23.7523 20.5694 25.1413 17.3611 25.1413 13.5555Z" fill="#4285F4"/>
<path d="M12.8964 25.7778C16.3403 25.7778 19.2314 24.6666 21.3431 22.75L17.3182 19.6944C16.2411 20.4305 14.7955 20.9444 12.8964 20.9444C9.52343 20.9444 6.66064 18.7639 5.64013 15.75L5.49055 15.7624L1.55332 18.7486L1.50183 18.8888C3.59932 22.9721 7.90772 25.7778 12.8964 25.7778Z" fill="#34A853"/>
<path d="M5.63931 15.7497C5.37005 14.9719 5.21421 14.1385 5.21421 13.2774C5.21421 12.4163 5.37005 11.583 5.62515 10.8052L5.61801 10.6396L1.63145 7.60547L1.50101 7.66627C0.63654 9.36073 0.140503 11.2635 0.140503 13.2774C0.140503 15.2913 0.63654 17.194 1.50101 18.8885L5.63931 15.7497Z" fill="#FBBC05"/>
<path d="M12.8964 5.61064C15.2915 5.61064 16.9071 6.62453 17.8284 7.47181L21.4281 4.02734C19.2173 2.01346 16.3403 0.777344 12.8964 0.777344C7.90772 0.777344 3.59931 3.58288 1.50183 7.66618L5.62596 10.8051C6.66064 7.79123 9.52343 5.61064 12.8964 5.61064Z" fill="#EB4335"/>
</svg>

        <p>Google</p>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
  <input  checked={selector?.google === true} disabled={selector?.google!== true} type="checkbox" value="" class="sr-only peer" />
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span>
</label>
</div>
    </div>
</div>
<div style={{borderBottom:'1px solid #3d3d3d'}} className="connectiondata-inputtext votreid flex flex-col justify-center">
    <p>Votre ID</p>
<div className="connectiondata-input relative">
<input disabled placeholder={selector?._id}></input>
<svg className="cursor-pointer" onClick={(e)=>{
navigator.clipboard.writeText(selector?._id)
toastr.success('identifiant copié avec succès')

}} width="20" height="19" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9474 0.555664H2.42105C1.08342 0.555664 0 1.65407 0 3.01021V20.192H2.42105V3.01021H16.9474V0.555664ZM20.5789 5.46476H7.26316C5.92553 5.46476 4.84211 6.56316 4.84211 7.9193V25.1011C4.84211 26.4573 5.92553 27.5557 7.26316 27.5557H20.5789C21.9166 27.5557 23 26.4573 23 25.1011V7.9193C23 6.56316 21.9166 5.46476 20.5789 5.46476ZM20.5789 25.1011H7.26316V7.9193H20.5789V25.1011Z" fill="white"/>
</svg>

</div>
</div>
<button onClick={(e)=>setShowDeletePopup(true)} style={{marginTop:'1rem'}} className="connectiondata-deleteaccount flex flex-row items-center">
<svg  width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.86662 12.0225H9.55551H23.0666" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.3778 12.0223V23.8445C21.3778 24.2924 21.1998 24.722 20.8831 25.0388C20.5664 25.3555 20.1368 25.5334 19.6889 25.5334H11.2444C10.7965 25.5334 10.3669 25.3555 10.0502 25.0388C9.73349 24.722 9.55556 24.2924 9.55556 23.8445V12.0223M12.0889 12.0223V10.3334C12.0889 9.8855 12.2668 9.45592 12.5836 9.1392C12.9003 8.82247 13.3299 8.64453 13.7778 8.64453H17.1556C17.6035 8.64453 18.0331 8.82247 18.3498 9.1392C18.6665 9.45592 18.8444 9.8855 18.8444 10.3334V12.0223" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.7777 16.2441V21.3108" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.1556 16.2441V21.3108" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

Supprimer le compte
</button>

        </div>
    )
}
export default Connectiondatacontent;