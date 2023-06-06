import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { THEME_DARK } from '@ska-telescope/ska-gui-components';
import { telescopeSliceActions, telescopeSliceReducer } from '../redux-telescope/index';
import { themeSliceActions, themeSliceReducer } from '../redux-theme/index';
import { userSliceActions, userSliceReducer } from '../redux-user/index';
import { Telescope, TELESCOPE_LOW } from '../redux-telescope/telescopeTypes';
import { User } from '../redux-user/userTypes';

const store = configureStore({
  reducer: {
    telescope: telescopeSliceReducer,
    themeMode: themeSliceReducer,
    user: userSliceReducer
  }
});

interface StoreProviderProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof store.getState>;

export const storageObject = {
  useStore() {
    const telescope = useSelector((state: RootState) =>
      state?.telescope?.telescope ? state.telescope.telescope : TELESCOPE_LOW
    );
    const themeMode = useSelector((state: RootState) => state.themeMode);
    const user = useSelector((state: RootState) => state.user?.user);

    const darkMode = themeMode?.mode === THEME_DARK;
    const dispatch = useDispatch();
    return {
      telescope,
      updateTelescope: (inValue: Telescope) => dispatch(telescopeSliceActions.change(inValue)),
      //
      themeMode,
      darkMode,
      toggleTheme: () => dispatch(themeSliceActions.toggle()),
      //
      user,
      clearUser: () => dispatch(userSliceActions.clear()),
      updateUser: (inValue: User) => dispatch(userSliceActions.update(inValue))
    };
  }
};
