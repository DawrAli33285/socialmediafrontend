import React from "react";
import { useDispatch } from "react-redux";
import 'toastr/build/toastr.min.css';
import socketContext from "../../context/Socketcontext";
import toastr from 'toastr'
import { useContext } from "react";
import { differenceInHours, differenceInDays } from 'date-fns';
import {getNotifications} from '../../redux/slices/notificationSlice'
const Notificationscontent=()=>{
const dispatch=useDispatch();
const socketcontext=useContext(socketContext)
const [notifications,setNotifications]=React.useState([])
    React.useEffect(()=>{
fetchNotification();
    },[])   
    
    React.useEffect(() => {
        socketcontext?.current?.on('socketnotification', (data) => {
            console.log('socketnotification on');
            console.log(data);
    
            // Convert createdAt to relative time string for the new notification
            const newNotification = {
                ...data,
                time: calculateTimeAgo(data.createdAt)
            };
    
            setNotifications(prev => [...prev, newNotification]);
        });
    }, [socketcontext?.current]);
    const calculateTimeAgo = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
    
        const minutesAgo = Math.floor((now - createdDate) / 60000); // Difference in minutes
        if (minutesAgo < 1) {
            return 'just now';
        } else if (minutesAgo < 60) {
            return `${minutesAgo}m ago`;
        }
    
        const hoursAgo = differenceInHours(now, createdDate);
        if (hoursAgo < 24) {
            return `${hoursAgo}h ago`;
        }
    
        const daysAgo = differenceInDays(now, createdDate);
        return `${daysAgo}d ago`;
    };
    
    const fetchNotification = async () => {
        let res = await dispatch(getNotifications());
        if (getNotifications.rejected.match(res)) {
            console.log('notificationget response');
            console.log(res);
            toastr.error(res.payload.error);
        }
        if (getNotifications.fulfilled.match(res)) {
            console.log('notificationget response');
            console.log(res);
            const updatedNotifications = res.payload.notifications.map(notification => ({
                ...notification,
                time: calculateTimeAgo(notification.createdAt)
            }));
            setNotifications(prevNotifications => [...prevNotifications, ...updatedNotifications]);
        }
    };

    return(
        <div className="notificationscontent-div">
{notifications?.map((val,i)=>{
console.log('notification')
console.log(val)
    return <div key={i.toString()} className="notification-data flex flex-row relative">
   <div className="flex flex-row space-x-2 notificaiton-avatar-text">
  {val?.creator? <div className="notification-avatar">
    <img src={val?.creator?"https://cdn.pixabay.com/photo/2014/04/03/10/32/user-310807_1280.png":''}></img>
    </div>:''}
    <div className="flex flex-col">
    <p className="flex flex-row">
    
    <span className="mx-2 flex flex-row">
    {val?.creator?.name} {val?.reason}
</span>
    </p>
    <p className="text-sm mx-2" style={!val?.creator ? { marginLeft: '5%' } : {}}>
  {val?.time?.includes('0h ago') ? 'just now' : val?.time}
</p>

    </div>
    </div>

  
    <div className="notification-arrowicon">
    <svg width="12" height="15" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.92182 20.9999C2.16905 21.0007 2.41333 20.9512 2.63671 20.8552C2.86009 20.7591 3.05688 20.619 3.21264 20.4449L11.2058 11.4458C11.4492 11.1774 11.5823 10.8408 11.5823 10.4934C11.5823 10.146 11.4492 9.80935 11.2058 9.54098L2.93131 0.541827C2.65041 0.235531 2.24676 0.0429128 1.80916 0.00634665C1.37156 -0.0302195 0.935856 0.0922618 0.597898 0.346846C0.259939 0.601429 0.047411 0.967262 0.00706482 1.36386C-0.0332813 1.76047 0.10186 2.15535 0.382761 2.46165L7.78016 10.5009L0.630997 18.5401C0.42863 18.7603 0.300082 19.0284 0.260564 19.3127C0.221045 19.597 0.27221 19.8856 0.408005 20.1443C0.543798 20.4031 0.758538 20.6212 1.02681 20.7728C1.29509 20.9244 1.60568 21.0032 1.92182 20.9999Z" fill="white"/>
    </svg>
    </div>
    
    </div>
    
})}
        </div>
    )
}

export default Notificationscontent