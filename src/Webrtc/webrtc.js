import {joinRoom,signalPeerData} from './wss'
import Peer from 'simple-peer'
let localStream;
const defaultConstraints={
    audio:true,
    video:false
}

export const getLocalPreviewAndInitRoomConnection=async(data)=>{
navigator.mediaDevices.getUserMedia(defaultConstraints).then(async stream=>{
localStream=stream;
localAudioPreview(localStream)
console.log('join room call')
joinRoom(data)
})

}





let peers = {};
let streams = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};


export const prepareConnection=(connUserSocketId,isInitiator)=>{
const configuration=getConfiguration();
console.log('prepareconnection')

console.log(connUserSocketId)
console.log(isInitiator)
console.log(getConfiguration())
peers[connUserSocketId]=new Peer({
    initiator:isInitiator,
    config:configuration,
    stream:localStream

})

console.log(peers)
console.log(peers[connUserSocketId])

peers[connUserSocketId].on('signal',(signal)=>{
  const signalData = {
    signal: signal,
    connUserSocketId
  };
  signalPeerData(signalData)
})

peers[connUserSocketId].on('stream',(stream)=>{
 streams=[...streams,stream]   
 const audioContainer = document.querySelector('.audio-stream');
console.log('audioContainer')
console.log(audioContainer)


// Create a new audio element
const audioElement = document.createElement('audio');
audioElement.controls = true; // Add controls so the user can play/pause, adjust volume

// Set the srcObject to the stream
audioElement.srcObject = stream;

// Assign a unique ID to the audio element
audioElement.id = `${connUserSocketId}-audio`;

// Handle the audio playback to start when the stream is ready
audioElement.onloadedmetadata = () => {
  audioElement.play();
};

// Append the new audio element to the container
audioContainer.appendChild(audioElement);

})

}

export const handleSignalingData=(data)=>{
    console.log(data)
    console.log('handlesignal')
    console.log(peers[data.connUserSocketId])
   
    peers[data.connUserSocketId]?.signal(data?.signal)

}

const localAudioPreview=(stream)=>{
  // const audioContainer = document.querySelector('.audio-stream');
  // const audio = document.createElement('audio');
  // console.log('audio div')
  // console.log(audioContainer)
  // audio.controls = false; // Add controls so the user can play/pause, adjust volume

  // // Set the srcObject to the stream
  // audio.srcObject = stream;

  // // Handle the audio playback to start when the stream is ready
  // audio.onloadedmetadata = () => {
  //   audio.play();
  // };

  // // Append the new audio element to the container
  // audioContainer?.appendChild(audio);
}

export const muteAudio=(ismute)=>{
    
    ismute==true?localStream.getAudioTracks()[0].enabled=false: localStream.getAudioTracks()[0].enabled=true;
}


export const handleDisconnect = () => {
  let audioElement = document.querySelector('.audio-stream');
  if (audioElement) {
      audioElement.innerHTML = ``;
      localStream?.getTracks()?.forEach(track => {
        track?.stop();
    });
      Object.keys(peers).forEach(key => {
          const peer = peers[key];

          // Close and clean up the peer connection
          if (peer) {
              // Close any data channels if you are using them
              // ...

              // Stop all media tracks and destroy the peer connection
              try {
                  // Example: If using media streams
                  // peer.getTracks().forEach(track => track.stop());
                  peer.destroy();
              } catch (error) {
                  console.error('Error destroying peer:', error);
              }
          }

          // Remove the peer from the peers object
          delete peers[key];
      });

      // Reassign peers to a new empty object
      peers = {};

      console.log('Peers after being destroyed and reset:');
      console.log(peers);  // This should now log an empty object
  }
// window.location.href='/messenger'
};
