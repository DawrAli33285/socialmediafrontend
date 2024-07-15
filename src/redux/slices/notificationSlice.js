import axios from 'axios'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
const BASE_URL = 'http://localhost:5000'; 

export const getNotifications=createAsyncThunk('notifications/get',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };

let response=await axios.get(`${BASE_URL}/get-notifications`,headers)
console.log(response)
return response.data
    }catch(e){
if(e.response.data){
return thunkApi.rejectWithValue(e.response.data)
}else{
    return thunkApi.rejectWithValue({error:"impossible de récupérer les messages"})
}
    }
})

export const createNotifications=createAsyncThunk('notification/create',async(state,thunkApi)=>{
    try{
        console.log('state')
        console.log(state)
        const token=thunkApi.getState();
        let headers = {
            headers: {
                Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
            }
        };
let res=await axios.post(`${BASE_URL}/create-notification`,state,headers)

return res
    }catch(err){
        if(e.response.data){
            return thunkApi.rejectWithValue(e.response.data)
            }else{
                return thunkApi.rejectWithValue({error:"impossible de récupérer les messages"})
            }
    }
})


const notificationSlice=createSlice({
    name:'notificationSlice',
    initialState:{
        notifications:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getNotifications.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(getNotifications.fulfilled,(state,action)=>{
            state.notifications=action?.payload
            state.loading=false
        })
        builder.addCase(getNotifications.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
        

        builder.addCase(createNotifications.pending,(state,action)=>{
            state.loading=true
        })
        builder.addCase(createNotifications.fulfilled,(state,action)=>{
            state.notifications=action?.payload
            state.loading=false
        })
        builder.addCase(createNotifications.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })
    }
})
export default notificationSlice.reducer