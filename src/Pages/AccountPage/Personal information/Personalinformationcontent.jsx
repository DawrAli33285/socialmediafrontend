import React,{useState} from "react";
import {useDispatch} from 'react-redux'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { getuserinfo, updateUserInfo } from "../../../redux/slices/accountSlice";
const Personalinformationcontent=()=>{
    const [gender, setGender] = useState('homme');
    const [state,setState]=React.useState({
        first_name:'',
        last_name:'',
        date_of_birth:'',
        address:'',
        city:'',
        country:'',
        postal_code:'',
        phone_number:'',
        gender:''
    })
const [userinfo,setUserInfo]=React.useState([])
const dispatch=useDispatch();
  const handleRadioChange = (event) => {
    setState({
        ...state,
        gender:event.target.value
    });

  };
  React.useEffect(()=>{
fetchuserInfo()
  },[])
    
  const fetchuserInfo=async()=>{
let userinfores=await dispatch(getuserinfo())
if(getuserinfo.fulfilled.match(userinfores)){
console.log('userinfores')
if (userinfores.payload.data.response.gender !== null) {
  console.log('userinfo')
  console.log(userinfo)
    setState(prevState => ({
        ...prevState,
        gender: userinfores.payload.data.response.gender
    }));
}else{
    setState(prevState => ({
        ...prevState,
        gender: "homme"
    }));
}
if (userinfores.payload.data.response.date_of_birth) {
    const formattedDate = new Date(userinfores.payload.data.response.date_of_birth).toISOString().split('T')[0];
    setState(prevState => ({
        ...prevState,
        date_of_birth: formattedDate
    }));
}

setUserInfo(userinfores.payload.data.response)
console.log(userinfores)
}
if(getuserinfo.rejected.match(userinfores)){

    toastr.error('can not perform request due to server error')
}




  }

  const updateinfo=async()=>{
    let updateres=await dispatch(updateUserInfo(state))
    if(updateUserInfo.rejected.match(updateres)){
        console.log('updateres')
        console.log(updateres)
    }
    
    if(updateUserInfo.fulfilled.match(updateres)){
        console.log('updateres')
        console.log(updateres)
        toastr.success("informations mises à jour avec succès")
    window.location.reload(true)
    }
    }
  return(

        <div className="connectiondatacontent-div">
<div className="flex flex-col md:flex-row personalinformation-twoinputdivs ">
<div className="flex flex-col personalinformation-textandinputdiv">
    <p>Prenom</p>
<div className="personalinformation-inputdiv flex flex-row">
    <input value={state.first_name} onChange={(e)=>setState({
        ...state,
        first_name:e.target.value
    })} placeholder={userinfo.first_name?userinfo?.first_name:''}/>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
</div>

<div className="flex flex-col personalinformation-textandinputdiv">
    <p>Nom</p>
<div className="personalinformation-inputdiv flex flex-row">
    <input value={state.last_name} onChange={(e)=>setState({
        ...state,
        last_name:e.target.value
    })} placeholder={userinfo.last_name?userinfo?.last_name:''}/>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
</div>

</div>

<div className="personalinformation-genderselect">
<p>Sexe</p>
<div className="flex flex-row space-x-5">
<label className="inline-flex items-center">
            <input
              type="radio"
              value="homme"
              checked={state.gender === 'homme'}
              onChange={handleRadioChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Homme</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="femme"
              checked={state.gender === 'femme'}
              onChange={handleRadioChange}
              className="form-radio h-5 w-5 text-pink-600"
            />
            <span className="ml-2 text-gray-700">Femme</span>
          </label>
</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Date de naissance</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input type="date" value={state.date_of_birth} onChange={(e)=>setState({
    ...state,
    date_of_birth:e.target.value
})} placeholder={userinfo.date_of_birth?state?.date_of_birth:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Adresse</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input value={state.address} onChange={(e)=>setState({
    ...state,
    address:e.target.value
})} placeholder={userinfo.address?userinfo?.address:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Ville</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input value={state.city} onChange={(e)=>setState({
    ...state,
    city:e.target.value
})} placeholder={userinfo.city?userinfo?.city:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Code postal</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input value={state.postal_code} onChange={(e)=>setState({
    ...state,
    postal_code:e.target.value
})} placeholder={userinfo.postal_code?userinfo?.postal_code:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Pays</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input value={state.country} onChange={(e)=>setState({
    ...state,
    country:e.target.value
})} placeholder={userinfo.country?userinfo?.country:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>
<div style={{marginTop:'2rem'}}>
    <p>Numéro de téléphone</p>
<div className="personalinformation-fullinputdivs flex flex-row">
<input value={state.phone_number} onChange={(e)=>setState({
    ...state,
    phone_number:e.target.value
})} placeholder={userinfo.phone_number?userinfo?.phone_number:''}/>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
</div>

<div  className="personalinformation-savebtndiv">
    <button onClick={updateinfo} className="personalinformation-savebtn">Enregistrer</button>
</div>
        </div>
    )
}

export default Personalinformationcontent;