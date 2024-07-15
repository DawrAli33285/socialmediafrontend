import toastr from 'toastr'
import {useNavigate} from 'react-router-dom'
import 'toastr/build/toastr.min.css';
import {useDispatch} from 'react-redux'
import {LoginSocialFacebook} from 'reactjs-social-login'

import React from "react";
import { facebookLoginAction } from '../../redux/slices/authenticationslices';
const Facebooklogin = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const responseFacebook = async(response) => {
        console.log(response);
        let data={
            accessToken:response.accessToken,
            userID:response.userID
        }
        let res=await dispatch(facebookLoginAction(data))
        if(facebookLoginAction.rejected.match(res)){
       toastr.error(res.payload.error)
        }
        if(facebookLoginAction.fulfilled.match(res)){
            toastr.success("Vérification par e-mail envoyée")
            navigate('/feed')
          }
    
    }

    return (
        <>
              <LoginSocialFacebook
              className="socialbutton"
          appId="878013470725181"
          fieldsProfile={
            'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
          }
    
          onResolve={({ provider, data }) => {
            responseFacebook(data)
          }}
          onReject={err => {
            console.log(err);
          }}
        >
            <button className="flex flex-row fbbtn">
            <svg width="25" height="18" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.5 26.5C20.6797 26.5 26.5 20.6797 26.5 13.5C26.5 6.3203 20.6797 0.5 13.5 0.5C6.3203 0.5 0.5 6.3203 0.5 13.5C0.5 20.6797 6.3203 26.5 13.5 26.5Z" fill="#3C5A9A"/>
<path d="M17.727 4.49023H14.8472C13.1382 4.49023 11.2373 5.20901 11.2373 7.68625C11.2457 8.54941 11.2373 9.37607 11.2373 10.3064H9.26025V13.4525H11.2985V22.5096H15.0439V13.3927H17.5159L17.7396 10.2976H14.9793C14.9793 10.2976 14.9855 8.92074 14.9793 8.5209C14.9793 7.54195 15.998 7.59801 16.0592 7.59801C16.544 7.59801 17.4865 7.59942 17.7284 7.59801V4.49023H17.727Z" fill="white"/>
</svg>

Se connecter avec facebook
            </button>
        </LoginSocialFacebook>
        </>
    )
}

export default Facebooklogin;
