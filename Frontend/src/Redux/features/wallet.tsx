"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface walletAddress {
  value: string | undefined;
}

const initialState: walletAddress = {
  value: '',
};

const WalletAddress = createSlice({
  name: 'address',
  initialState,
  reducers: {
    assignAddress(state ,action: PayloadAction<string>){
        state.value=action.payload;
    }
  },
});

export const {assignAddress} = WalletAddress.actions;

export default WalletAddress.reducer;
