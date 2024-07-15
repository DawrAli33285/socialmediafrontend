import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {persistor} from '../store/store'

const initialState = {
    account: '',
    user:'',
    conversation:'',
    notifications:'',
    post:'',
    search:'',
    subscription:'',
    review:''
   
};
const BASE_URL = 'http://localhost:5000'; 
export const logout=createAction('account/logout')

export const changeCredentials=createAsyncThunk('account/update',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let res=await axios.post(`${BASE_URL}/change-credentials`,state,headers)
return res
    }catch(error){
       
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const deleteAccount=createAsyncThunk('account/delete',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let response=await axios.delete(`${BASE_URL}/deleteAccount`,headers)
return response
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const getuserinfo=createAsyncThunk('account/userinfo',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let response=await axios.get(`${BASE_URL}/getuserinfo`,headers)
return response        
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const updateUserInfo=createAsyncThunk('account/update_userinfo',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
        let response=await axios.post(`${BASE_URL}/update-userinfo`,state,headers)
return response        
       
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const getNotificationOptions=createAsyncThunk('account/getnotification_options',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let response=await axios.get(`${BASE_URL}/get-notification_options`,headers)
return response 
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const updateNotificationOptions=createAsyncThunk('account/updatenotification_options',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let res=await axios.post(`${BASE_URL}/update-notification_options`,state,headers)
return res
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})


const accountSlice=createSlice({
    name:'accountslice',
    initialState:{
        account:''
    },
    extraReducers:(builder)=>{


        builder.addCase(changeCredentials.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
     builder.addCase(deleteAccount.rejected,(state,action)=>{
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;   
     })
     builder.addCase(deleteAccount.fulfilled,(state,action)=>{
        window.location.href='/'
     })
     builder.addCase(getuserinfo.pending,(state,action)=>{
        state.loading=true
     })   
     builder.addCase(getuserinfo.fulfilled,(state,action)=>{
        state.userinfo=action.payload
     })
     builder.addCase(getuserinfo.rejected,(state,action)=>{
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;   
     })
     builder.addCase(updateUserInfo.pending,(state,action)=>{
        state.loading=true
     })   
     builder.addCase(updateUserInfo.fulfilled,(state,action)=>{
        state.userinfo=action.payload
     })
     builder.addCase(updateUserInfo.rejected,(state,action)=>{
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;   
     })
     builder.addCase(getNotificationOptions.pending,(state,action)=>{
state.loading=true;
     })
builder.addCase(getNotificationOptions.fulfilled,(state,action)=>{
state.notification_options=action.payload;
state.loading=false;
})
builder.addCase(getNotificationOptions.rejected,(state,action)=>{
    state.appErr = action.payload?.message;
    state.serverErr = action.error?.message;
    state.loading = false;   
})

builder.addCase(updateNotificationOptions.pending,(state,action)=>{
    state.loading=true;
         })
    builder.addCase(updateNotificationOptions.fulfilled,(state,action)=>{
    state.notification_options=action.payload;
    state.loading=false;
    })
    builder.addCase(updateNotificationOptions.rejected,(state,action)=>{
        state.appErr = action.payload?.message;
        state.serverErr = action.error?.message;
        state.loading = false;   
    })
    builder.addCase('account/logout',(state,action)=>{
state=initialState;
        window.location.href='/'

    })

    }
})

export default accountSlice.reducer