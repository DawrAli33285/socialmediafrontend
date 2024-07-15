import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment, { duration } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { useState,useEffect } from "react";
import "./schedular.css"
import 'moment/locale/fr';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'
import { useLocation,useNavigate } from 'react-router-dom';

moment.locale('fr');
const localizer = momentLocalizer(moment); // Define localizer here
const Schedular = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedTimeSlotIndex, setHighlightedTimeSlotIndex] = useState(null); 
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState({ date: null, time: null, price: null });
const [creator,setCreator]=React.useState({
  name:'',
  id:''
})
  useEffect(() => {
    const slots = generateTimeSlots(selectedDate);
    setTimeSlots(slots);
  }, [selectedDate]);
useEffect(()=>{
getCreatorData();
},[])
const getCreatorData=()=>{
const search=location.search
const params=new URLSearchParams(search)
const name=params.get('name')
const id=params.get('id') 
setCreator({
name,
id  
})
}

  const generateTimeSlots = (date) => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} - ${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`,
          price: '50€',
        });
      }
    }
    return slots;
  };
  const cancel=()=>{
    const search=location.search
const params=new URLSearchParams(search)
const id=params.get('id') 
navigate(`/chat?creator=${id}`)
  }

  const navigateDay = (direction) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction);
      if(direction === 1){
        setHighlightedTimeSlotIndex(0);
      } else {
        setHighlightedTimeSlotIndex(0);
      }
      return newDate;
    });
  };

  const handleTimeSlotClick = (index) => {
    setHighlightedTimeSlotIndex(index);
    setSelectedDetails({
      date: selectedDate.toLocaleDateString(),
      time: timeSlots[index]?.time,
      price: timeSlots[index]?.price
    });
  };

  return (
    <div className='schedular-div'>
    <div className='flex flex-row schedular-first-row'>
<div className='flex flex-row space-x-2'>
<div>
  <img style={{width:'30px',height:'30px',borderRadius:'50%'}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
</div>
<div className='flex flex-col space-y-2'>
<p>Jade Be</p>
<p>Développement personnel</p>
</div>
</div>
<div className='schedular-cross-icon'>
<svg className='cursor-pointer' onClick={(e)=>navigate(-1)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 4.47852L6 16.4785" stroke="#F6EFEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 4.47852L18 16.4785" stroke="#F6EFEF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</div>
    </div>
    <div className="day-scheduler">
  <div className='calandar'>




  <div className="header">
        <div className='flex flex-row  schedular-second-row'>
        <svg width="115" height="115" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_93_604)">
<circle cx="57.2023" cy="57.2024" r="19.2023" fill="url(#paint0_linear_93_604)"/>
</g>
<path d="M57.5 65.9532C62.3325 65.9532 66.25 62.0357 66.25 57.2032C66.25 52.3708 62.3325 48.4532 57.5 48.4532C52.6675 48.4532 48.75 52.3708 48.75 57.2032C48.75 62.0357 52.6675 65.9532 57.5 65.9532Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M57.5 51.9532V57.2032L61 58.9532" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<defs>
<filter id="filter0_d_93_604" x="0.237717" y="0.237839" width="113.929" height="113.929" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="18.8811"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.516667 0 0 0 0 0.623 0 0 0 0 1 0 0 0 0.44 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_93_604"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_93_604" result="shape"/>
</filter>
<linearGradient id="paint0_linear_93_604" x1="42.6601" y1="69.158" x2="74.2068" y2="49.5839" gradientUnits="userSpaceOnUse">
<stop stop-color="#0061BA"/>
<stop offset="1" stop-color="#295AD7"/>
</linearGradient>
</defs>
</svg>
<p>
Sélectionner la date et l’heure 
</p>
        </div>
       <div className='flex flex-row prev-next-date'>
       <button className='flex flex-row'  onClick={() => navigateDay(-1)}>
       <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18.9048L9 12.9048L15 6.90479" stroke="#C3C4D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 
       <span>
       Jour prévieux
       </span>
       </button>
       <p>
       {selectedDate.toLocaleDateString()}
       </p>
        <button className='flex flex-row' onClick={() => navigateDay(1)}>
       
          <span>
          Jour autre
          </span>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 18.9048L15.5 12.9048L9.5 6.90479" stroke="#C3C4D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
       </div>
      </div>
   
      <div>
        {/* Display the selected details */}
        {/* Selected Details: {selectedDetails.date} - {selectedDetails.time} - {selectedDetails.price} */}
      </div>
      <div className="time-slots-grid" style={{marginTop:'5%'}}>
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`time-slot ${
              highlightedTimeSlotIndex === index ? 'highlighted' : ''
            }`}
            onClick={() => handleTimeSlotClick(index)}
            >
            <div className="time">{slot.time}</div>
            <div className="price">{slot.price}</div>
          </div>
        ))}
      </div>
  </div>
    </div>
    <div>
      
    </div>
      <div>
        
      </div>
  <div className='schedular-second-last-row space-x-5'>
 <div className='schedular-date'>
 <div className='flex flex-row space-x-2'>
          <div className='flex flex-row space-x-2'>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_93_682)">
<path d="M14.401 3.03259H3.78939C2.95215 3.03259 2.27344 3.71131 2.27344 4.54854V15.1602C2.27344 15.9974 2.95215 16.6761 3.78939 16.6761H14.401C15.2383 16.6761 15.917 15.9974 15.917 15.1602V4.54854C15.917 3.71131 15.2383 3.03259 14.401 3.03259Z" stroke="white" stroke-width="1.51595" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.1279 1.51599V4.54789" stroke="white" stroke-width="1.51595" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.06348 1.51599V4.54789" stroke="white" stroke-width="1.51595" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.27344 7.58044H15.917" stroke="white" stroke-width="1.51595" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_93_682">
<rect width="18.1914" height="18.1914" fill="white" transform="translate(0 0.000366211)"/>
</clipPath>
</defs>
</svg>

          </div>
<p>
Emplacement réservé réservé avec Jade Be
</p>
        </div>
        <div className='flex flex-row space-x-3'>
          <div>
          <img style={{width:'30px',height:'30px',borderRadius:'50%'}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
          </div>
          <div>
            <p>{creator.name}</p>
            <p>9:30 - 10:00 Emplacement réservé</p>
            <p>Prix - {selectedDetails?.price}</p>
          </div>
        </div>
 </div>
  </div>
  <div className='schdular-last-row'>
<button onClick={cancel}>
<span>
Annuler
</span>
</button>
<button onClick={()=>selectedDetails?.price!=null?navigate(`/payments?name=${creator.name}&id=${creator.id}&price=${selectedDetails?.price}&date=${selectedDetails.date}&time=${selectedDetails.time}`):toastr.error('Please select day')}>
<span>
Réserver
</span>
</button>
  </div>
        </div>
  );
};

export default Schedular;