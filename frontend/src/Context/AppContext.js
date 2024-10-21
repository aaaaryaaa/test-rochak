import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const [selectedFridges, setSelectedFridges] = useState([]);

    return (
        <AppContext.Provider value={{ selectedFridges, setSelectedFridges }}>
            {children}
        </AppContext.Provider>
    );
};
