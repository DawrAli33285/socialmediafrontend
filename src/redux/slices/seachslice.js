import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const BASE_URL = 'http://localhost:5000'; 


export const addCreatorToFavourites=createAsyncThunk('search/favourite',async(state,thunkApi)=>{
    try{
        const token=thunkApi.getState();
        console.log(token)
let headers = {
    headers: {
        Authorization: `Bearer ${token?.authenticationslices?.user?.user?.token}`
    }
};
let res=await axios.post(`${BASE_URL}/addCreatorToFavourites`,state,headers)
return res        
    }catch(error){
        if (error?.response?.data) {

            return thunkApi.rejectWithValue(error?.response?.data);
             } else {
                 return thunkApi.rejectWithValue({error:"Impossible de répondre à votre demande, veuillez réessayer plus tard" });
             }
    }
})




const searchSlice=createSlice({
    name:'searchSlice',
    initialState:{
        search:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addCreatorToFavourites.pending,(state,action)=>{
            state.loading=true;
        })

        builder.addCase(addCreatorToFavourites.fulfilled,(state,action)=>{
            state.search_favourites=true
            state.pending=false;
        })
        builder.addCase(addCreatorToFavourites.rejected,(state,action)=>{
            state.appErr = action.payload?.message;
            state.serverErr = action.error?.message;
            state.loading = false;   
        })


        
    }
})

export default searchSlice.reducer;