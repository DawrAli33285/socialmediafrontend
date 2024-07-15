import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import {useNavigate} from 'react-router-dom'
const AudioPlayer = ({ audioUrl,prem,page,isSub,creator }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const navigate=useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPlaying, setIsPlaying] = useState(false); // Track whether the audio is playing

  // Effect for handling the resize event
  useEffect(() => { 
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call the handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect for initializing Wavesurfer
  useEffect(() => {
    // Create a new Wavesurfer instance with the new height
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#C1D6FF',
      progressColor: '#DEC1FF',
      cursorColor: 'transparent', 
      barWidth: 2,
      barRadius: 3,
      responsive: true,
      height: isMobile ? 15 : 25,
      normalize: true,
      
      backend: 'MediaElement',
    });

    wavesurferRef.current = wavesurfer;

    // Load the audio file
    wavesurfer.load(audioUrl);

    // Listen to events
    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    wavesurfer.on('finish', () => setIsPlaying(false));

    // Clean up
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, isMobile]);

  const handlePlayPause = () => {
    wavesurferRef.current.playPause();
  };
  return (
<>

<div style={page=='creatorprofile'?{width:'100%'}:{width:'100%'}} className="audioplayer-div relative">

{prem && isSub==false?<>
<div onClick={()=>navigate(`/subinfo?name=${creator?.name}&id=${creator?._id}&price=50.99€`)} className="locked-post cursor-pointer">

<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="25" cy="25" r="25" fill="white" fill-opacity="0.8"/>
<path d="M29.7192 21.6981V19.8113C29.7192 17.1698 27.6438 15.0943 25.0022 15.0943C22.3607 15.0943 20.2853 17.1698 20.2853 19.8113V21.6981C18.6815 21.6981 17.4551 22.9245 17.4551 24.5283V31.1321C17.4551 32.7358 18.6815 33.9622 20.2853 33.9622H29.7192C31.323 33.9622 32.5494 32.7358 32.5494 31.1321V24.5283C32.5494 22.9245 31.323 21.6981 29.7192 21.6981ZM22.1721 19.8113C22.1721 18.2075 23.3985 16.9811 25.0022 16.9811C26.606 16.9811 27.8324 18.2075 27.8324 19.8113V21.6981H22.1721V19.8113ZM25.9456 29.2453C25.9456 29.8113 25.5683 30.1887 25.0022 30.1887C24.4362 30.1887 24.0589 29.8113 24.0589 29.2453V26.4151C24.0589 25.849 24.4362 25.4717 25.0022 25.4717C25.5683 25.4717 25.9456 25.849 25.9456 26.4151V29.2453Z" fill="#0C0E1C"/>
</svg>

</div>
</>:``}
      <button className="audioplayer-playbtn" onClick={handlePlayPause}>
        {isPlaying ? (
          // Pause SVG
          <svg style={{width:'25px',height:'20px'}} width="25" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 5V19M16 5V19" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        ) : (
          // Play SVG
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.47845 22.6119C3.48152 23.8877 0.863281 22.4535 0.863281 20.0838V3.72212C0.863281 1.35242 3.48152 -0.0817865 5.47845 1.19403L18.2832 9.37486C20.1297 10.5545 20.1297 13.2514 18.2832 14.431L5.47845 22.6119Z" fill="white"/>
          </svg>
        )}
      </button>
      <div style={{paddingTop:'0.5rem'}} className="audioplayer-wave" ref={waveformRef} />
    </div>
</>
  );
};

export default AudioPlayer;
