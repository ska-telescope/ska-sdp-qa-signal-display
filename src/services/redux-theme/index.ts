import { createSlice } from '@reduxjs/toolkit';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: THEME_LIGHT
  },
  reducers: {
    toggle: state => {
      state.mode = state.mode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
    }
  }
});

export const themeSliceActions = themeSlice.actions;
export const themeSliceReducer = themeSlice.reducer;
export default themeSlice.reducer;
