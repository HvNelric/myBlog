import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../components/user/UserSlice';

export const store = configureStore({
    reducer: {
        user: userSlice
    },
});
