import { useContext,createContext, useRef } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom';
import { connectWithSocketIo } from '../Webrtc/wss';
import React from 'react';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import {store } from '../redux/store/store'
const socketContext=createContext()
export const SocketProvider=({children})=>{
    let socketRef = useRef();

   React.useEffect(() => {
        // Initialize socket connection
      
        console.log('store');
        console.log(store.getState());
        socketRef.current = connectWithSocketIo();
        console.log('socketRef')
        console.log(socketRef.current)
let authenticationslices=store.getState()?.authenticationslices;
if(authenticationslices?.user?.user){
 socketRef?.current?.emit('connectedUser',authenticationslices.user.user._id.toString())
socketRef?.current?.on('audicall-notification',(data)=>{
    console.log('notification data')
    console.log(data)
    toastr.options = {
        timeOut: 0, // The toast will not automatically close
        extendedTimeOut: 0, // The toast will not automatically close even when the user hovers over it
        tapToDismiss: true, // The toast will close when clicked
        closeButton: true, // Adds a close button to the toast to make it more apparent to the user that they can close it
        escapeHtml: false // Allows HTML in the toast message
      };
      toastr.remove()
      // Split the string into two parts, using ' - ' as the separator
let parts = data.time.split(" - ");

// The first part is the start time, the second part is the end time
let startTime = parts[0];
let endTime = parts[1];
if(data?.calltime==0){
    
    toastr.info(`<a href="/chat?creator=${data?.creator?._id}&audio_call=true&start_time=${startTime}&end_time=${endTime}">U Have a call with ${data.creator.name} click to join</a>`)
}
    

      
      
})
}
        // Disconnect socket when component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []);

    return (
        <socketContext.Provider value={socketRef}>
            {children}
        </socketContext.Provider>
    );
};

export default socketContext;