import { createSlice } from '@reduxjs/toolkit';

type tokensType = {
  access: string;
  refresh: string;
};

const initialState: { tokens: tokensType } = {
  tokens: {
    refresh: '',
    access: '',
  },
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setTokensAction: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export const { setTokensAction } = loginSlice.actions;
