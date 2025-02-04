import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

export const useCaptainContext = () => {
    const context = useContext(CaptainDataContext);
    if (!context) {
        throw new Error('useCaptainContext must be used within a CaptainDataProvider');
    }
    return context;
};

export const CaptainDataProvider = ({ children }) => {
    const [captain, setCaptain] = useState(() => {
        try {
            const storedCaptain = localStorage.getItem('captain');
            return storedCaptain ? JSON.parse(storedCaptain) : null;
        } catch (error) {
            console.error('Error parsing captain data:', error);
            return null;
        }
    });

    const value = {
        captain,
        setCaptain: (captainData) => {
            if (captainData) {
                setCaptain(captainData);
                localStorage.setItem('captain', JSON.stringify(captainData));
            }
        }
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainDataProvider;