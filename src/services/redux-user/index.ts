import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from './userTypes';

export const initialState: UserState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    clear: state => {
      state.user = null;
    }
  }
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
export default userSlice.reducer;
