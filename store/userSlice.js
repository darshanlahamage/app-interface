import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userid: '',
    name: '',
    aadhaar: '',
    mobile: '',
    kyc_status: '',
    role: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            const { userid, name, aadhaar, mobile, kyc_status, role } = action.payload;
            state.userid = userid;
            state.name = name;
            state.aadhaar = aadhaar;
            state.mobile = mobile;
            state.kyc_status = kyc_status;
            state.role = role;
        },
        logout(state) {
            return { ...initialState }; 
        }
    }
});

export const { setUserInfo, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
