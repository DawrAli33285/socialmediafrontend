import { Link } from 'react-router-dom';
import toastr from 'toastr'
import React from "react";
import EntryNavbar from "../../common/EntryNavbar/EnterNavbar";
import 'toastr/build/toastr.min.css';
import './registration.css'
import {registerAction} from '../../redux/slices/authenticationslices'
import {useDispatch} from 'react-redux'
import Googleauth from '../../common/Auth/Googleauth';
import Facebookauth from '../../common/Auth/Facebookauth';
const Registration=()=>{
  const [toggleShowPassword,setTogglePasswordShow]=React.useState(false)
  const [state,SetState]=React.useState({
    name:'',
    date_of_birth:'',
    email:'',
    email_confirmation:'',
    password:'',
    generalConditionsCheck:'',
    confidentialityPolicyCheck:''
  })
  const [dateInput, setDateInput] = React.useState({
    date_of_birth: '',
    maxDate: ''
  });
  const dispatch=useDispatch();
  const handleDateChange = (e) => {
    const chosenDate = new Date(e.target.value);
    const chosenYear = chosenDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const maxDate = `${currentYear}-12-31`;

    if (chosenYear <= currentYear) {
      SetState({
        ...state,
        [e.target.name]:e.target.value
      })
    }
  };

  React.useEffect(() => {
    toastr.options.positionClass = 'toast-top-right';
    const currentYear = new Date().getFullYear();
    const maxDateValue = `${currentYear}-12-31`;
    setDateInput(prevState => ({ ...prevState, maxDate: maxDateValue }));
  }, []); 

const togglePasswordShow=()=>{
  // <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
setTogglePasswordShow((prev)=>{
  let old=prev;
  if(old==false){
let passwordinput=document.querySelector('#passwordinput')
passwordinput.setAttribute('type','text')
}else{
let passwordinput=document.querySelector('#passwordinput')
passwordinput.setAttribute('type','password') 
}

  return !old
})

}


  const Register =async () => {
    
    // Set toastr options right before displaying the toast
    toastr.options.positionClass = 'toast-top-right';
    toastr.remove();
  
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

    const trimmedPassword = state.password.trim();

   
    if (state.name.length === 0) {
      toastr.error("S'il vous plaît entrez votre nom");
    } else if (state.date_of_birth.length === 0) {
      toastr.error("Veuillez saisir une date de naissance");
    } else if (state.email.length === 0) {
      toastr.error("Veuillez entrer votre email");
    } else if (state.email_confirmation.length === 0) {
      toastr.error("veuillez confirmer votre email");
    } else if (state.email_confirmation !== state.email) {
      toastr.error("Les e-mails ne correspondent pas");
    } else if (trimmedPassword.length === 0) {
      toastr.error("Veuillez entrer un mot de passe");
    } else if (trimmedPassword.length < 8 || trimmedPassword.length > 64) {
      toastr.error("Le mot de passe doit être entre 8 et 64 caractères");
    } else if (!/[a-z]/.test(trimmedPassword)) {
      toastr.error("Le mot de passe doit contenir au moins une minuscule");
    } else if (!/[A-Z]/.test(trimmedPassword)) {
      toastr.error("Le mot de passe doit contenir au moins une majuscule");
    } else if (!/\d/.test(trimmedPassword)) {
      toastr.error("Le mot de passe doit contenir au moins un chiffre");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
      toastr.error("Le mot de passe doit contenir au moins un caractère spécial");
    } else if (state.generalConditionsCheck !== true) {
      toastr.error("Veuillez accepter les conditions générales");
    } else if (state.confidentialityPolicyCheck !== true) {
      toastr.error("Veuillez consulter la politique de confidentialité");
    } else {
      //proceed registration
      // Proceed with registration
  
      let response=await dispatch(registerAction(state))
  if(registerAction.rejected.match(response)){
toastr.error(response.payload.error)
  }

  if(registerAction.fulfilled.match(response)){
    toastr.success("Email sent successfully")
  SetState({
    email:'',
    email_confirmation:'',
    date_of_birth:'',
    name:'',
    password:'',
    generalConditionsCheck:false,
    confidentialityPolicyCheck:false
  })
  }

  
    }
  };


  return(
    <div id="registration-div">
<EntryNavbar/>
<div id="registartion-content" className="flex flex-col md:flex-row md:flex">
<div id="registration-img">
<img src="/images/authentication pages/Group 1788.png"/>
</div>
<div className="registration-formdiv flex flex-col">
<h2>Inscription</h2>
<p>Inscrivez-vous pour créer votre compte</p>
<div className="registration-form">
<div className="flex flex-row justify-between items-center first">
    <p>S’inscrire avec l’e-mail</p>
    <svg width="15" height="10" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.2133 11.9978L21.5131 3.16869C21.6674 3.02368 21.7898 2.85115 21.8734 2.66106C21.957 2.47097 22 2.26708 22 2.06115C22 1.85522 21.957 1.65133 21.8734 1.46124C21.7898 1.27115 21.6674 1.09863 21.5131 0.953612C21.2047 0.663076 20.7875 0.5 20.3527 0.5C19.9178 0.5 19.5007 0.663076 19.1923 0.953612L10.9623 8.67519L2.81465 0.953612C2.50625 0.663076 2.08907 0.5 1.65422 0.5C1.21937 0.5 0.802193 0.663076 0.493795 0.953612C0.33827 1.09808 0.214539 1.27037 0.129776 1.46048C0.0450134 1.6506 0.000904083 1.85476 0 2.06115C0.000904083 2.26754 0.0450134 2.47171 0.129776 2.66182C0.214539 2.85194 0.33827 3.02422 0.493795 3.16869L9.79365 11.9978C9.94779 12.1562 10.1349 12.2825 10.3431 12.3689C10.5513 12.4554 10.7761 12.5 11.0035 12.5C11.2308 12.5 11.4556 12.4554 11.6638 12.3689C11.8721 12.2825 12.0591 12.1562 12.2133 11.9978Z" fill="white"/>
</svg>
</div>
<p>Pseudo</p>
<div className="register-form-item flex flex-row relative">
<input value={state.name} name="name" onChange={(e)=>SetState({
  ...state,
  [e.target.name]:e.target.value
})} type="text" placeholder="E.g Jane Sine"></input>
<svg className="absolute reg-formicon" width="20" height="20" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 10.2778C11.3261 10.2778 12.5979 9.7627 13.5355 8.84585C14.4732 7.92901 15 6.6855 15 5.38889C15 4.09227 14.4732 2.84877 13.5355 1.93192C12.5979 1.01508 11.3261 0.5 10 0.5C8.67392 0.5 7.40215 1.01508 6.46447 1.93192C5.52678 2.84877 5 4.09227 5 5.38889C5 6.6855 5.52678 7.92901 6.46447 8.84585C7.40215 9.7627 8.67392 10.2778 10 10.2778ZM10 12.7222C8.05918 12.7208 6.14476 13.1619 4.40884 14.0106C2.67292 14.8593 1.16333 16.0921 0 17.6111C1.16333 19.1301 2.67292 20.3629 4.40884 21.2116C6.14476 22.0603 8.05918 22.5014 10 22.5C11.9408 22.5014 13.8552 22.0603 15.5912 21.2116C17.3271 20.3629 18.8367 19.1301 20 17.6111C18.8367 16.0921 17.3271 14.8593 15.5912 14.0106C13.8552 13.1619 11.9408 12.7208 10 12.7222Z" fill="white"/>
</svg>

</div>
<p>Date de naissance</p>
<div className="register-form-item flex flex-row relative">
<input name="date_of_birth" onChange={handleDateChange} value={state.date_of_birth}   max={dateInput.maxDate}  type="date" placeholder="23/02/1999"></input>
<svg className="absolute reg-formicon" width="25" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 17.5C0 19.2 1.3 20.5 3 20.5H17C18.7 20.5 20 19.2 20 17.5V9.5H0V17.5ZM17 2.5H15V1.5C15 0.9 14.6 0.5 14 0.5C13.4 0.5 13 0.9 13 1.5V2.5H7V1.5C7 0.9 6.6 0.5 6 0.5C5.4 0.5 5 0.9 5 1.5V2.5H3C1.3 2.5 0 3.8 0 5.5V7.5H20V5.5C20 3.8 18.7 2.5 17 2.5Z" fill="white"/>
</svg>

</div>
<p>Email</p>
<div className="register-form-item flex flex-row relative">
<input value={state.email} name="email" onChange={(e)=>SetState({
  ...state,
  [e.target.name]:e.target.value
})} type="text" placeholder="Email
E.g abc@gmail.com"></input>
<svg className="absolute reg-formicon" width="25" height="20" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.41996V15.592L7.086 8.50596L0 1.41996Z" fill="white"/>
<path d="M1.4082 3.8147e-05L10.3792 8.97104C11.5122 10.104 13.4882 10.104 14.6212 8.97104L23.5922 3.8147e-05H1.4082Z" fill="white"/>
<path d="M16.0349 10.385C15.0919 11.329 13.8359 11.85 12.4999 11.85C11.1639 11.85 9.90792 11.329 8.96492 10.385L8.49992 9.91996L1.41992 17H23.5799L16.4999 9.91996L16.0349 10.385Z" fill="white"/>
<path d="M17.9141 8.50596L25.0001 15.592V1.41996L17.9141 8.50596Z" fill="white"/>
</svg>


</div>
<p>Confirmation de l’e-mail</p>
<div className="register-form-item flex flex-row relative">
<input value={state.email_confirmation} name="email_confirmation" onChange={(e)=>SetState({
  ...state,
  [e.target.name]:e.target.value
})} type="text" placeholder="Mot de passe
Entre 8 et 64 caracteres"></input>
<svg className="absolute reg-formicon" width="25" height="20" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1.41996V15.592L7.086 8.50596L0 1.41996Z" fill="white"/>
<path d="M1.4082 3.8147e-05L10.3792 8.97104C11.5122 10.104 13.4882 10.104 14.6212 8.97104L23.5922 3.8147e-05H1.4082Z" fill="white"/>
<path d="M16.0349 10.385C15.0919 11.329 13.8359 11.85 12.4999 11.85C11.1639 11.85 9.90792 11.329 8.96492 10.385L8.49992 9.91996L1.41992 17H23.5799L16.4999 9.91996L16.0349 10.385Z" fill="white"/>
<path d="M17.9141 8.50596L25.0001 15.592V1.41996L17.9141 8.50596Z" fill="white"/>
</svg>


</div>
<p>
Mot de passe
Entre 8 et 64 caracteres
</p>
<div className="register-form-item flex flex-row relative">
<input id="passwordinput" value={state.password} name="password" onChange={(e)=>SetState({
  ...state,
  [e.target.name]:e.target.value
})} type="password" placeholder="E.g abc@gmail.com"></input>
{toggleShowPassword==true?<svg width="25" height="20" onClick={togglePasswordShow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>:<svg onClick={togglePasswordShow}  width="25" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="password-eye" d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5" stroke="#fffafa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
}


</div>

<div className="reg-bar">
<p>Niveau de securite</p>
<svg width="427" height="14" viewBox="0 0 427 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="427" height="14" rx="7" fill="#32344D"/>
</svg>

</div>
<div className="reg-rules">
<p>Pré-requis pour un mot de passe sécurisé</p>
<div className="reg-rules-content flex flex-row">
<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_447)">
<circle cx="37" cy="37" r="9.25" stroke="white" stroke-opacity="0.85" stroke-width="1.5" shape-rendering="crispEdges"/>
</g>
<path d="M35.7999 40.5058C35.6808 40.6195 35.5121 40.7143 35.3632 40.7143C35.2144 40.7143 35.0457 40.6148 34.9216 40.5011L32.1431 37.848L33.0263 37.0047L35.3682 39.2409L41.5605 33.2857L42.4288 34.1432L35.7999 40.5058Z" fill="white"/>
<defs>
<filter id="filter0_d_1_447" x="0.6" y="0.6" width="72.8" height="72.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2.4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_447"/>
<feOffset/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.619608 0 0 0 0 0.811765 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_447"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_447" result="shape"/>
</filter>
</defs>
</svg>
<p>Entre 8 et 64 caracteres</p>
</div>
<div className="reg-rules-content flex flex-row">
<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_447)">
<circle cx="37" cy="37" r="9.25" stroke="white" stroke-opacity="0.85" stroke-width="1.5" shape-rendering="crispEdges"/>
</g>
<path d="M35.7999 40.5058C35.6808 40.6195 35.5121 40.7143 35.3632 40.7143C35.2144 40.7143 35.0457 40.6148 34.9216 40.5011L32.1431 37.848L33.0263 37.0047L35.3682 39.2409L41.5605 33.2857L42.4288 34.1432L35.7999 40.5058Z" fill="white"/>
<defs>
<filter id="filter0_d_1_447" x="0.6" y="0.6" width="72.8" height="72.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2.4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_447"/>
<feOffset/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.619608 0 0 0 0 0.811765 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_447"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_447" result="shape"/>
</filter>
</defs>
</svg>
<p>Comporte une minuscule et une majuscule</p>
</div>
<div className="reg-rules-content flex flex-row">
<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_447)">
<circle cx="37" cy="37" r="9.25" stroke="white" stroke-opacity="0.85" stroke-width="1.5" shape-rendering="crispEdges"/>
</g>
<path d="M35.7999 40.5058C35.6808 40.6195 35.5121 40.7143 35.3632 40.7143C35.2144 40.7143 35.0457 40.6148 34.9216 40.5011L32.1431 37.848L33.0263 37.0047L35.3682 39.2409L41.5605 33.2857L42.4288 34.1432L35.7999 40.5058Z" fill="white"/>
<defs>
<filter id="filter0_d_1_447" x="0.6" y="0.6" width="72.8" height="72.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2.4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_447"/>
<feOffset/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.619608 0 0 0 0 0.811765 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_447"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_447" result="shape"/>
</filter>
</defs>
</svg>
<p>Comporte un chiffre</p>
</div>
<div className="reg-rules-content flex flex-row">
<svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_447)">
<circle cx="37" cy="37" r="9.25" stroke="white" stroke-opacity="0.85" stroke-width="1.5" shape-rendering="crispEdges"/>
</g>
<path d="M35.7999 40.5058C35.6808 40.6195 35.5121 40.7143 35.3632 40.7143C35.2144 40.7143 35.0457 40.6148 34.9216 40.5011L32.1431 37.848L33.0263 37.0047L35.3682 39.2409L41.5605 33.2857L42.4288 34.1432L35.7999 40.5058Z" fill="white"/>
<defs>
<filter id="filter0_d_1_447" x="0.6" y="0.6" width="72.8" height="72.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="2.4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1_447"/>
<feOffset/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0156863 0 0 0 0 0.619608 0 0 0 0 0.811765 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_447"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_447" result="shape"/>
</filter>
</defs>
</svg>
<p>Comporte un caractére spécial</p>
</div>
</div>
<div className="checkbox-container">
  <div className="custom-checkbox">
    <input onChange={(e)=>SetState({
      ...state,
      generalConditionsCheck: e.target.checked
    })} checked={state.generalConditionsCheck} type="checkbox" id="terms" />
    <label htmlFor="terms" onClick={(e) => e.preventDefault()}>
      En vous inscrivant, vous déclarez avoir lu et accepté les 
      <span className="underline-text">conditions générales</span>.
    </label>
  </div>
  <div className="custom-checkbox">
    <input onChange={(e)=>{
      SetState({
        ...state,
        confidentialityPolicyCheck: e.target.checked
      })
    }} checked={state.confidentialityPolicyCheck} type="checkbox" id="privacy" />
    <label htmlFor="privacy" onClick={(e) => e.preventDefault()}>
      En vous inscrivant, vous déclarez avoir lu et accepté la 
      <span className="underline-text">politique de confidentialité</span>.
    </label>
  </div>
