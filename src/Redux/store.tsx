'use client'
import { configureStore } from '@reduxjs/toolkit';
import assignAdress from './features/wallet'
import assignUsername from '../Redux/features/auth';

export const store = configureStore({
    reducer: {
        address:assignAdress,
        username:assignUsername
    }
});

// Types for dispatch and selector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
