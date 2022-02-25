/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AuthContext from '../contexts/JWTContext';

const useAuth: any = () => React.useContext(AuthContext);

export default useAuth;
