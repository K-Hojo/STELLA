import React from 'react';
import { initialState } from './reducers';

const AuthContext = React.createContext(initialState)

export default AuthContext;