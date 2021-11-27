import React from 'react';
import { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';
import useFoods from '../../hooks/useFoods';
import useWorker from '../../hooks/useWorker';

export const AuthContext = createContext('Benevolent.org');
const AuthProvider = ({ children }) => {
    const firebase = useFirebase();
    const foodContext = useFoods();
    const workerContext = useWorker();

    return (
        <AuthContext.Provider value={{ firebase, foodContext, workerContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;