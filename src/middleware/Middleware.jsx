import React from "react";
import { Outlet,useNavigate } from "react-router-dom";
import {store} from '../redux/store/store'
const Middleware=()=>{
    let token=false
    const navigate=useNavigate();
    return(
        store.getState().authenticationslices?.user?.user?.token?<Outlet/>:window.location.href='/login'
    )
}
export default Middleware;