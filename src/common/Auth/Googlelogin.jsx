import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import React from "react";
import { useDispatch } from 'react-redux';
import { googleLoginAction } from '../../redux/slices/authenticationslices';
import { useGoogleLogin } from '@react-oauth/google';

const Googlogin = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const authenticate = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/userinfo.profile',
        onSuccess: async tokenResponse => {
          console.log(tokenResponse);
          try {
            const responsePeople = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays', {
              headers: { 'Authorization': `Bearer ${tokenResponse.access_token}` },
            });
            console.log('People API response:', responsePeople.data);
            
            // Extract the primary birthday
            const birthdays = responsePeople.data.birthdays;
            const primaryBirthday = birthdays.find(birthday => birthday.metadata && birthday.metadata.primary);
            let formattedBirthday = null;
            if (primaryBirthday && primaryBirthday.date) {
              const { year, month, day } = primaryBirthday.date;
              formattedBirthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            }

        
            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });

            const { email_verified, sub, name, email } = userInfoResponse.data;

            if (email_verified) {
              const userData = {
                id: sub,
                name,
                email,
                date_of_birth: formattedBirthday, 
              };

              const sliceResponse = await dispatch(googleLoginAction(userData));
              if (googleLoginAction.rejected.match(sliceResponse)) {
                toastr.error(sliceResponse.payload.error);
              }
              if(googleLoginAction.fulfilled.match(sliceResponse)){
                  toastr.success("Vérification par e-mail envoyée")
                  navigate('/feed')
                }
            } else {
              toastr.error("L'inscription a échoué, veuillez réessayer");
            }
          } catch (error) {
            toastr.error(error.message);
          }
        },
    });

    return (
        <>
            <button class="socialbutton" onClick={() => authenticate()}>
            <svg width="25" height="18" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.7498 12.7778C25.7498 11.75 25.6647 11 25.4805 10.2222H13.5049V14.8611H20.5343C20.3926 16.0139 19.6273 17.75 17.9266 18.9166L17.9028 19.0719L21.6893 21.9466L21.9516 21.9722C24.3608 19.7916 25.7498 16.5833 25.7498 12.7778Z" fill="#4285F4"/>
<path d="M13.5054 25C16.9493 25 19.8404 23.8888 21.9521 21.9722L17.9272 18.9166C16.8501 19.6527 15.4045 20.1666 13.5054 20.1666C10.1324 20.1666 7.26965 17.9861 6.24914 14.9722L6.09956 14.9847L2.16233 17.9708L2.11084 18.1111C4.20832 22.1944 8.51673 25 13.5054 25Z" fill="#34A853"/>
<path d="M6.24881 14.9723C5.97954 14.1945 5.82371 13.3611 5.82371 12.5C5.82371 11.6389 5.97954 10.8056 6.23464 10.0278L6.22751 9.86215L2.24094 6.82806L2.11051 6.88886C1.24604 8.58333 0.75 10.4861 0.75 12.5C0.75 14.5139 1.24604 16.4166 2.11051 18.1111L6.24881 14.9723Z" fill="#FBBC05"/>
<path d="M13.5054 4.8333C15.9005 4.8333 17.5161 5.84718 18.4374 6.69447L22.0371 3.25C19.8263 1.23612 16.9493 0 13.5054 0C8.51672 0 4.20832 2.80553 2.11084 6.88883L6.23497 10.0278C7.26965 7.01388 10.1324 4.8333 13.5054 4.8333Z" fill="#EB4335"/>
</svg>
Se connecter avec google
            </button>
        </>
    );
};

export default Googlogin;
