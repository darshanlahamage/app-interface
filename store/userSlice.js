import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userid: '',
    name: '',
    aadhaar: '',
    phone: '',
    kyc_status: '',
    role: '',
    credit_score:''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            const { user_id, name, aadhaar_number, phone, kyc_verified, role, credit_score } = action.payload;
            state.userid = user_id;
            state.name = name;
            state.aadhaar = aadhaar_number;
            state.phone = phone;
            state.kyc_status = kyc_verified;
            state.role = role;
            state.credit_score= credit_score;
        },
        logout(state) {
            return { ...initialState }; 
        }
    }
});

export const { setUserInfo, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