</div>

<svg onClick={Register} className="cursor-pointer" width="429" height="61" viewBox="0 0 429 61" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="428" height="60" rx="30" fill="#275ACE"/>
<rect x="0.5" y="0.5" width="428" height="60" rx="30" stroke="#8CC8FF"/>
<path d="M185.033 33.7041C185.033 33.4404 184.992 33.2061 184.91 33.001C184.834 32.7959 184.696 32.6084 184.497 32.4385C184.298 32.2686 184.017 32.1045 183.653 31.9463C183.296 31.7822 182.839 31.6152 182.282 31.4453C181.673 31.2578 181.11 31.0498 180.595 30.8213C180.085 30.5869 179.64 30.3174 179.259 30.0127C178.878 29.7021 178.582 29.3477 178.371 28.9492C178.16 28.5449 178.055 28.0791 178.055 27.5518C178.055 27.0303 178.163 26.5557 178.38 26.1279C178.603 25.7002 178.916 25.3311 179.32 25.0205C179.73 24.7041 180.214 24.4609 180.771 24.291C181.327 24.1152 181.942 24.0273 182.616 24.0273C183.565 24.0273 184.383 24.2031 185.068 24.5547C185.76 24.9062 186.29 25.3779 186.659 25.9697C187.034 26.5615 187.222 27.2148 187.222 27.9297H185.033C185.033 27.5078 184.942 27.1357 184.761 26.8135C184.585 26.4854 184.315 26.2275 183.952 26.04C183.595 25.8525 183.141 25.7588 182.59 25.7588C182.068 25.7588 181.635 25.8379 181.289 25.9961C180.943 26.1543 180.686 26.3682 180.516 26.6377C180.346 26.9072 180.261 27.2119 180.261 27.5518C180.261 27.792 180.316 28.0117 180.428 28.2109C180.539 28.4043 180.709 28.5859 180.938 28.7559C181.166 28.9199 181.453 29.0752 181.799 29.2217C182.145 29.3682 182.552 29.5088 183.021 29.6436C183.729 29.8545 184.348 30.0889 184.875 30.3467C185.402 30.5986 185.842 30.8857 186.193 31.208C186.545 31.5303 186.809 31.8965 186.984 32.3066C187.16 32.7109 187.248 33.1709 187.248 33.6865C187.248 34.2256 187.14 34.7119 186.923 35.1455C186.706 35.5732 186.396 35.9395 185.991 36.2441C185.593 36.543 185.112 36.7744 184.55 36.9385C183.993 37.0967 183.372 37.1758 182.687 37.1758C182.071 37.1758 181.465 37.0938 180.867 36.9297C180.275 36.7656 179.736 36.5166 179.25 36.1826C178.764 35.8428 178.377 35.4209 178.09 34.917C177.803 34.4072 177.659 33.8125 177.659 33.1328H179.865C179.865 33.5488 179.936 33.9033 180.076 34.1963C180.223 34.4893 180.425 34.7295 180.683 34.917C180.94 35.0986 181.239 35.2334 181.579 35.3213C181.925 35.4092 182.294 35.4531 182.687 35.4531C183.202 35.4531 183.633 35.3799 183.979 35.2334C184.33 35.0869 184.594 34.8818 184.77 34.6182C184.945 34.3545 185.033 34.0498 185.033 33.7041ZM191.001 23.5V24.7393C191.001 25.1084 190.934 25.4922 190.799 25.8906C190.67 26.2832 190.488 26.6611 190.254 27.0244C190.02 27.3818 189.75 27.6924 189.445 27.9561L188.382 27.2881C188.622 26.9248 188.815 26.541 188.962 26.1367C189.114 25.7266 189.19 25.2666 189.19 24.7568V23.5H191.001ZM195.141 27.4902V37H193.014V27.4902H195.141ZM192.873 24.9941C192.873 24.6719 192.979 24.4053 193.189 24.1943C193.406 23.9775 193.705 23.8691 194.086 23.8691C194.461 23.8691 194.757 23.9775 194.974 24.1943C195.19 24.4053 195.299 24.6719 195.299 24.9941C195.299 25.3105 195.19 25.5742 194.974 25.7852C194.757 25.9961 194.461 26.1016 194.086 26.1016C193.705 26.1016 193.406 25.9961 193.189 25.7852C192.979 25.5742 192.873 25.3105 192.873 24.9941ZM199.562 29.5205V37H197.443V27.4902H199.438L199.562 29.5205ZM199.184 31.8936L198.498 31.8848C198.504 31.2109 198.598 30.5928 198.779 30.0303C198.967 29.4678 199.225 28.9844 199.553 28.5801C199.887 28.1758 200.285 27.8652 200.748 27.6484C201.211 27.4258 201.727 27.3145 202.295 27.3145C202.752 27.3145 203.165 27.3789 203.534 27.5078C203.909 27.6309 204.229 27.833 204.492 28.1143C204.762 28.3955 204.967 28.7617 205.107 29.2129C205.248 29.6582 205.318 30.2061 205.318 30.8564V37H203.191V30.8477C203.191 30.3906 203.124 30.0303 202.989 29.7666C202.86 29.4971 202.67 29.3066 202.418 29.1953C202.172 29.0781 201.864 29.0195 201.495 29.0195C201.132 29.0195 200.807 29.0957 200.52 29.248C200.232 29.4004 199.989 29.6084 199.79 29.8721C199.597 30.1357 199.447 30.4404 199.342 30.7861C199.236 31.1318 199.184 31.501 199.184 31.8936ZM212.815 34.4248C212.815 34.2139 212.763 34.0234 212.657 33.8535C212.552 33.6777 212.35 33.5195 212.051 33.3789C211.758 33.2383 211.324 33.1094 210.75 32.9922C210.246 32.8809 209.783 32.749 209.361 32.5967C208.945 32.4385 208.588 32.248 208.289 32.0254C207.99 31.8027 207.759 31.5391 207.595 31.2344C207.431 30.9297 207.349 30.5781 207.349 30.1797C207.349 29.793 207.434 29.4268 207.604 29.0811C207.773 28.7354 208.017 28.4307 208.333 28.167C208.649 27.9033 209.033 27.6953 209.484 27.543C209.941 27.3906 210.451 27.3145 211.014 27.3145C211.811 27.3145 212.493 27.4492 213.062 27.7188C213.636 27.9824 214.075 28.3428 214.38 28.7998C214.685 29.251 214.837 29.7607 214.837 30.3291H212.719C212.719 30.0771 212.654 29.8428 212.525 29.626C212.402 29.4033 212.215 29.2246 211.963 29.0898C211.711 28.9492 211.395 28.8789 211.014 28.8789C210.65 28.8789 210.349 28.9375 210.108 29.0547C209.874 29.166 209.698 29.3125 209.581 29.4941C209.47 29.6758 209.414 29.875 209.414 30.0918C209.414 30.25 209.443 30.3936 209.502 30.5225C209.566 30.6455 209.672 30.7598 209.818 30.8652C209.965 30.9648 210.164 31.0586 210.416 31.1465C210.674 31.2344 210.996 31.3193 211.383 31.4014C212.109 31.5537 212.733 31.75 213.255 31.9902C213.782 32.2246 214.187 32.5293 214.468 32.9043C214.749 33.2734 214.89 33.7422 214.89 34.3105C214.89 34.7324 214.799 35.1191 214.617 35.4707C214.441 35.8164 214.184 36.1182 213.844 36.376C213.504 36.6279 213.097 36.8242 212.622 36.9648C212.153 37.1055 211.626 37.1758 211.04 37.1758C210.179 37.1758 209.449 37.0234 208.852 36.7188C208.254 36.4082 207.8 36.0127 207.489 35.5322C207.185 35.0459 207.032 34.542 207.032 34.0205H209.08C209.104 34.4131 209.212 34.7266 209.405 34.9609C209.604 35.1895 209.851 35.3564 210.144 35.4619C210.442 35.5615 210.75 35.6113 211.066 35.6113C211.447 35.6113 211.767 35.5615 212.024 35.4619C212.282 35.3564 212.479 35.2158 212.613 35.04C212.748 34.8584 212.815 34.6533 212.815 34.4248ZM220.629 35.4883C220.975 35.4883 221.285 35.4209 221.561 35.2861C221.842 35.1455 222.067 34.9521 222.237 34.7061C222.413 34.46 222.51 34.1758 222.527 33.8535H224.522C224.511 34.4688 224.329 35.0283 223.978 35.5322C223.626 36.0361 223.16 36.4375 222.58 36.7363C222 37.0293 221.358 37.1758 220.655 37.1758C219.929 37.1758 219.296 37.0527 218.757 36.8066C218.218 36.5547 217.77 36.209 217.412 35.7695C217.055 35.3301 216.785 34.8232 216.604 34.249C216.428 33.6748 216.34 33.0596 216.34 32.4033V32.0957C216.34 31.4395 216.428 30.8242 216.604 30.25C216.785 29.6699 217.055 29.1602 217.412 28.7207C217.77 28.2812 218.218 27.9385 218.757 27.6924C219.296 27.4404 219.926 27.3145 220.646 27.3145C221.408 27.3145 222.076 27.4668 222.65 27.7715C223.225 28.0703 223.676 28.4893 224.004 29.0283C224.338 29.5615 224.511 30.1826 224.522 30.8916H222.527C222.51 30.54 222.422 30.2236 222.264 29.9424C222.111 29.6553 221.895 29.4268 221.613 29.2568C221.338 29.0869 221.007 29.002 220.62 29.002C220.192 29.002 219.838 29.0898 219.557 29.2656C219.275 29.4355 219.056 29.6699 218.897 29.9688C218.739 30.2617 218.625 30.5928 218.555 30.9619C218.49 31.3252 218.458 31.7031 218.458 32.0957V32.4033C218.458 32.7959 218.49 33.1768 218.555 33.5459C218.619 33.915 218.73 34.2461 218.889 34.5391C219.053 34.8262 219.275 35.0576 219.557 35.2334C219.838 35.4033 220.195 35.4883 220.629 35.4883ZM228.275 29.3008V37H226.157V27.4902H228.179L228.275 29.3008ZM231.185 27.4287L231.167 29.3975C231.038 29.374 230.897 29.3564 230.745 29.3447C230.599 29.333 230.452 29.3271 230.306 29.3271C229.942 29.3271 229.623 29.3799 229.348 29.4854C229.072 29.585 228.841 29.7314 228.653 29.9248C228.472 30.1123 228.331 30.3408 228.231 30.6104C228.132 30.8799 228.073 31.1816 228.056 31.5156L227.572 31.5508C227.572 30.9531 227.631 30.3994 227.748 29.8896C227.865 29.3799 228.041 28.9316 228.275 28.5449C228.516 28.1582 228.814 27.8564 229.172 27.6396C229.535 27.4229 229.954 27.3145 230.429 27.3145C230.558 27.3145 230.695 27.3262 230.842 27.3496C230.994 27.373 231.108 27.3994 231.185 27.4287ZM234.779 27.4902V37H232.652V27.4902H234.779ZM232.512 24.9941C232.512 24.6719 232.617 24.4053 232.828 24.1943C233.045 23.9775 233.344 23.8691 233.725 23.8691C234.1 23.8691 234.396 23.9775 234.612 24.1943C234.829 24.4053 234.938 24.6719 234.938 24.9941C234.938 25.3105 234.829 25.5742 234.612 25.7852C234.396 25.9961 234.1 26.1016 233.725 26.1016C233.344 26.1016 233.045 25.9961 232.828 25.7852C232.617 25.5742 232.512 25.3105 232.512 24.9941ZM239.227 29.3008V37H237.108V27.4902H239.13L239.227 29.3008ZM242.136 27.4287L242.118 29.3975C241.989 29.374 241.849 29.3564 241.696 29.3447C241.55 29.333 241.403 29.3271 241.257 29.3271C240.894 29.3271 240.574 29.3799 240.299 29.4854C240.023 29.585 239.792 29.7314 239.604 29.9248C239.423 30.1123 239.282 30.3408 239.183 30.6104C239.083 30.8799 239.024 31.1816 239.007 31.5156L238.523 31.5508C238.523 30.9531 238.582 30.3994 238.699 29.8896C238.816 29.3799 238.992 28.9316 239.227 28.5449C239.467 28.1582 239.766 27.8564 240.123 27.6396C240.486 27.4229 240.905 27.3145 241.38 27.3145C241.509 27.3145 241.646 27.3262 241.793 27.3496C241.945 27.373 242.06 27.3994 242.136 27.4287ZM247.479 37.1758C246.776 37.1758 246.141 37.0615 245.572 36.833C245.01 36.5986 244.529 36.2734 244.131 35.8574C243.738 35.4414 243.437 34.9521 243.226 34.3896C243.015 33.8271 242.909 33.2207 242.909 32.5703V32.2188C242.909 31.4746 243.018 30.8008 243.234 30.1973C243.451 29.5938 243.753 29.0781 244.14 28.6504C244.526 28.2168 244.983 27.8857 245.511 27.6572C246.038 27.4287 246.609 27.3145 247.225 27.3145C247.904 27.3145 248.499 27.4287 249.009 27.6572C249.519 27.8857 249.94 28.208 250.274 28.624C250.614 29.0342 250.866 29.5234 251.03 30.0918C251.2 30.6602 251.285 31.2871 251.285 31.9727V32.8779H243.938V31.3574H249.193V31.1904C249.182 30.8096 249.105 30.4521 248.965 30.1182C248.83 29.7842 248.622 29.5146 248.341 29.3096C248.06 29.1045 247.685 29.002 247.216 29.002C246.864 29.002 246.551 29.0781 246.275 29.2305C246.006 29.377 245.78 29.5908 245.599 29.8721C245.417 30.1533 245.276 30.4932 245.177 30.8916C245.083 31.2842 245.036 31.7266 245.036 32.2188V32.5703C245.036 32.9863 245.092 33.373 245.203 33.7305C245.32 34.082 245.49 34.3896 245.713 34.6533C245.936 34.917 246.205 35.125 246.521 35.2773C246.838 35.4238 247.198 35.4971 247.603 35.4971C248.112 35.4971 248.566 35.3945 248.965 35.1895C249.363 34.9844 249.709 34.6943 250.002 34.3193L251.118 35.4004C250.913 35.6992 250.646 35.9863 250.318 36.2617C249.99 36.5312 249.589 36.751 249.114 36.9209C248.646 37.0908 248.101 37.1758 247.479 37.1758Z" fill="white"/>
</svg>
<Googleauth></Googleauth>
<Facebookauth></Facebookauth>
<p className="reg-lastlink">
  Vous avez déjà un compte? <span className="highlight-text">
<Link to='/login'>
Connexion
</Link>

  </span>
</p>
</div>
</div>
</div>

    </div>
)
}
export default Registration;