import { createSlice } from '@reduxjs/toolkit';

type utilsType = {
  isLoggedIn: boolean | undefined;
  error: string;
};

const initialState: utilsType = {
  isLoggedIn: undefined,
  error: '',
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    changeIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    changeError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { changeIsLoggedIn, changeError } = utilsSlice.actions;
