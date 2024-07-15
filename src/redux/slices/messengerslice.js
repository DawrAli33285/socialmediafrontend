import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const BASE_URL = 'http://localhost:5000'; 
export const getConversation=createAsyncThunk('messenger/get',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
        console.log(token)
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let response=await axios.get(`${BASE_URL}/get-conversation`,headers)

return response.data;
    }catch(error){
        
        if (error?.response?.data) {

       return thunkApi.rejectWithValue(error?.response?.data);
        } else {
            return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
        }
    }
})
export const sendMessage=createAsyncThunk('messenger/send',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let response=await axios.post(`${BASE_URL}/send-message`,state,headers)
return response.data
    }catch(error){
   
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})
export const getMessages=createAsyncThunk('messenger/getmessages',async(state,thunkApi)=>{
  console.log(state)
  console.log('state')
    try{
        const token=thunkApi.getState();
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let response=await axios.get(`${BASE_URL}/get-messages/${state.creator}`,headers)
return response.data
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})

export const seenMessages=createAsyncThunk('message/seen',async(state,thunkApi)=>{
    try{
        console.log('seenMessages')
        console.log(state)
        const token=thunkApi.getState();
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };

        let response=await axios.post(`${BASE_URL}/seen-message`,state,headers)
return response
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    
    }
})



const messengerSlice=createSlice({
    name:'messengerSlice',
    initialState:{
        conversation:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getConversation.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getConversation.fulfilled,(state,action)=>{
            state.loading=false;
            state.conversation=action.payload;
        })
        builder.addCase(getConversation.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
        builder.addCase(sendMessage.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(sendMessage.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload;
        })
        builder.addCase(sendMessage.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
        builder.addCase(getMessages.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getMessages.fulfilled,(state,action)=>{
            state.loading=false;
            state.messages=action.payload;
        })
        builder.addCase(getMessages.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })



        builder.addCase(seenMessages.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(seenMessages.fulfilled,(state,action)=>{
            state.loading=false;
            state.seenmessages=action.payload;
        })
        builder.addCase(seenMessages.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
    }
})
export default messengerSlice.reducer