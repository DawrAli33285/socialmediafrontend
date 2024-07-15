import io from 'socket.io-client'
import {prepareConnection,handleSignalingData,handleDisconnect} from './webrtc'

let socket = null;


export const joinRoom=(data)=>{
   console.log('joinRoom')
   console.log(data)
    socket?.emit('joinRoom',data)
   
}
export const connectWithSocketIo=()=>{
socket=io("http://localhost:5000");

socket?.on('conn-prepare',(data)=>{
    console.log('conn-prepare user side')
    console.log(data)
    prepareConnection(data?.connUserSocketId,false)
socket?.emit('conn-init',data)
})

socket?.on('conn-init',(data)=>{
    console.log('conn-init user on function')
    console.log(data.connUserSocketId)
    prepareConnection(data.connUserSocketId,true)
    
    })

socket.on('conn-signal',(data)=>{
    console.log('conn-signal on')
    console.log(data)  
    handleSignalingData(data)
    })
    
   socket.on('leaveCalluser',(data)=>{
    console.log('user leavecalluser on')
  window.location.href='/messenger'
    handleDisconnect();

   }) 

   socket.on('user-disconnected',(data)=>{
    console.log('disconnected')
    console.log(data)
    let disconnectdata={
        connUserSocketId:data.socketId
    }
    handleDisconnect(disconnectdata)
})

socket.on('disconnecteduser',(data)=>{
  handleDisconnect()
})

return socket
    }




export const signalPeerData = (data) => {
    console.log('conn-signal emit')
    console.log(data)
    socket.emit("conn-signal", data);
  };
  
  export const userdisconnected=(data)=>{
console.log('userdisconnected function')
handleDisconnect()
socket.emit('leaveCalluser',data)
// handleDisconnect();
    // socket.disconnect();
  





  }
  export const declineCall=(data)=>{
socket.emit('declineCall',data)

  }