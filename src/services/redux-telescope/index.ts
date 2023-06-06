import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Telescope, TelescopeState } from './telescopeTypes';

export const initialState: TelescopeState = {
  telescope: null
};

export const telescopeSlice = createSlice({
  name: 'telescope',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Telescope>) => {
      state.telescope = action.payload;
    }
  }
});

export const telescopeSliceActions = telescopeSlice.actions;
export const telescopeSliceReducer = telescopeSlice.reducer;
export default telescopeSlice.reducer;
