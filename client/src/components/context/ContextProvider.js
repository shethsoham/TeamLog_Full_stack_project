// ContextProvider.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
    const [state, setState] = useState({});

    return (
        <MyContext.Provider value={{ state, setState }}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider;
