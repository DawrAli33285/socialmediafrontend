import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

export const registerAction = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        let response = await axios.post(`${BASE_URL}/register-user`, userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({ error: "Impossible de s'inscrire pour le moment" });
        }
    }
});
export const emailverification=createAsyncThunk('user/verify',async(state,thunkAPI)=>{
    try{
        let response = await axios.get(`${BASE_URL}/email-verification/${state}`);
        return response.data;
  
    }catch(error){
        if (error.response && error.response.data) {
          
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({error: "Impossible d'envoyer une vérification par e-mail" });
        }
    }
})

export const googleAuth=createAsyncThunk('user/googleAuth',async(token,thunkAPI)=>{
    try{
 
        let response = await axios.post(`${BASE_URL}/google-auth`,token);
        return response.data;
    }catch(error){
        if (error.response && error.response.data) {
      
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({error: 'Unable to register at this time' });
        }
    }
})
export const facebookleAuth=createAsyncThunk('user/facebookAuth',async(token,thunkAPI)=>{
    try{
 
        let response = await axios.post(`${BASE_URL}/facebookAuth`,token);
        return response.data;
    }catch(error){
        if (error.response && error.response.data) {
      
            return thunkAPI.rejectWithValue(error.response.data);
        } else {
            return thunkAPI.rejectWithValue({error: 'Unable to register at this time' });
        }
    }
})


export const loginAction=createAsyncThunk('user/login',async(state,thunkAPI)=>{
    try{
let response=await axios.post(`${BASE_URL}/login-user`,state)
return response.data
}catch(error){
   
    if (error.response && error.response.data) {
      
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ error: 'Impossible de se connecter pour le moment' });
    }
    }
})


export const forgetPasswordAction=createAsyncThunk('user/forgetPassword',async(state,thunkAPI)=>{
    try{
        let response=await axios.post(`${BASE_URL}/forget-password`,state)
        return response.data
    }catch(error){
           
    if (error.response && error.response.data) {
      
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ error: "impossible d'envoyer le lien de réinitialisation du mot de passe" });
    }
    }
})

export const resetPasswordAction=createAsyncThunk('user/resetPassword',async(state,thunkAPI)=>{
    try{
        let response=await axios.post(`${BASE_URL}/reset-password`,state)
        return response.data
    }catch(error){
           
    if (error.response && error.response.data) {
      
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ error: "impossible de réinitialiser le mot de passe"});
    }
    }
})

export const googleLoginAction=createAsyncThunk('user/googleLogin',async(state,thunkAPI)=>{
    try{
        let response=await axios.post(`${BASE_URL}/google-login`,state)
        return response.data
    }catch(error){
           
    if (error.response && error.response.data) {
      
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({ error:"impossible de me connecter pour le moment" });
    }
    }
})

export const facebookLoginAction=createAsyncThunk('user/facebooklogin',async(state,thunkAPI)=>{
    try{
        let response=await axios.post(`${BASE_URL}/facebook-login`,state)
        return response.data
    }catch(error){
           
    if (error.response && error.response.data) {
      
        return thunkAPI.rejectWithValue(error.response.data);
    } else {
        return thunkAPI.rejectWithValue({error:"impossible de me connecter pour le moment" });
    }
    }
})

export const updateUserState=createAction('auth/update')


const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        user: '',
        appErr: null,
        serverErr: null,
        loading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;
            })
            .addCase(emailverification.rejected, (state, action) => {
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;
            })
            .addCase(googleAuth.pending,(state,action)=>{
                state.loading=true
            })
            .addCase( googleAuth.fulfilled,(state,action)=>{
                state.loading=false;
                state.google=true;
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;
            })
            .addCase(facebookleAuth.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(facebookleAuth.fulfilled,(state,action)=>{
                state.loading=false;
                state.facebook=true;
            })
            .addCase(facebookleAuth.rejected, (state, action) => {
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;
            })
            .addCase(loginAction.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(loginAction.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
                localStorage.setItem('user',JSON.stringify(action.payload.user))
            })
            .addCase(loginAction.rejected,(state,action)=>{
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;   
            })
            .addCase(forgetPasswordAction.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(forgetPasswordAction.fulfilled,(state,action)=>{
                state.loading=false;
                state.email=action.payload;
            })
            .addCase(forgetPasswordAction.rejected,(state,action)=>{
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;   
            })
    
            .addCase( resetPasswordAction .pending,(state,action)=>{
                state.loading=true
            })
            .addCase(resetPasswordAction .fulfilled,(state,action)=>{
                state.loading=false;
                state.message=action.payload;
            })
            .addCase( resetPasswordAction .rejected,(state,action)=>{
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;   
            })
            
            .addCase( googleLoginAction.pending,(state,action)=>{
                state.loading=true
            })
            .addCase(googleLoginAction .fulfilled,(state,action)=>{
                state.loading=false;
                state.user=""
                state.user=action.payload;
                localStorage.setItem('user',JSON.stringify(action.payload.user))
            })
            .addCase(googleLoginAction.rejected,(state,action)=>{
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;   
            })
            .addCase(facebookLoginAction.pending,(state,action)=>{
                state.loading=true
            })
            .addCase( facebookLoginAction.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload;
                localStorage.setItem('user',JSON.stringify(action.payload.user))
            })
            .addCase( facebookLoginAction.rejected,(state,action)=>{
                state.appErr = action.payload?.message;
                state.serverErr = action.error?.message;
                state.loading = false;   
            })
            builder.addCase(updateUserState,(state,action)=>{
                if (state.user && state.user.user) {
                  console.log('authentication slice')
                  console.log(action.payload)
                        state.user.user.email = action.payload.email;
                    
                  
                        state.user.user.password = action.payload.password;
                    
                }
            })
              },
});

export default authenticationSlice.reducer;
