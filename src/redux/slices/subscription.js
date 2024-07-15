import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const BASE_URL = 'http://localhost:5000'; 

export const subscription=createAsyncThunk('subscription/create',async(state,thunkApi)=>{
 try{
    const token=thunkApi.getState();
  console.log('token')
  console.log(token?.authenticationslices?.user?.user?.token)  
let headers = {
headers: {
    Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
}
};
    let response=await axios.post(`${BASE_URL}/subscribe`,state,headers) 
return response

 }catch(error){
    console.log("slice error")
    console.log(error)
    if (error.response && error.response.data) {
          
        return thunkApi.rejectWithValue(error.response.data);
    } else {
        return thunkApi.rejectWithValue({ error: "erreur de serveur, veuillez essayer plus tard" });
    }
 } 
})


export const getSubscriptions=createAsyncThunk('subscription/get',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
      let headers = {
      headers: {
          Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
      }
      };
let res=await axios.get(`${BASE_URL}/get-subscriptions`,headers)
return res
    }catch(error){
        if (error.response && error.response.data) {
          
            return thunkApi.rejectWithValue(error.response.data);
        } else {
            return thunkApi.rejectWithValue({ error: "ne peut pas exécuter la requête en raison d'une erreur du serveur" });
        } 
    }
})

export const getStripeSubscriptions=createAsyncThunk('subscription/stripe_sub',async(state,thunkApi)=>{
    try{
let res=await axios.get(`${BASE_URL}/getStripeSubscription/${state}`)
return res
    }catch(error){
        if (error.response && error.response.data) {
          
            return thunkApi.rejectWithValue(error.response.data);
        } else {
            return thunkApi.rejectWithValue({ error: "ne peut pas exécuter la requête en raison d'une erreur du serveur" });
        } 
    }
})

export const reserveCall=createAsyncThunk('subscription/reserve',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
        let headers = {
        headers: {
            Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
        }
        };
  let res=await axios.post(`${BASE_URL}/reserve-call`,state,headers)
  return res
       
    }catch(error){
        if (error.response && error.response.data) {
          
            return thunkApi.rejectWithValue(error.response.data);
        } else {
            return thunkApi.rejectWithValue({ error: "ne peut pas exécuter la requête en raison d'une erreur du serveur" });
        } 
    }
})

const subSlice=createSlice({
    name:'subslice',
    initialState:{
        subscription:''
    },
    extraReducers:(builder)=>{
        builder.addCase(subscription.pending,(state,action)=>{
            state.loading=false
        })
        builder.addCase(subscription.fulfilled,(state,action)=>{
            state.loading=false;
            state.subscription="success";
        })
        builder.addCase(subscription.rejected,(state,action)=>{
            state.loading=false;
            state.appErr=action?.payload?.error
            state.serverErr=action?.error?.message
        })
        builder.addCase(getSubscriptions.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getSubscriptions.fulfilled,(state,action)=>{
            state.loading=false;
            state.subscription=action?.payload;
        })
        builder.addCase(getSubscriptions.rejected,(state,action)=>{
            state.loading=false;
            state.appErr=action?.payload?.error
            state.serverErr=action?.error?.message
        })
        builder.addCase(getStripeSubscriptions.pending,(state,action)=>{
state.loading=true
        })
        builder.addCase(getStripeSubscriptions.fulfilled,(state,action)=>{
state.loading=false;
state.stripeSub=action?.payload
        })
        builder.addCase(getStripeSubscriptions.rejected,(state,action)=>{

state.loading=false;
state.appErr=action?.payload?.error
state.serverErr=action?.error?.message
        })
    }
})
export default subSlice.reducer;