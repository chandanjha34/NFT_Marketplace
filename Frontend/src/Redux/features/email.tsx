"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface email {
  value: string | undefined;
}

const initialState: email = {
  value: '',
};

const updateEmail = createSlice({
  name: 'email',
  initialState,
  reducers: {
    assignEmail(state ,action: PayloadAction<string>){
        state.value=action.payload;
    }
  },
});

export const {assignEmail} = updateEmail.actions;

export default updateEmail.reducer;
