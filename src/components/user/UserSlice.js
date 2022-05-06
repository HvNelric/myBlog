import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLog: false,
        info: {}
    },
    reducers: {
        goLog: (state, action) => {
            state.isLog = action.payload;
        },
        goInfo: (state, action) => {
            state.info = action.payload;
        }
    }
})

export const { goLog, goInfo } = userSlice.actions;

export const userStatus = (state) => state.user.isLog;
export const userInfo = (state) => state.user.info;

export default userSlice.reducer;