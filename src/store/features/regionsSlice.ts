import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IRegion } from '@/interfaces/_index';

const initialState: { regions: (IRegion & { state: boolean })[] } = {
  regions: [],
};

export const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    setRegions: (state, action: PayloadAction<IRegion[]>) => {
      state.regions = action.payload.map((region) => ({ state: false, ...region }));
    },
    changeAll: (state, action: PayloadAction<boolean>) => {
      state.regions = state.regions.map((region) => ({ ...region, state: action.payload }));
    },
    changeOne: (state, action: PayloadAction<string>) => {
      const regionIndex = state.regions.findIndex((region) => region.id === action.payload);
      const newState = [...state.regions];
      newState[regionIndex].state = !newState[regionIndex].state;
      state.regions = newState;
    },
  },
});

export const { changeAll, changeOne, setRegions } = regionsSlice.actions;
